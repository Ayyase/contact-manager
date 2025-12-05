-- Create database
CREATE DATABASE IF NOT EXISTS contact_manager;

-- Use database
USE contact_manager;

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data (optional)
INSERT INTO contacts (name, email, phone, address) VALUES
('John Doe', 'john.doe@email.com', '+62812345678', 'Jl. Sudirman No. 123, Jakarta'),
('Jane Smith', 'jane.smith@email.com', '+62823456789', 'Jl. Thamrin No. 456, Jakarta'),
('Michael Brown', 'michael.brown@email.com', '+62834567890', 'Jl. Gatot Subroto No. 789, Jakarta');