# Nessie's Home — Personal Portfolio/Blog

A personal portfolio & blog site with a retro/y2k desktop aesthetic (draggable-looking "window" cards (not actually draggable), pastel gradients, bubble-style headings). The frontend is built with **React + Vite**, and content (blog posts & projects) is managed through **headless WordPress** — WordPress is used purely as a CMS/backend; all rendering and layout is handled by React.

## Tech Stack

- **React 19** + **Vite** — frontend framework & build tool
- **React Router** — client-side routing (`/`, `/blog`, `/blog/:slug`, `/projects`)
- **CSS Modules** — scoped component styling
- **WordPress REST API** (`wp/v2`) — headless content backend
- **ACF (Advanced Custom Fields)** — custom fields on WordPress content (planned/partial)
- **CPT UI** — used on the WordPress side to register the custom `project` post type

## How It Works

- WordPress is used **headless**: no theme, no WordPress-rendered pages. It only stores content and exposes it via its built-in REST API.
- The React app fetches that content client-side (`src/api/wordpress.js`) using `fetch`, and renders it inside custom components styled to look like little OS-style windows.
- Routing is handled entirely by React Router — e.g. `/blog/:slug` fetches the matching post from WordPress by slug and renders it as a single post page.


## Prerequisites

- **Node.js** (v18 or newer recommended) and **npm**
- A running **WordPress** site with:
  - REST API enabled (default, no setup needed)
  - **CORS** configured to allow requests from your local dev origin (e.g. `http://localhost:5173`), since the frontend and WordPress run on different origins
  - (Optional) **ACF** and **CPT UI** plugins installed, if you're using custom fields / the `project` post type

## Running Locally

1. **Clone/download the project**, then move into the project folder:
   ```bash
   cd nessie_blog
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up your environment variable.** Create a `.env` file in the project root pointing to your WordPress site's base URL:
   ```
   VITE_WORDPRESS_URL=https://your-wordpress-site.com
   ```
   > This should be the root URL of your WordPress install — the app appends `/wp-json/wp/v2/...` to it automatically.

4. **Start the dev server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:5173` (Vite's default port).

5. **Verify the WordPress connection.** Open the browser console/Network tab and check that requests to `/wp-json/wp/v2/posts` (and `/wp-json/wp/v2/project`, if used) return data successfully. If they fail with a CORS error, you'll need to enable CORS headers on the WordPress side (via a plugin or a snippet in `functions.php`).

## Other Scripts

```bash
npm run build      # production build
npm run preview     # preview the production build locally
npm run lint        # run ESLint
```
