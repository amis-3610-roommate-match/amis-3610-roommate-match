import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/">
        Home
      </a>

      <a className="menu-item" href="/matches">
        Matches
      </a>

      <a className="menu-item" href="/profile">
        Profile Settings
      </a>

      <a className="menu-item" href="/login">
        Login
      </a>
    </Menu>
  );
};