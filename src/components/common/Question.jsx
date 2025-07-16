import { cn } from "@/utils/formatter";

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const Question = ({ question }) => {
  return (
    <div className="flex flex-col items-stretch p-6 rounded-2xl bg-white shadow-sm hover:shadow-lg">
      <p className="text-lg">
        Question {question?.no}
        <span> ({question?.type})</span>
      </p>
      <p className="text-base line-clamp-1 mb-2" style={{ fontWeight: "bold" }}>
        {question?.text}
      </p>
      {question?.candidates && (
        <div className="flex flex-wrap gap-2">
          {question?.candidates?.map((c, idx) => (
            <p
              key={idx}
              className="py-2 px-4 bg-gray-100 text-gray-800 rounded-full shadow-inner shadow-gray-50 line-clamp-1 text-ellipsis whitespace-nowrap w-fit"
            >
              {c}
            </p>
          ))}
        </div>
      )}
      {question?.img_src && (
        <img
          src={question?.img_src}
          alt="question-img"
          className="w-fit h-auto max-h-[240px] my-4"
        />
      )}
      <span className="w-full h-[1px] bg-gray-100 my-4" />
      <RenderContent question={question} />
      <div className="!leading-0">
        <br />
      </div>
    </div>
  );
};

const RenderContent = ({ question }) => {
  switch (question?.type) {
    case "radio":
    case "check-box":
      return question?.options?.map((opt, idx) => (
        <p
          className={cn("line-clamp-1", opt?.is_correct && "answer-color")}
          style={{ color: opt?.is_correct ? "#00aa00" : undefined }}
          key={idx}
        >
          {opt?.is_correct ? `*${alphabet[idx]}.` : `${alphabet[idx]}.`}{" "}
          {opt?.text}
        </p>
      ));

    case "group-radio":
      return (
        <div className="flex flex-col gap-2">
          <div className="!leading-0">
            <br />
          </div>
          {question?.sub_questions.map((sub, idx) => (
            <div key={idx} className="">
              <p className="line-clamp-1" style={{ fontWeight: "bold" }}>
                {idx + 1}
                {") "}
                {sub.text}
              </p>
              {sub?.options?.map((opt, i) => (
                <p
                  key={i}
                  className={cn(
                    "flex gap-2 items-center",
                    opt.is_correct && "answer-color"
                  )}
                  style={{ color: opt.is_correct ? "#00aa00" : undefined }}
                >
                  {opt.is_correct ? `*${alphabet[i]}.` : `${alphabet[i]}.`}{" "}
                  {opt.text}
                </p>
              ))}
            </div>
          ))}
        </div>
      );

    case "group-input":
      return (
        <div className="flex flex-col">
          <div className="!leading-0">
            <br />
          </div>
          {question?.input_answers.map((ans, idx) => (
            <p key={idx}>
              <span style={{ fontWeight: "bold" }}>
                {idx + 1}) {ans.text}
              </span>
              <br />
              <span className="answer-color" style={{ color: "#00aa00" }}>
                {ans.value}
              </span>
            </p>
          ))}
        </div>
      );

    case "grouping-2":
      return (
        <div>
          <div className="!leading-0">
            <br />
          </div>
          {question?.drag_map.map((item, idx) => (
            <div key={idx}>
              <p className="line-clamp-1" style={{ fontWeight: "bold" }}>
                {idx + 1}) {item.text}
              </p>
              {item.answers.map((ans, i) => (
                <p
                  key={i}
                  className="line-clamp-1 answer-color"
                  style={{ color: "#00aa00" }}
                >
                  *{ans}
                </p>
              ))}
            </div>
          ))}
        </div>
      );

    case "drag-drop-2":
      return (
        <div>
          <div className="!leading-0">
            <br />
          </div>
          {question?.drag_map.map((item, idx) => (
            <div key={idx} className="">
              <p className="line-clamp-1" style={{ fontWeight: "bold" }}>
                {idx + 1}) {item.text}
              </p>
              <p
                className="line-clamp-1 answer-color"
                style={{ color: "#00aa00" }}
              >
                *{item.answer}
              </p>
            </div>
          ))}
        </div>
      );

    default:
      return <p className="text-red-500">Không biết dạng gì 😅</p>;
  }
};

export default Question;
