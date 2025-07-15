export const questions = [
  {
    no: "1",
    text: "Theo Garlan và Shaw, thiết kế kiến trúc xác định điều gì?",
    options: [
      {
        is_correct: true,
        text: "Xác định các thành phần giao diện trong phần mềm",
      },
      {
        is_correct: false,
        text: "Cấu trúc và mối quan hệ chính của phần mềm",
      },
      {
        is_correct: false,
        text: "Các thiết bị và công nghệ sử dụng trong phần mềm",
      },
      {
        is_correct: false,
        text: "Các thuật toán sử dụng trong phần mềm",
      },
    ],
    type: "radio",
  },
  {
    no: "2",
    text: "Cho biết đây là mô hình màu nào?",
    img_src:
      "blob:https://lms.ictu.edu.vn/dd34bc88-d362-4c0d-a374-e9c3a37f5847",
    options: [
      {
        is_correct: false,
        text: "HSV",
      },
      {
        is_correct: false,
        text: "CMY",
      },
      {
        is_correct: false,
        text: "CIE",
      },
      {
        is_correct: true,
        text: "RGB",
      },
    ],
    type: "radio",
  },
  {
    no: "3",
    text: "Phát biểu sau đây về kỹ năng cứng Đúng hay Sai?",
    sub_questions: [
      {
        no: "1",
        text: "Khả năng thành thạo phần mềm Microsoft Excel để phân tích dữ liệu được xem là một kỹ năng cứng",
        options: [
          {
            is_correct: false,
            text: "Đúng",
          },
          {
            is_correct: true,
            text: "Sai",
          },
        ],
      },
      {
        no: "2",
        text: "Kỹ năng lập trình với ngôn ngữ Python hoặc Java thuộc nhóm kỹ năng cứng",
        options: [
          {
            is_correct: false,
            text: "Đúng",
          },
          {
            is_correct: true,
            text: "Sai",
          },
        ],
      },
      {
        no: "3",
        text: "Nghiệp vụ kế toán hay khả năng phân tích tài chính là kỹ năng mềm, không liên quan đến kỹ năng cứng",
        options: [
          {
            is_correct: false,
            text: "Sai",
          },
          {
            is_correct: true,
            text: "Đúng",
          },
        ],
      },
      {
        no: "4",
        text: "Việc giao tiếp lưu loát bằng ngoại ngữ (như tiếng Anh có chứng chỉ IELTS) là kỹ năng mềm",
        options: [
          {
            is_correct: true,
            text: "Đúng",
          },
          {
            is_correct: false,
            text: "Sai",
          },
        ],
      },
    ],
    type: "group-radio",
  },
  {
    no: "4",
    text: "Khi so sánh với kỹ năng cứng, kỹ năng mềm có những đặc điểm nào sau đây? (Chọn 3 đáp án )",
    options: [
      {
        is_correct: true,
        text: "Đòi hỏi một quá trình rèn luyện liên tục và trải nghiệm thực tế",
      },
      {
        is_correct: false,
        text: "Kỹ năng mềm dễ dàng định lượng và đánh giá thông qua các bài kiểm tra hoặc chứng chỉ",
      },
      {
        is_correct: false,
        text: "Thường liên quan trực tiếp đến kiến thức chuyên môn và kỹ thuật cụ thể",
      },
      {
        is_correct: true,
        text: "Không thể được truyền đạt chỉ qua sách vở hay khóa học ngắn hạn",
      },
      {
        is_correct: true,
        text: "Có tính chất khó định lượng, khó dạy và khó học hơn",
      },
      {
        is_correct: false,
        text: "Kỹ năng mềm tập trung vào việc áp dụng kiến thức kỹ thuật để giải quyết vấn đề cụ thể",
      },
    ],
    type: "check-box",
  },
];
