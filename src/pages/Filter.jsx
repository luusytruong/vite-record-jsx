import Button from "@/components/common/Button";
import { setStorage } from "@/utils/chrome";
import parseJSON from "@/utils/parseJSON";
import React, { useRef } from "react";
import toast from "react-hot-toast";

const Filter = () => {
  const ref = useRef();
  const handleChange = async () => {
    const json = parseJSON(ref.current.value);
    console.log(JSON.stringify(json, null, 2));

    if (!json?.length) {
      toast.error("Dữ liệu không đúng định dạng");
      return;
    }
    const result = await setStorage("restore", json);
    if (result) toast.success(`Lưu thành công ${json?.length} câu`);
    else toast.error(`Lưu thất bại ${json?.length} câu`);
  };
  return (
    <div className="m-4 mt-0 flex flex-1 flex-col items-stretch justify-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-lg">
      <textarea
        ref={ref}
        name="upload-question"
        className="flex-1 resize-horizontal outline-none"
        placeholder="Dán câu hỏi"
      ></textarea>
      <Button
        text="Bắt đầu"
        onClick={handleChange}
        className="mt-4 bg-black hover:bg-gray-800 text-white p-3 rounded-full shadow-sm hover:shadow-lg"
      />
    </div>
  );
};

export default Filter;
