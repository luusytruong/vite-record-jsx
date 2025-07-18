import { Copy, Funnel, Home, Scan, Trash, Upload } from "lucide-react";
import React from "react";
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
          <NavItem type="button" icon={Scan} onClick={handleExpand} />
          <NavItem type="button" icon={Upload} onClick={handleUpload} />
          <NavItem type="button" icon={Copy} onClick={handleCopy} />
          <NavItem
            type="button"
            icon={Trash}
            onClick={handleDelete}
            className="w-full"
            buttonText={"Xoá dữ liệu"}
            classButton="text-transparent hover:text-red-600 w-full"
            classButtonText="ml-2 hidden md:block"
          />
        </ul>
      </nav>
    </header>
  );
};

export default Header;
