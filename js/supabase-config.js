// ============================================
// MJC - Supabase Configuration
// ============================================

// Supabase credentials
const SUPABASE_URL = 'https://qvoguuisfbptntmxbzcm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2b2d1dWlzZmJwdG50bXhiemNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3ODIwMjIsImV4cCI6MjA4ODM1ODAyMn0.Bc3BBUZZas8olRdqdXYOGaHp75rkf6CBkwLP5vkiFyw';

// Initialize Supabase client using CDN
const { createClient } = supabase;

const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Console log for debugging
console.log('🚀 Supabase client initialized');
console.log('📡 Project URL:', SUPABASE_URL);

// Menu Items Table Functions
const MenuItems = {
  // Fetch all menu items
  async getAll() {
    try {
      console.log('📋 Fetching all menu items...');
      const { data, error } = await supabaseClient
        .from('menuitems')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching menu items:', error);
        throw error;
      }

      console.log('✅ Menu items fetched:', data?.length || 0, 'items');
      return data || [];
    } catch (err) {
      console.error('❌ Exception in getAll:', err);
      return [];
    }
  },

  // Add new menu item
  async add(item) {
    try {
      console.log('➕ Adding new menu item:', item.name);
      const { data, error } = await supabaseClient
        .from('menuitems')
        .insert([item])
        .select();

      if (error) {
        console.error('❌ Error adding menu item:', error);
        throw error;
      }

      console.log('✅ Menu item added:', data);
      return { success: true, data };
    } catch (err) {
      console.error('❌ Exception in add:', err);
      return { success: false, error: err };
    }
  },

  // Update menu item
  async update(id, updates) {
    try {
      console.log('✏️ Updating menu item:', id);
      const { data, error } = await supabaseClient
        .from('menuitems')
        .update(updates)
        .eq('id', id)
        .select();

      if (error) {
        console.error('❌ Error updating menu item:', error);
        throw error;
      }

      console.log('✅ Menu item updated:', data);
      return { success: true, data };
    } catch (err) {
      console.error('❌ Exception in update:', err);
      return { success: false, error: err };
    }
  },

  // Delete menu item
  async delete(id) {
    try {
      console.log('🗑️ Deleting menu item:', id);
      const { error } = await supabaseClient
        .from('menuitems')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('❌ Error deleting menu item:', error);
        throw error;
      }

      console.log('✅ Menu item deleted successfully');
      return { success: true };
    } catch (err) {
      console.error('❌ Exception in delete:', err);
      return { success: false, error: err };
    }
  },

  // Fetch items by category
  async getByCategory(category) {
    try {
      console.log('📋 Fetching menu items by category:', category);
      const { data, error } = await supabaseClient
        .from('menuitems')
        .select('*')
        .eq('category', category)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('❌ Error fetching menu items by category:', error);
        throw error;
      }

      console.log('✅ Category items fetched:', data?.length || 0, 'items');
      return data || [];
    } catch (err) {
      console.error('❌ Exception in getByCategory:', err);
      return [];
    }
  }
};

console.log('📦 MenuItems API ready');

