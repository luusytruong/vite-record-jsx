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
    <div className="p-2 pt-0 -mt-2 flex flex-col md:flex-row md:flex-wrap w-full">
      {questions
        ?.filter((q) => q)
        ?.map((q, i) => (
          <Question question={q} key={i} />
        ))}
    </div>
  );
};

export default Home;
