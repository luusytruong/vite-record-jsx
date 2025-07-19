import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export const exportToWord = async (questions, name = "test") => {
  const GREEN = "00AA00";

  const boldText = (text) =>
    new TextRun({
      text,
      bold: true,
      font: "Times New Roman",
      size: 24,
    });

  const greenText = (text) =>
    new TextRun({
      text,
      color: GREEN,
      font: "Times New Roman",
      size: 24,
    });

  const normalText = (text) =>
    new TextRun({
      text,
      font: "Times New Roman",
      size: 24,
    });

  const paragraphs = [];

  questions?.forEach((q, i) => {
    // Question header
    paragraphs.push(
      new Paragraph({
        children: [normalText(`Question ${i + 1} (${q.type})`)],
      }),
      new Paragraph({
        children: [boldText(q.text)],
      })
    );

    if (q.type === "radio" || q.type === "check-box") {
      q.options.forEach((opt, idx) => {
        const label = String.fromCharCode(65 + idx);
        const run =
          opt.is_correct !== false
            ? greenText(`*${label}. ${opt.text}`)
            : normalText(`${label}. ${opt.text}`);
        paragraphs.push(new Paragraph({ children: [run] }));
      });
    }

    if (q.type === "drag-drop-2") {
      q.candidates?.forEach((c) =>
        paragraphs.push(new Paragraph({ children: [normalText(c)] }))
      );
      paragraphs.push(new Paragraph(""));
      q.drag_map?.forEach((item, i) => {
        paragraphs.push(
          new Paragraph({ children: [boldText(`${i + 1}) ${item.text}`)] })
        );
        paragraphs.push(
          new Paragraph({ children: [greenText(`*${item.answer}`)] })
        );
      });
    }

    if (q.type === "grouping-2") {
      q.candidates?.forEach((c) =>
        paragraphs.push(new Paragraph({ children: [normalText(c)] }))
      );
      paragraphs.push(new Paragraph(""));
      q.drag_map?.forEach((item, i) => {
        paragraphs.push(
          new Paragraph({ children: [boldText(`${i + 1}) ${item.text}`)] })
        );
        item.answers?.forEach((ans) =>
          paragraphs.push(new Paragraph({ children: [greenText(`*${ans}`)] }))
        );
      });
    }

    if (q.type === "group-radio") {
      paragraphs.push(new Paragraph(""));
      q.sub_questions?.forEach((sub, i) => {
        paragraphs.push(
          new Paragraph({
            children: [boldText(`${sub.no || i + 1}) ${sub.text}`)],
          })
        );
        sub.options?.forEach((opt, idx) => {
          const label = String.fromCharCode(65 + idx);
          const run =
            opt.is_correct !== false
              ? greenText(`*${label}. ${opt.text}`)
              : normalText(`${label}. ${opt.text}`);
          paragraphs.push(new Paragraph({ children: [run] }));
        });
      });
    }

    if (q.type === "group-input") {
      paragraphs.push(new Paragraph(""));
      q.input_answers?.forEach((input, idx) => {
        paragraphs.push(
          new Paragraph({ children: [boldText(`${idx + 1}) ${input.text}`)] })
        );
        paragraphs.push(new Paragraph({ children: [greenText(input.value)] }));
      });
    }

    paragraphs.push(new Paragraph(""));
  });

  const doc = new Document({
    sections: [
      {
        children: paragraphs,
      },
    ],
  });

  try {
    const blob = await Packer.toBlob(doc);
    saveAs(blob, `${name} ${questions?.length}Q_${Date.now()}.docx`);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
