-- Test script to verify the database schema and basic functionality

-- Test 1: Insert a test user
INSERT INTO users (full_name, mobile_number, email) 
VALUES ('Ahmed Test User', '01012345678', 'ahmed.test@example.com')
ON CONFLICT DO NOTHING;

-- Test 2: Insert a test car
INSERT INTO cars (user_id, make, model, year, market_price, condition, fuel_type)
SELECT id, 'Toyota', 'Corolla', 2022, 450000, 'new', 'fuel'
FROM users 
WHERE email = 'ahmed.test@example.com'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Test 3: Insert test documents
INSERT INTO documents (user_id, document_type, file_name, file_url)
SELECT id, 'personal_id_front', 'id_front.jpg', 'data:image/jpeg;base64,test'
FROM users 
WHERE email = 'ahmed.test@example.com'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Test 4: Insert a test quote
INSERT INTO insurance_quotes (user_id, car_id, company_name, policy_type, premium_rate, annual_premium, selected)
SELECT u.id, c.id, 'Wethaq Insurance', 'New Car Comprehensive', 0.018, 8100, true
FROM users u
JOIN cars c ON u.id = c.user_id
WHERE u.email = 'ahmed.test@example.com'
LIMIT 1
ON CONFLICT DO NOTHING;

-- Verify the data
SELECT 'Users' as table_name, count(*) as record_count FROM users
UNION ALL
SELECT 'Cars' as table_name, count(*) as record_count FROM cars
UNION ALL
SELECT 'Documents' as table_name, count(*) as record_count FROM documents
UNION ALL
SELECT 'Insurance Quotes' as table_name, count(*) as record_count FROM insurance_quotes;

-- Test query to get complete user data
SELECT 
    u.full_name,
    u.mobile_number,
    u.email,
    c.make,
    c.model,
    c.year,
    c.market_price,
    iq.company_name,
    iq.annual_premium
FROM users u
LEFT JOIN cars c ON u.id = c.user_id
LEFT JOIN insurance_quotes iq ON u.id = iq.user_id
WHERE u.email = 'ahmed.test@example.com';
