import { Copy, Home, Settings, Trash, Upload } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../common/Button";
import { copyFormat } from "@/utils/utils";
import { setStorage } from "@/utils/chrome";
import toast from "react-hot-toast";
const NavItem = ({ to, icon }) => {
  const Icon = icon;
  return (
    <li className="flex bg-white rounded-2xl shadow-sm hover:shadow-lg">
      <NavLink to={to} className="p-3">
        <Icon strokeWidth={1.3} />
      </NavLink>
    </li>
  );
};
const Header = () => {
  const handleCopy = () => {
    const main = document.querySelector("main");
    copyFormat(main);
  };
  const handleDelete = () => {
    setStorage("test", []).then((res) => {
      res
        ? toast.success("Xoá dữ liệu thành công")
        : toast.error("Xoá dữ liệu thất bại");
    });
  };
  return (
    <header className="flex select-none">
      <nav className="p-4 w-full">
        <ul className="flex gap-4 items-center">
          <NavItem to="/" icon={Home} />
          <NavItem to="/settings" icon={Settings} />
          <NavItem to="/upload" icon={Upload} />
          <Button
            className="flex p-3 bg-white rounded-2xl shadow-sm hover:shadow-lg"
            icon={Copy}
            onClick={handleCopy}
          />
          <Button
            classText="ml-2"
            className="flex items-center justify-center p-3 w-full bg-white text-transparent rounded-2xl shadow-sm hover:shadow-lg hover:text-red-600"
            text={"Xoá hết"}
            icon={Trash}
            onClick={handleDelete}
          />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
