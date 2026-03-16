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

-- Step 4: Add some sample menu items (optional)
INSERT INTO public.menuitems (name, price, emoji, description, category, image) VALUES
('Margherita Pizza', 180, '🍕', 'Classic tomato sauce, fresh buffalo mozzarella, and aromatic basil leaves.', 'Pizza', 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=800'),
('Double Cheese Burger', 160, '🍔', 'Juicy veg patty with molten cheese slices, lettuce, and our signature café sauce.', 'Burger', 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800'),
('Premium Club Sandwich', 120, '🥪', 'Triple-decker with fresh veggies, herb spreads and soft grilled paneer.', 'Sandwich', 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&q=80&w=800'),
('Café Chilli Fries', 90, '🍟', 'Crispy golden fries tossed in our secret spicy seasoning blend.', 'Fries', 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&q=80&w=800'),
('Classic Lemon Mojito', 80, '🍹', 'Refreshing lime, muddled mint leaves, and a dash of cane sugar.', 'Mocktail', 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&q=80&w=800'),
('Belgium Chocolate Shake', 110, '🍫', 'Thick, creamy blend of rich dark chocolate cocoa and premium vanilla.', 'Shake', 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&q=80&w=800'),
('Sun-Kissed Orange', 60, '🍊', 'Freshly squeezed forest-fresh oranges with a hint of ginger.', 'Fresh Juice', 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=800'),
('Paneer Tikka Starter', 150, '🍢', 'Soft paneer cubes marinated in spices and charred to perfection.', 'Starter', 'https://images.unsplash.com/photo-1567184109411-47a7a392855f?auto=format&fit=crop&q=80&w=800'),
('MJC Signature Platter', 250, '✨', 'A curation of our best starters, served with house special dips.', 'Special', 'https://images.unsplash.com/photo-1544124499-196122df31c4?auto=format&fit=crop&q=80&w=800'),
('Blue Lagoon Mocktail', 90, '🌊', 'A vibrant blend of citrus juices and blue curacao syrup.', 'Mocktail', 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&q=80&w=800'),
('Grilled Peri-Peri Burger', 170, '🔥', 'Spicy flamed-grilled patty with red onions and chipotle mayo.', 'Burger', 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&q=80&w=800'),
('Classic Caesar Salad', 140, '🥗', 'Fresh romaine lettuce, crunchy croutons, and our house Caesar dressing.', 'Starter', 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?auto=format&fit=crop&q=80&w=800');


-- Verify the data
SELECT * FROM public.menuitems ORDER BY created_at DESC;

