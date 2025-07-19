import Question from "@/components/common/Question";
import { useQuestions } from "@/context/context";
import { useEffect, useRef } from "react";

const Home = () => {
  const { questions, handleLoad } = useQuestions();
  const ref = useRef(handleLoad);

  useEffect(() => {
    ref.current();
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
