import React from 'react';
import { NavLink } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink exact to="/" activeClassName={'active'}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/about" activeClassName={'active'}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink exact to="/contact" activeClassName={'active'}>
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink to="/blog" activeClassName={'active'}>
            Blog
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default NavigationBar;
