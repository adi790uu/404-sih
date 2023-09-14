//clint>> src >> api >> index.js

import axios from 'axios';

const API = axios.create({baseURL: 'http://localhost:4000'});

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
  });

  
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const createPosts = (newPost) => API.post('/posts', newPost);
// export const fetchPost = (id) => API.get(`/posts/${id}`);
// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

// export const updatePost = (id, updatePost) => API.patch(`/posts/${id}`, updatePost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, { value });

export const signIn = (formData) => API.post('/api/v1/users/login', formData);
export const workersignIn = (formData) => API.post('/api/v1/users/employee/authEmployee', formData);
export const agencysignIn = (formData) => API.post('/user/agencysignin', formData);
export const signUp = (formData) => API.post('/api/v1/users/register', formData);
export const workersignUp = (formData) => API.post('/api/v1/users/employee/register', formData);
export const agencysignUp = (formData) => API.post('/user/agencysignup', formData);