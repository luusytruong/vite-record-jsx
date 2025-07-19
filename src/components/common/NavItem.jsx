import { NavLink } from "react-router-dom";

const NavItem = ({ to, icon }) => {
  const Icon = icon;
  return (
    <li className={"flex rounded-2xl shadow-sm hover:shadow-xl bg-white"}>
      <NavLink
        to={to}
        className="p-3 h-[44px] aspect-square flex items-center justify-center"
      >
        <Icon strokeWidth={1.6} size={18} />
      </NavLink>
    </li>
  );
};
export default NavItem;
