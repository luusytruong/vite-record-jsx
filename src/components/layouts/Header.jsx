import { Home, Settings } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
const NavItem = ({ to, icon }) => {
  const Icon = icon;
  return (
    <li className="flex el-1">
      <NavLink to={to} className="p-3">
        <Icon strokeWidth={1} />
      </NavLink>
    </li>
  );
};
const Header = () => {
  return (
    <header className="flex">
      <nav className="p-3">
        <ul className="flex gap-3 items-center">
          <NavItem to="/" icon={Home} />
          <NavItem to="/settings" icon={Settings} />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
