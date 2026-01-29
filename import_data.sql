USE bookxpert_db;

-- Initial Services
INSERT INTO services (title, description, icon) VALUES 
('Day to Day Bookkeeping', 'Maintain daily records', 'HiDocumentText'),
('Tax Planning', 'Optimize tax liabilities', 'HiClipboardCheck'),
('Audit & Returns', 'Comprehensive audit support', 'HiShieldCheck');

-- Start Admin User (password: admin123)
INSERT INTO users (name, email, password, role) VALUES 
('Admin User', 'admin@bookxpert.com', '$2a$10$X7...', 'admin'); 

-- Mock Careers
INSERT INTO jobs (title, department, location, type, experience, salary) VALUES
('Accounts Executive', 'Accounts', 'Hyderabad', 'Full Time', '2-4 Years', 'Competitive'),
('Backend Developer', 'IT', 'Remote', 'Full Time', '3+ Years', 'Best in Industry'),
('GST Consultant', 'Compliance', 'Bengaluru', 'Contract', '5+ Years', 'Competitive');
