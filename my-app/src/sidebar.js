import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {
  return (
    <Menu>
      <a className="menu-item" href="/swipe">
        Home
      </a>

      <a className="menu-item" href="/matches">
        Matches
      </a>

      <a className="menu-item" href="/profile">
        Profile Settings
      </a>
    </Menu>
  );
};