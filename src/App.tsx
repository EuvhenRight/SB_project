import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import Blog from './Pages/Blog/Blog';
import Home from './Pages/Home/Home';
import Layout from './Components/Layout/Layout';
import Posts from './Pages/Posts/Posts';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Posts />} />
        <Route path="blog" element={<Blog />} />
      </Route>
    </Routes>
  );
};

export default App;
