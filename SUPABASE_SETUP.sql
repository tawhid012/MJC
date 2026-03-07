-- ============================================
-- MJC Website - Supabase Setup SQL
-- Run this in your Supabase SQL Editor
-- ============================================

-- Step 1: Create the menuitems table (if not exists)
CREATE TABLE IF NOT EXISTS public.menuitems (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    price NUMERIC NOT NULL,
    emoji TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    image TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 2: Enable Row Level Security
ALTER TABLE public.menuitems ENABLE ROW LEVEL SECURITY;

-- Step 3: Create policies for full access (public can read/write)
DROP POLICY IF EXISTS "Allow public read" ON public.menuitems;
DROP POLICY IF EXISTS "Allow public insert" ON public.menuitems;
DROP POLICY IF EXISTS "Allow public update" ON public.menuitems;
DROP POLICY IF EXISTS "Allow public delete" ON public.menuitems;

CREATE POLICY "Allow public read" ON public.menuitems FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON public.menuitems FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update" ON public.menuitems FOR UPDATE USING (true);
CREATE POLICY "Allow public delete" ON public.menuitems FOR DELETE USING (true);

-- Step 4: Add some sample menu items (optional - comment out if you want empty)
INSERT INTO public.menuitems (name, price, emoji, description, category) VALUES
('Orange Sunrise', 60, '🍊', 'Freshly squeezed Valencia oranges with a hint of ginger and lemon zest.', 'Fresh Juice'),
('Strawberry Kiss', 85, '🍓', 'Farm-fresh strawberries blended with a dash of rose water and lychee.', 'Fresh Juice'),
('Watermelon Cooler', 65, '🍉', 'Chilled watermelon juice with lemon zest and Himalayan pink salt.', 'Fresh Juice'),
('Mango Royale', 90, '🥭', 'Premium Alphonso mango blended with coconut milk and a touch of cardamom.', 'Smoothie'),
('Blueberry Bliss', 100, '🫐', 'Antioxidant-rich blueberries, banana, and Greek yoghurt in a thick velvety blend.', 'Smoothie'),
('Banana Peanut Power', 110, '🍌', 'Ripe bananas, natural peanut butter, oat milk and honey — protein-packed smoothie.', 'Smoothie'),
('Green Detox', 110, '🍏', 'Cold-pressed spinach, green apple, cucumber, and mint. Naturally cleansing.', 'Cold Press'),
('Golden Glow', 115, '🥕', 'Cold-pressed carrot, turmeric, orange, and ginger. Anti-inflammatory powerhouse.', 'Cold Press'),
('MJC Signature', 130, '🍇', 'Our secret blend — grape, pomegranate, and berries with a golden citrus base.', 'Special'),
('MJC Wellness Boost', 125, '🌿', 'Amla, giloy, ginger, lemon, and honey — our immunity powerhouse drink.', 'Special');


-- Verify the data
SELECT * FROM public.menuitems ORDER BY created_at DESC;

