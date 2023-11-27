import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Blog from './Pages/Blog/Blog';
import Welcome from './Pages/Welcome/Welcome';
import Layout from './Components/Layout/Layout';
import Posts from './Pages/Posts/Posts';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Welcome />} />
        <Route path="home" element={<Posts />} />
        <Route path="blog" element={<Blog />} />
      </Route>
    </Routes>
  );
};

export default App;
