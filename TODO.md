

## Task Summary
Convert static Mariam Juice Cafe website to use Supabase database with admin panel control.

---

## Phase 1: Setup & Configuration
- [ ] 1.1 Create supabase-config.js - Supabase client configuration with CDN
- [ ] 1.2 Define Supabase table structure (menuitems table)

## Phase 2: Admin Panel
- [x] 2.1 Create admin.html - Admin panel page
- [x] 2.2 Implement "Add New Item" form with fields: name, price, emoji, description, category, image (optional)
- [x] 2.3 Implement Edit functionality for existing items
- [x] 2.4 Implement Delete functionality with confirmation
- [x] 2.5 Connect admin form to Supabase (Create, Read, Update, Delete operations)
- [x] 2.6 Secure admin panel with password and userid authentication

## Phase 3: Frontend Integration
- [ ] 3.1 Update index.html to fetch menu items from Supabase
- [ ] 3.2 Update menu.html to fetch menu items from Supabase
- [ ] 3.3 Update order.html to fetch menu items from Supabase (replace static MENU_ITEMS array)
- [ ] 3.4 Add console logs for debugging throughout

## Phase 4: Cleanup & Testing
- [x] 4.1 Remove all default/static menu items from index.html
- [x] 4.2 Remove all default/static menu items from menu.html
- [x] 4.3 Test full CRUD operations from admin panel
- [x] 4.4 Test menu display on index.html and menu.html
- [x] 4.5 Test order functionality on order.html

---

## Supabase Table Schema
```
Table: menuitems
- id: uuid (primary key)
- name: text (required)
- price: number (required)
- emoji: text (required)
- description: text
- category: text (required) - e.g., "Fresh Juice", "Smoothie", "Cold Press", "Shake", "Special"
- image: text (optional) - URL for image
- created_at: timestamp with time zone
```

## File Changes Summary
1. Create: supabase-config.js
2. Create: admin.html
3. Modify: index.html - Replace static menu with Supabase fetch
4. Modify: menu.html - Replace static menu with Supabase fetch
5. Modify: order.html - Replace MENU_ITEMS array with Supabase fetch
6. Modify: js/main.js - Add Supabase integration functions

