import md5 from "md5";
import toast from "react-hot-toast";

export const normalize = (str) =>
  str.normalize("NFKC").replace(/\s+/g, " ").trim();

export function removeDuplicateQuestions(questions) {
  const seen = new Set();
  const rawKey = (text = "", json) => `${text} ${JSON.stringify(json)}`;
  console.log("total questions", questions.length);

  return questions.filter((q) => {
    let raw = "";

    if (["radio", "check-box"].includes(q?.type))
      raw = rawKey(
        q?.text,
        q?.options?.sort((a, b) => a.text.localeCompare(b.text))
      );

    if (["drag-drop-2", "grouping-2"].includes(q?.type))
      raw = rawKey(
        q?.text,
        q?.drag_map?.sort((a, b) => a.text.localeCompare(b.text))
      );

    if (q?.type === "group-input")
      raw = rawKey(
        q?.text,
        q?.input_answers?.sort((a, b) => a.text.localeCompare(b.text))
      );

    if (q?.type === "group-radio")
      raw = rawKey(
        q?.text,
        q?.sub_questions
          ?.map((sub) => ({
            ...sub,
            options: sub?.options?.sort((a, b) => a.text.localeCompare(b.text)),
          }))
          .sort((a, b) => a.text.localeCompare(b.text))
      );

    const key = md5(raw || q?.text || q?.type);

    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const copyFormat = (el) => {
  if (!el) return;
  navigator.clipboard
    .write([
      new ClipboardItem({
        "text/html": new Blob([el.innerHTML], { type: "text/html" }),
        "text/plain": new Blob([el.innerText], { type: "text/plain" }),
      }),
    ])
    .then(() => toast.success("Copy thành công"))
    .catch(() => toast.error("Copy thất bại"));
};
