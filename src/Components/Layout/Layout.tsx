import React from 'react';
import MenuTop from '../MenuTop/MenuTop';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { Box, useColorMode } from '@chakra-ui/react';

const Layout: React.FC = () => {
  const { colorMode } = useColorMode();
  return (
    <Box bgColor={colorMode === 'dark' ? 'gray.800' : 'gray.50'}>
      <MenuTop />
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Layout;
