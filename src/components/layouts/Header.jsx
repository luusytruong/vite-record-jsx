import {
  Copy,
  Funnel,
  Home,
  Scan,
  Settings,
  Trash,
  Upload,
} from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import Button from "../common/Button";
import { copyFormat } from "@/utils/utils";
import { setStorage } from "@/utils/chrome";
import toast from "react-hot-toast";
import parseJSON from "@/utils/parseJSON";
const NavItem = ({ to, icon }) => {
  const Icon = icon;
  return (
    <li className="flex bg-white rounded-2xl shadow-sm hover:shadow-xl">
      <NavLink
        to={to}
        className="p-3 h-[44px] aspect-square flex items-center justify-center"
      >
        <Icon strokeWidth={1.6} size={18} />
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
  const handleUpload = async () => {
    const text = await navigator.clipboard.readText();
    if (!text) return toast.error("Không có dữ liệu");
    const json = parseJSON(text);
    console.log(JSON.stringify(json, null, 2));

    if (!json?.length) {
      toast.error("Dữ liệu không đúng định dạng");
      return;
    }
    const result = await setStorage("restore", json);
    if (result) toast.success(`Lưu thành công ${json?.length} câu`);
    else toast.error(`Lưu thất bại ${json?.length} câu`);
  };

  const handleExpand = () => {
    chrome?.runtime?.openOptionsPage();
  };

  return (
    <header className="flex select-none">
      <nav className="p-4 w-full">
        <ul className="flex gap-4 items-center">
          <NavItem to="/" icon={Home} />
          {/* <NavItem to="/setting" icon={Settings} /> */}
          <NavItem to="/filter" icon={Funnel} />
          <Button
            size={18}
            className="flex h-[44px] aspect-square items-center justify-center p-3 bg-white rounded-2xl shadow-sm hover:shadow-xl"
            icon={Scan}
            onClick={handleExpand}
          />
          <Button
            size={18}
            className="flex h-[44px] aspect-square items-center justify-center p-3 bg-white rounded-2xl shadow-sm hover:shadow-xl"
            icon={Upload}
            onClick={handleUpload}
          />
          <Button
            size={18}
            className="flex h-[44px] aspect-square items-center justify-center p-3 bg-white rounded-2xl shadow-sm hover:shadow-xl"
            icon={Copy}
            onClick={handleCopy}
          />
          <Button
            size={18}
            classText="ml-2 hidden md:block"
            className="flex items-center justify-center h-[44px] p-3 w-full bg-white text-transparent rounded-2xl shadow-sm hover:shadow-xl hover:text-red-600"
            icon={Trash}
            text={"Xoá dữ liệu"}
            onClick={handleDelete}
          />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
