-- Insert data into State
INSERT INTO "State" ("id", "name", "code") VALUES
(1, 'California', 6),
(2, 'New York', 36),
(3, 'Texas', 48);

-- Insert data into City
INSERT INTO "City" ("id", "name", "state_id") VALUES
('city1', 'Los Angeles', 1),
('city2', 'San Francisco', 1),
('city3', 'New York City', 2),
('city4', 'Houston', 3);

-- Insert data into UserType
INSERT INTO "UserType" ("id", "user_type") VALUES
('utype1', 'Admin'),
('utype2', 'Agent'),
('utype3', 'Customer');



INSERT INTO "User" ("id", "first_name", "last_name", "screen_name", "email", "contact_number", "password", "avatar_url", "is_mfa_enabled", "user_type_id") VALUES
('user1', 'John', 'Doe', 'johnd', 'john.doe@example.com', 1234567890, 'password123', 'http://example.com/avatar1.jpg', TRUE, 'utype1'),
('user2', 'Jane', 'Smith', 'janes', 'jane.smith@example.com', 2345678901, 'password123', 'http://example.com/avatar2.jpg', FALSE, 'utype2'),
('user3', 'Emily', 'Johnson', 'emilyj', 'emily.johnson@example.com', 3456789012, 'password123', 'http://example.com/avatar3.jpg', TRUE, 'utype3');


