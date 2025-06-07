// src/workers/monitorWorker.js
const axios = require('axios');
const TargetModel = require('../models/TargetModel');
const StatusLogModel = require('../models/StatusLogModel');
const AlertModel = require('../models/AlertModel');

// Track consecutive failures for each target
const failureCounts = new Map();

const pingTarget = async (target) => {
  const startTime = Date.now();
  try {
    const response = await axios.get(target.url, {
      timeout: 10000, // 10 second timeout
      validateStatus: (status) => status < 500 // Consider 5xx as failures
    });
    
    const latency = Date.now() - startTime;
    const isSuccess = response.status < 400;
    
    // Log the status
    await StatusLogModel.createStatusLog(
      target.id,
      response.status,
      latency,
      isSuccess,
      null
    );

    // Reset failure count on success
    if (isSuccess) {
      failureCounts.set(target.id, 0);
    } else {
      const failures = (failureCounts.get(target.id) || 0) + 1;
      failureCounts.set(target.id, failures);
      
      // Create alert if 2+ consecutive failures
      if (failures >= 2) {
        await AlertModel.createAlert(
          target.id,
          target.user_id,
          'ping_failure',
          `Target ${target.name} (${target.url}) has failed ${failures} times consecutively. Last status: ${response.status}`
        );
      }
    }
  } catch (error) {
    const latency = Date.now() - startTime;
    
    // Log the failure
    await StatusLogModel.createStatusLog(
      target.id,
      null,
      latency,
      false,
      error.message
    );

    // Increment failure count
    const failures = (failureCounts.get(target.id) || 0) + 1;
    failureCounts.set(target.id, failures);
    
    // Create alert if 2+ consecutive failures
    if (failures >= 2) {
      await AlertModel.createAlert(
        target.id,
        target.user_id,
        'ping_failure',
        `Target ${target.name} (${target.url}) has failed ${failures} times consecutively. Error: ${error.message}`
      );
    }
  }
};

const startMonitoring = async () => {
  console.log('Starting monitoring worker...');
  
  // Run initial check
  await checkAllTargets();
  
  // Schedule periodic checks every 5 minutes
  setInterval(checkAllTargets, 5 * 60 * 1000);
};

const checkAllTargets = async () => {
  try {
    // Get all active targets
    const targets = await TargetModel.getAllActiveTargets();
    console.log(`Checking ${targets.length} active targets...`);
    
    // Ping each target concurrently
    await Promise.all(targets.map(pingTarget));
    
    console.log('Monitoring cycle completed');
  } catch (error) {
    console.error('Error in monitoring cycle:', error);
  }
};

module.exports = { startMonitoring };
