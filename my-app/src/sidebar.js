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

      <a className="menu-item" href="/angular">
        Profile
      </a>

      <a className="menu-item" href="/react">
        Settings
      </a>
    </Menu>
  );
};