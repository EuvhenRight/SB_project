import React from 'react';
import MenuTop from '../MenuTop/MenuTop';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <MenuTop />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
