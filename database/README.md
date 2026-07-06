# Database Setup

This project uses a WordPress database exported from WordPress Studio.

1. Set up a local WordPress environment (Studio, Local, XAMPP, etc.)
2. Import the SQL file:
   - **Studio**: Add site → "Import from a backup" → select `database.sql`
     (Note: Studio expects a .sql or .zip/.tar.gz produced by its own export —
     if importing into a *different* tool like phpMyAdmin, just run the .sql
     file directly against a fresh database.)
3. Update `wp-config.php` with your local DB credentials if needed
4. If the site URL differs from the original, update it via:
   wp search-replace 'http://old-url.local' 'http://new-url.local'