import Question from "@/components/common/Question";
import { useEffect, useState } from "react";
import { getStorage } from "@/utils/chrome";
import toast from "react-hot-toast";
import { sampleQuestions } from "@/constants/data";
const Home = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    getStorage("test").then((res) => {
      setQuestions(res || sampleQuestions);
      res
        ? toast.success("Tải dữ liệu thành công")
        : toast.success("Không có dữ liệu");
    });
  }, []);

  return (
    <div className="flex flex-col gap-4 pt-0 w-full">
      {questions
        ?.filter((q) => q)
        ?.map((q, i) => (
          <Question question={q} key={i} />
        ))}
    </div>
  );
};

export default Home;
