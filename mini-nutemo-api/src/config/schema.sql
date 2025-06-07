-- Users table
CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    webhook_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Targets table
CREATE TABLE IF NOT EXISTS targets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    url VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    ssl_days_to_expiry INT,
    domain_days_to_expiry INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Status logs table to store ping results
CREATE TABLE IF NOT EXISTS status_logs (
    id INT PRIMARY KEY AUTO_INCREMENT,
    target_id INT NOT NULL,
    status_code INT,
    latency_ms INT,
    is_success BOOLEAN,
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (target_id) REFERENCES targets(id) ON DELETE CASCADE
);

-- Alerts table to store notifications
CREATE TABLE IF NOT EXISTS alerts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    target_id INT NOT NULL,
    user_id INT NOT NULL,
    type ENUM('ping_failure', 'ssl_expiry', 'domain_expiry') NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (target_id) REFERENCES targets(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Add expiry fields to targets table
ALTER TABLE targets
ADD COLUMN IF NOT EXISTS ssl_days_to_expiry INT,
ADD COLUMN IF NOT EXISTS domain_days_to_expiry INT;

-- Add indexes for better query performance
CREATE INDEX idx_status_logs_target_id ON status_logs(target_id);
CREATE INDEX idx_status_logs_created_at ON status_logs(created_at);
CREATE INDEX idx_alerts_user_id ON alerts(user_id);
CREATE INDEX idx_alerts_created_at ON alerts(created_at); 