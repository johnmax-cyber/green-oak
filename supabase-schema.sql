-- GreenOak Technologies - Computer Sales Module
-- Supabase Database Schema

-- Create inventory table
CREATE TABLE IF NOT EXISTS inventory (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL,
    category TEXT NOT NULL,
    condition TEXT NOT NULL CHECK (condition IN ('New', 'Refurbished')),
    specs JSONB DEFAULT '{}',
    image_urls TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'sold')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_inventory_status ON inventory(status);
CREATE INDEX IF NOT EXISTS idx_inventory_category ON inventory(category);
CREATE INDEX IF NOT EXISTS idx_inventory_condition ON inventory(condition);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_inventory_updated_at
    BEFORE UPDATE ON inventory
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view products)
CREATE POLICY "Allow public read access"
    ON inventory
    FOR SELECT
    USING (true);

-- Create policy for authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated users to manage inventory"
    ON inventory
    FOR ALL
    USING (auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO inventory (name, description, price, category, condition, specs, image_urls, status) VALUES
(
    'Dell Latitude 5520',
    'High-performance business laptop with Intel Core i7 processor, perfect for professionals.',
    85000.00,
    'Laptops',
    'Refurbished',
    '{"processor": "Intel Core i7-1185G7", "ram": "16GB DDR4", "storage": "512GB SSD", "display": "15.6\" FHD", "battery": "4-cell 63Wh"}',
    ARRAY['dell-latitude-5520-1.jpg', 'dell-latitude-5520-2.jpg'],
    'available'
),
(
    'HP EliteBook 840 G8',
    'Premium ultrabook with stunning display and all-day battery life.',
    95000.00,
    'Laptops',
    'New',
    '{"processor": "Intel Core i5-1145G7", "ram": "8GB DDR4", "storage": "256GB SSD", "display": "14\" FHD IPS", "battery": "3-cell 53Wh"}',
    ARRAY['hp-elitebook-840-1.jpg'],
    'available'
),
(
    'Lenovo ThinkPad T14s',
    'Legendary reliability meets modern performance in this business-class laptop.',
    78000.00,
    'Laptops',
    'Refurbished',
    '{"processor": "AMD Ryzen 5 PRO 4650U", "ram": "16GB DDR4", "storage": "512GB NVMe SSD", "display": "14\" FHD", "battery": "57Wh"}',
    ARRAY['lenovo-thinkpad-t14s-1.jpg', 'lenovo-thinkpad-t14s-2.jpg'],
    'available'
),
(
    'MacBook Pro 14" M2',
    'Apple Silicon powerhouse for creative professionals and developers.',
    285000.00,
    'Laptops',
    'New',
    '{"processor": "Apple M2 Pro", "ram": "16GB Unified", "storage": "512GB SSD", "display": "14.2\" Liquid Retina XDR", "battery": "17-hour"}',
    ARRAY['macbook-pro-14-1.jpg'],
    'sold'
);

-- Create storage bucket for product images
-- Note: This needs to be run in the Supabase dashboard or via the API
-- INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Create policy for public read access to product images
-- CREATE POLICY "Allow public read access to product images"
--     ON storage.objects
--     FOR SELECT
--     USING (bucket_id = 'product-images');

-- Create policy for authenticated users to upload product images
-- CREATE POLICY "Allow authenticated users to upload product images"
--     ON storage.objects
--     FOR INSERT
--     WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Create policy for authenticated users to update product images
-- CREATE POLICY "Allow authenticated users to update product images"
--     ON storage.objects
--     FOR UPDATE
--     USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');

-- Create policy for authenticated users to delete product images
-- CREATE POLICY "Allow authenticated users to delete product images"
--     ON storage.objects
--     FOR DELETE
--     USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
