import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Blog from './Pages/Blog/Blog';
import Home from './Pages/Home/Home';
import Layout from './Pages/Layout/Layout';
import Posts from './Pages/Posts/Posts';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="posts" element={<Posts />} />
        {/* <Route path="blog" element={<Blog />} /> */}
      </Route>
    </Routes>
  );
}
