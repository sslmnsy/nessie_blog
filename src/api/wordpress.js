import axios from 'axios';

const API_URL = import.meta.env.VITE_WORDPRESS_URL || "";
const WP_API_BASE = `${API_URL.replace(/\/$/, "")}/wp-json/wp/v2`;

const axiosInstance = axios.create({
  baseURL: API_URL ? WP_API_BASE : "/wp-json/wp/v2",
  timeout: 10000,
});

export async function getPosts(perPage = 4) {
  try {
    const response = await axiosInstance.get('/posts', {
      params: {
        per_page: perPage,
        _fields: 'id,title,excerpt,link,slug'
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch posts: ${error.message}`);
  }
}

export async function getPostBySlug(slug) {
  try {
    const response = await axiosInstance.get('/posts', {
      params: {
        slug: slug,
        _fields: 'id,title,content,excerpt,slug'
      }
    });

    if (response.data.length === 0) {
      throw new Error("Post not found");
    }

    return response.data[0];
  } catch (error) {
    throw new Error(`Failed to fetch post: ${error.message}`);
  }
}

export async function getProjects(perPage = 2) {
  try {
    const response = await axiosInstance.get('/project', {
      params: {
        _embed: true,
        per_page: perPage
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch projects: ${error.message}`);
  }
}

export async function getAboutPage() {
  try {
    const response = await axiosInstance.get('/pages', {
      params: {
        slug: 'about',
        _fields: 'id,title,acf'
      }
    });

    if (response.data.length === 0) {
      throw new Error("About page not found");
    }

    return response.data[0];
  } catch (error) {
    throw new Error(`Failed to fetch about page: ${error.message}`);
  }
}