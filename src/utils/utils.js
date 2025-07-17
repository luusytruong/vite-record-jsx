import toast from "react-hot-toast";

export function removeDuplicateQuestions(questions) {
  const seen = new Set();
  return questions.filter((q) => {
    const key = q.text.trim();
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
