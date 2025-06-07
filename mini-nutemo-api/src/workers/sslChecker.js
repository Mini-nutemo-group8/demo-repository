const { exec } = require('child_process');
const { promisify } = require('util');
const execAsync = promisify(exec);
const TargetModel = require('../models/TargetModel');
const AlertModel = require('../models/AlertModel');

const getSSLExpiry = async (domain) => {
  try {
    const { stdout } = await execAsync(`openssl s_client -connect ${domain}:443 -servername ${domain} </dev/null 2>/dev/null | openssl x509 -noout -enddate`);
    const expiryDate = new Date(stdout.split('=')[1].trim());
    const daysToExpiry = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
    return daysToExpiry;
  } catch (error) {
    console.error(`Error checking SSL for ${domain}:`, error);
    return null;
  }
};

const getDomainExpiry = async (domain) => {
  try {
    const { stdout } = await execAsync(`whois ${domain}`);
    const expiryMatch = stdout.match(/Registry Expiry Date: (.+)/);
    if (expiryMatch) {
      const expiryDate = new Date(expiryMatch[1]);
      const daysToExpiry = Math.ceil((expiryDate - new Date()) / (1000 * 60 * 60 * 24));
      return daysToExpiry;
    }
    return null;
  } catch (error) {
    console.error(`Error checking domain for ${domain}:`, error);
    return null;
  }
};

const checkTarget = async (target) => {
  try {
    const domain = new URL(target.url).hostname;
    
    // Check SSL expiry
    const sslDaysToExpiry = await getSSLExpiry(domain);
    if (sslDaysToExpiry !== null && sslDaysToExpiry <= 14) {
      await AlertModel.createAlert(
        target.id,
        target.user_id,
        'ssl_expiry',
        `SSL certificate for ${target.name} (${domain}) expires in ${sslDaysToExpiry} days`
      );
    }
    
    // Check domain expiry
    const domainDaysToExpiry = await getDomainExpiry(domain);
    if (domainDaysToExpiry !== null && domainDaysToExpiry <= 14) {
      await AlertModel.createAlert(
        target.id,
        target.user_id,
        'domain_expiry',
        `Domain ${domain} for ${target.name} expires in ${domainDaysToExpiry} days`
      );
    }
    
    // Update target with expiry information
    await TargetModel.updateExpiryInfo(
      target.id,
      sslDaysToExpiry,
      domainDaysToExpiry
    );
  } catch (error) {
    console.error(`Error checking target ${target.name}:`, error);
  }
};

const startSSLChecking = async () => {
  console.log('Starting SSL/Domain expiry checker...');
  
  // Run initial check
  await checkAllTargets();
  
  // Schedule daily checks
  setInterval(checkAllTargets, 24 * 60 * 60 * 1000);
};

const checkAllTargets = async () => {
  try {
    const targets = await TargetModel.getAllActiveTargets();
    console.log(`Checking SSL/Domain expiry for ${targets.length} targets...`);
    
    // Check each target concurrently
    await Promise.all(targets.map(checkTarget));
    
    console.log('SSL/Domain check cycle completed');
  } catch (error) {
    console.error('Error in SSL/Domain check cycle:', error);
  }
};

module.exports = { startSSLChecking }; 