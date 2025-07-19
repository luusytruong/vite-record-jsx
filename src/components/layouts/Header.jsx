import { Copy, Funnel, Home, Scan, Trash, Upload } from "lucide-react";
import React from "react";
import Button from "../common/Button";
import { copyFormat } from "@/utils/utils";
import { setStorage } from "@/utils/chrome";
import toast from "react-hot-toast";
import parseJSON from "@/utils/parseJSON";
import { useQuestions } from "@/context/context";
import NavItem from "../common/NavItem";

const Header = () => {
  const { handleDelete } = useQuestions();

  const handleCopy = () => {
    const main = document.querySelector("main");
    copyFormat(main);
  };

  const handleUpload = async () => {
    const text = await navigator.clipboard.readText();
    if (!text) return toast.error("Không có dữ liệu");
    let json = null;

    try {
      json = JSON.parse(text);
    } catch {
      json = parseJSON(text);
    }

    if (!json?.length) return toast.error("Dữ liệu không đúng định dạng");

    setStorage("restore", json).then((res) =>
      res
        ? toast.success(`Lưu thành công ${json?.length} câu`)
        : toast.error(`Lưu thất bại ${json?.length} câu`)
    );
  };

  const handleExpand = () => {
    chrome?.runtime?.openOptionsPage();
  };

  return (
    <header className="flex select-none">
      <nav className="p-4 w-full">
        <ul className="flex gap-4 items-center">
          <NavItem to="/" icon={Home} />
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
