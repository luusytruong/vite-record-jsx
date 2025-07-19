import Button from "@/components/common/Button";
import { useQuestions } from "@/context/context";
const { exportToWord } = await import("@/utils/exportToWord");
import { cn } from "@/utils/formatter";
import parseJSON from "@/utils/parseJSON";
import { removeDuplicateQuestions } from "@/utils/utils";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Select = ({ name, list, onChange, ...props }) => {
  return (
    <select name={name} onChange={onChange} className={props.className}>
      {list?.map(({ key, text }) => (
        <option value={key} key={key}>
          {text}
        </option>
      ))}
    </select>
  );
};

const GroupRadio = ({ name, list, onChange, ...props }) => {
  return (
    <div className={props.className}>
      {list?.map(({ key }) => (
        <label key={key} className={cn("cursor-pointer", props.classLabel)}>
          <input
            className={props.classInput}
            value={key}
            type="radio"
            name={name}
            onChange={onChange}
            checked={name === key}
          />
          <span
            className={cn(
              "!select-none",
              props.classText,
              name === key ? "bg-black text-white" : "bg-gray-100 text-black"
            )}
          >
            {key}
          </span>
        </label>
      ))}
    </div>
  );
};

const Filter = () => {
  const list = [
    { key: "VH&BTPM", text: "Vận hành và bảo trì phần mềm" },
    { key: "CN ASP.NET", text: "Công nghệ ASP.NET" },
    { key: "PPLLT", text: "Phương pháp luận lập trình" },
    { key: "KT&TKPM", text: "Kiến trúc và thiết kế phần mềm" },
    { key: "LTCTBDD", text: "Lập trình cho thiết bị di động" },
  ];
  const ref = useRef();
  const nav = useNavigate();
  const { setQuestionView } = useQuestions();
  const [name, setName] = useState(list?.[0]?.key);

  const handleFilter = () => {
    const value = ref.current.value;
    let json = null;

    if (!value) return toast.error("Không có dữ liệu");

    try {
      json = JSON.parse(value);
    } catch {
      json = parseJSON(value);
    }

    if (!json?.length) return toast.error("Dữ liệu không đúng định dạng");

    const questions = removeDuplicateQuestions(json);
    
    console.log(questions);

    setQuestionView(questions);
    nav("/view");

    exportToWord(questions, name).then((res) => {
      res
        ? toast.success(`Lưu thành công ${questions?.length} câu`)
        : toast.error(`Lưu thất bại ${questions?.length} câu`);
    });
  };

  const handleSubjectChange = ({ target: { value } }) => setName(value);

  return (
    <div className="flex w-full p-4 pt-0">
      <div className="w-full flex flex-1 flex-col items-stretch justify-center p-4 bg-white rounded-4xl shadow-sm hover:shadow-lg">
        <textarea
          ref={ref}
          name="upload-question"
          className="flex-1 resize-none outline-none m-2"
          placeholder="Dán câu hỏi"
        ></textarea>
        <div className="flex flex-col gap-4 items-stretch pt-4">
          <GroupRadio
            name={name}
            list={list}
            onChange={handleSubjectChange}
            className="flex items-center gap-4 overflow-auto"
            classLabel="flex items-center gap-2 active:scale-95"
            classInput="hidden"
            classText="px-4 py-2 !text-[12px] rounded-full text-center whitespace-nowrap hover:bg-gray-800 hover:text-white"
          />
          <Button
            text="Bắt đầu"
            onClick={handleFilter}
            className="bg-black hover:bg-gray-800 text-white p-3 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Filter;
