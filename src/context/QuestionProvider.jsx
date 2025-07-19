import { getStorage, setStorage } from "@/utils/chrome";
import { useState } from "react";
import toast from "react-hot-toast";
import { sampleQuestions } from "@/constants/data";
import { QuestionContext } from "./context";

const QuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [questionView, setQuestionView] = useState(null);

  const handleDelete = () => {
    setStorage("test", null).then((res) => {
      if (res) {
        setQuestions([]);
        toast.success("Xoá dữ liệu thành công");
      } else toast.error("Xoá dữ liệu thất bại");
    });
  };

  const handleLoad = () => {
    getStorage("test").then((res) => {
      setQuestions(res || sampleQuestions);
      res
        ? toast.success("Tải dữ liệu thành công")
        : toast.success("Không có dữ liệu, hiển thị mẫu dữ liệu");
    });
  };

  return (
    <QuestionContext.Provider
      value={{
        questions,
        handleDelete,
        handleLoad,
        questionView,
        setQuestionView,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

export { QuestionProvider };