-- Insert data into Property
-- INSERT INTO "Property" ("id", "listing_id", "listing_key", "property_type", "standard_status", "list_price", "bathrooms_total", "bedrooms_total", "living_area", "public_remarks", "is_swimming_pool", "is_parking_lot", "address_line_1", "address_line_2", "city", "zip", "latitude", "longitude", "unparsed_address", "internet_address_display_yn", "feed_types", "list_agent_full_name", "list_office_name", "list_agent_mls_id", "list_office_mls_id", "originating_system_name", "modification_timestamp", "created_at", "updated_at", "created_by", "updated_by") VALUES
-- ('prop1', 'L12345', 'K12345', 'Single Family', 'Active', 750000, 3, 4, 2500, 'Beautiful family home', TRUE, TRUE, '123 Main St', '', 'Los Angeles', 90001, 34.052235, -118.243683, '123 Main St, Los Angeles, CA 90001', TRUE, 'FeedType1', 'Jane Smith', 'ABC Realty', 'A123', 'O123', 'System1', '2024-01-01 12:00:00', '2024-01-01 12:00:00', '2024-01-01 12:00:00', 'user1', 'user1'),
-- ('prop2', 'L12346', 'K12346', 'Condo', 'Pending', 500000, 2, 3, 1500, 'Modern condo in the city', FALSE, FALSE, '456 Elm St', 'Apt 101', 'San Francisco', 94102, 37.774929, -122.419418, '456 Elm St, Apt 101, San Francisco, CA 94102', FALSE, 'FeedType2', 'Emily Johnson', 'XYZ Realty', 'A124', 'O124', 'System2', '2024-01-02 12:00:00', '2024-01-02 12:00:00', '2024-01-02 12:00:00', 'user2', 'user2'),
-- ('prop3', 'L12347', 'K12347', 'Apartment', 'Sold', 300000, 1, 2, 800, 'Cozy apartment in downtown', FALSE, TRUE, '789 Oak St', 'Unit 5', 'New York City', 10001, 40.712776, -74.005974, '789 Oak St, Unit 5, New York, NY 10001', TRUE, 'FeedType3', 'John Doe', 'LMN Realty', 'A125', 'O125', 'System3', '2024-01-03 12:00:00', '2024-01-03 12:00:00', '2024-01-03 12:00:00', 'user3', 'user3');
INSERT INTO "Property" (
    "id", "listing_id", "listing_key", "property_type", "standard_status", "list_price", 
    "bathrooms_total", "bedrooms_total", "living_area", "public_remarks", "is_swimming_pool", 
    "is_parking_lot", "address_line_1", "address_line_2", "city", "zip", "latitude", "longitude", 
    "unparsed_address", "internet_address_display_yn", "feed_types", "list_agent_full_name", 
    "list_office_name", "list_agent_mls_id", "list_office_mls_id", "originating_system_name", 
    "modification_timestamp", "created_at", "updated_at", "created_by", "updated_by"
) VALUES
('prop1', 'L12345', 'K12345', 'Single Family', 'Active', 750000, 3, 4, 2500, 'Beautiful family home', TRUE, TRUE, '123 Main St', '', 'Los Angeles', 90001, 34.052235, -118.243683, '123 Main St, Los Angeles, CA 90001', TRUE, 'FeedType1', 'Jane Smith', 'ABC Realty', 'A123', 'O123', 'System1', '2024-01-01 12:00:00', '2024-01-01 12:00:00', '2024-01-01 12:00:00', 'user1', 'user1'),
('prop2', 'L12346', 'K12346', 'Condo', 'Pending', 500000, 2, 3, 1500, 'Modern condo in the city', FALSE, FALSE, '456 Elm St', 'Apt 101', 'San Francisco', 94102, 37.774929, -122.419418, '456 Elm St, Apt 101, San Francisco, CA 94102', FALSE, 'FeedType2', 'Emily Johnson', 'XYZ Realty', 'A124', 'O124', 'System2', '2024-01-02 12:00:00', '2024-01-02 12:00:00', '2024-01-02 12:00:00', 'user2', 'user2'),
('prop3', 'L12347', 'K12347', 'Apartment', 'Sold', 300000, 1, 2, 800, 'Cozy apartment in downtown', FALSE, TRUE, '789 Oak St', 'Unit 5', 'New York City', 10001, 40.712776, -74.005974, '789 Oak St, Unit 5, New York, NY 10001', TRUE, 'FeedType3', 'John Doe', 'LMN Realty', 'A125', 'O125', 'System3', '2024-01-03 12:00:00', '2024-01-03 12:00:00', '2024-01-03 12:00:00', 'user3', 'user3'),
('prop4', 'L12348', 'K12348', 'Townhouse', 'Active', 850000, 2, 3, 1800, 'Spacious townhouse', TRUE, FALSE, '321 Pine St', '', 'Boston', 2108, 42.360081, -71.058884, '321 Pine St, Boston, MA 02108', TRUE, 'FeedType4', 'Alice Brown', 'OPQ Realty', 'A126', 'O126', 'System4', '2024-01-04 12:00:00', '2024-01-04 12:00:00', '2024-01-04 12:00:00', 'user4', 'user4'),
('prop5', 'L12349', 'K12349', 'Villa', 'Pending', 1250000, 4, 5, 3500, 'Luxurious villa with a pool', TRUE, TRUE, '654 Maple St', '', 'Miami', 33101, 25.761681, -80.191788, '654 Maple St, Miami, FL 33101', TRUE, 'FeedType5', 'Michael Green', 'RST Realty', 'A127', 'O127', 'System5', '2024-01-05 12:00:00', '2024-01-05 12:00:00', '2024-01-05 12:00:00', 'user5', 'user5'),
('prop6', 'L12350', 'K12350', 'Bungalow', 'Sold', 400000, 2, 3, 1300, 'Charming bungalow', FALSE, TRUE, '987 Cedar St', '', 'Seattle', 98101, 47.606209, -122.332069, '987 Cedar St, Seattle, WA 98101', TRUE, 'FeedType6', 'Nancy White', 'UVW Realty', 'A128', 'O128', 'System6', '2024-01-06 12:00:00', '2024-01-06 12:00:00', '2024-01-06 12:00:00', 'user6', 'user6'),
('prop7', 'L12351', 'K12351', 'Cottage', 'Active', 600000, 1, 2, 900, 'Cozy cottage', FALSE, FALSE, '111 Birch St', '', 'Portland', 97201, 45.505106, -122.675026, '111 Birch St, Portland, OR 97201', TRUE, 'FeedType7', 'Steven Black', 'XYZ Realty', 'A129', 'O129', 'System7', '2024-01-07 12:00:00', '2024-01-07 12:00:00', '2024-01-07 12:00:00', 'user7', 'user7'),
('prop8', 'L12352', 'K12352', 'Duplex', 'Pending', 700000, 3, 4, 2000, 'Spacious duplex', TRUE, TRUE, '222 Spruce St', '', 'Denver', 80201, 39.739236, -104.990251, '222 Spruce St, Denver, CO 80201', TRUE, 'FeedType8', 'Laura Green', 'LMN Realty', 'A130', 'O130', 'System8', '2024-01-08 12:00:00', '2024-01-08 12:00:00', '2024-01-08 12:00:00', 'user8', 'user8'),
('prop9', 'L12353', 'K12353', 'Penthouse', 'Sold', 2000000, 4, 5, 4000, 'Luxurious penthouse', TRUE, TRUE, '333 Ash St', 'Penthouse', 'Chicago', 60601, 41.878113, -87.629799, '333 Ash St, Penthouse, Chicago, IL 60601', TRUE, 'FeedType9', 'Sara White', 'ABC Realty', 'A131', 'O131', 'System9', '2024-01-09 12:00:00', '2024-01-09 12:00:00', '2024-01-09 12:00:00', 'user9', 'user9'),
('prop10', 'L12354', 'K12354', 'Loft', 'Active', 950000, 2, 3, 1800, 'Modern loft', FALSE, FALSE, '444 Poplar St', '', 'Austin', 73301, 30.267153, -97.743061, '444 Poplar St, Austin, TX 73301', TRUE, 'FeedType10', 'Kevin White', 'OPQ Realty', 'A132', 'O132', 'System10', '2024-01-10 12:00:00', '2024-01-10 12:00:00', '2024-01-10 12:00:00', 'user10', 'user10'),
('prop11', 'L12355', 'K12355', 'Ranch', 'Pending', 850000, 3, 4, 2200, 'Spacious ranch home', TRUE, TRUE, '555 Fir St', '', 'Dallas', 75201, 32.776664, -96.796988, '555 Fir St, Dallas, TX 75201', TRUE, 'FeedType11', 'Tom Brown', 'RST Realty', 'A133', 'O133', 'System11', '2024-01-11 12:00:00', '2024-01-11 12:00:00', '2024-01-11 12:00:00', 'user11', 'user11'),
('prop12', 'L12356', 'K12356', 'Mansion', 'Sold', 5000000, 6, 8, 10000, 'Luxurious mansion', TRUE, TRUE, '666 Pine St', '', 'Las Vegas', 89101, 36.169941, -115.139830, '666 Pine St, Las Vegas, NV 89101', TRUE, 'FeedType12', 'Alex Green', 'UVW Realty', 'A134', 'O134', 'System12', '2024-01-12 12:00:00', '2024-01-12 12:00:00', '2024-01-12 12:00:00', 'user12', 'user12'),
('prop13', 'L12357', 'K12357', 'Estate', 'Active', 7500000, 8, 10, 15000, 'Expansive estate', TRUE, TRUE, '777 Cedar St', '', 'Beverly Hills', 90210, 34.090009, -118.406696, '777 Cedar St, Beverly Hills, CA 90210', TRUE, 'FeedType13', 'Nancy Black', 'XYZ Realty', 'A135', 'O135', 'System13', '2024-01-13 12:00:00', '2024-01-13 12:00:00', '2024-01-13 12:00:00', 'user13', 'user13'),
('prop14', 'L12358', 'K12358', 'Farmhouse', 'Pending', 450000, 3, 4, 2000, 'Charming farmhouse', TRUE, TRUE, '888 Elm St', '', 'Nashville', 37201, 36.162664, -86.781602, '888 Elm St, Nashville, TN 37201', TRUE, 'FeedType14', 'Michael White', 'LMN Realty', 'A136', 'O136', 'System14', '2024-01-14 12:00:00', '2024-01-14 12:00:00', '2024-01-14 12:00:00', 'user14', 'user14'),
('prop15', 'L12359', 'K12359', 'Cabin', 'Sold', 550000, 2, 3, 1500, 'Cozy cabin in the woods', TRUE, TRUE, '999 Oak St', '', 'Aspen', 81611, 39.191099, -106.817539, '999 Oak St, Aspen, CO 81611', TRUE, 'FeedType15', 'Sara Green', 'ABC Realty', 'A137', 'O137', 'System15', '2024-01-15 12:00:00', '2024-01-15 12:00:00', '2024-01-15 12:00:00', 'user15', 'user15'),
('prop16', 'L12360', 'K12360', 'Studio', 'Active', 300000, 1, 1, 600, 'Compact studio apartment', FALSE, FALSE, '101 Pine St', 'Unit 2', 'Los Angeles', 90001, 34.052235, -118.243683, '101 Pine St, Unit 2, Los Angeles, CA 90001', TRUE, 'FeedType16', 'Jane White', 'RST Realty', 'A138', 'O138', 'System16', '2024-01-16 12:00:00', '2024-01-16 12:00:00', '2024-01-16 12:00:00', 'user16', 'user16'),
('prop17', 'L12361', 'K12361', 'Flat', 'Pending', 650000, 2, 3, 1600, 'Modern flat', FALSE, FALSE, '202 Elm St', 'Unit 3', 'San Francisco', 94102, 37.774929, -122.419418, '202 Elm St, Unit 3, San Francisco, CA 94102', FALSE, 'FeedType17', 'Emily Green', 'UVW Realty', 'A139', 'O139', 'System17', '2024-01-17 12:00:00', '2024-01-17 12:00:00', '2024-01-17 12:00:00', 'user17', 'user17'),
('prop18', 'L12362', 'K12362', 'Maisonette', 'Sold', 2000000, 4, 5, 4000, 'Luxury maisonette', TRUE, TRUE, '303 Cedar St', '', 'Chicago', 60601, 41.878113, -87.629799, '303 Cedar St, Chicago, IL 60601', TRUE, 'FeedType18', 'John Green', 'XYZ Realty', 'A140', 'O140', 'System18', '2024-01-18 12:00:00', '2024-01-18 12:00:00', '2024-01-18 12:00:00', 'user18', 'user18'),
('prop19', 'L12363', 'K12363', 'Brownstone', 'Active', 1750000, 3, 4, 2200, 'Historic brownstone', TRUE, TRUE, '404 Oak St', '', 'New York City', 10001, 40.712776, -74.005974, '404 Oak St, New York, NY 10001', TRUE, 'FeedType19', 'Michael Black', 'LMN Realty', 'A141', 'O141', 'System19', '2024-01-19 12:00:00', '2024-01-19 12:00:00', '2024-01-19 12:00:00', 'user19', 'user19'),
('prop20', 'L12364', 'K12364', 'Chalet', 'Pending', 1500000, 4, 5, 3000, 'Mountain chalet', TRUE, TRUE, '505 Pine St', '', 'Denver', 80201, 39.739236, -104.990251, '505 Pine St, Denver, CO 80201', TRUE, 'FeedType20', 'Nancy White', 'ABC Realty', 'A142', 'O142', 'System20', '2024-01-20 12:00:00', '2024-01-20 12:00:00', '2024-01-20 12:00:00', 'user20', 'user20');




-- Insert data into Media
INSERT INTO "Media" ("order", "media_key", "media_url", "media_size", "resource_record_key", "resource_name", "class_name", "media_type", "thumbnail", "media_category", "property_id") VALUES
(1, 'M12345', 'http://example.com/media1.jpg', 500, 'R12345', 'Resource1', 'Class1', 'Image', 'http://example.com/thumbnail1.jpg', 'Category1', 'prop1'),
(2, 'M12346', 'http://example.com/media2.jpg', 600, 'R12346', 'Resource2', 'Class2', 'Video', 'http://example.com/thumbnail2.jpg', 'Category2', 'prop2'),
(3, 'M12347', 'http://example.com/media3.jpg', 700, 'R12347', 'Resource3', 'Class3', 'Image', 'http://example.com/thumbnail3.jpg', 'Category3', 'prop3');