import Question from "@/components/common/Question";
import { useQuestions } from "@/context/context";

const View = () => {
  const { questionView } = useQuestions();

  return (
    <div className="px-2 pb-12 -mt-2 flex flex-col md:flex-row md:flex-wrap w-full">
      {questionView
        ?.filter((q) => q)
        ?.map((q, i) => (
          <Question question={q} key={i} />
        ))}
      <div className="fixed bottom-0 right-0 left-0 bg-white p-2 text-center border-t border-gray-100">
        Đang xem trước {questionView?.length || 0} câu
      </div>
    </div>
  );
};

export default View;
