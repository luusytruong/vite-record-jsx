export const sampleQuestions = [
  {
    no: "1",
    text: "Theo Garlan và Shaw, thiết kế kiến trúc xác định điều gì?",
    is_new: true,
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
    img_src: "https://images4.alphacoders.com/128/thumb-1920-1287807.jpg",
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
  {
    no: "5",
    text: "Điền thông tin thích hợp vào các chỗ trống trong phát biểu sau đây: DevOps là sự kết hợp giữa __(1)___ và __(2)___, nhằm tối ưu quy trình phát triển phần mềm. Trong đó, nhóm __(3)__ chịu trách nhiệm phát triển, trong khi nhóm __(4)___ chịu trách nhiệm về cơ sở hạ tầng, triển khai ứng dụng, giám sát ứng dung vận hành và đảm bảo ứng dụng hoạt động ổn định, hiểu quả trên môi trường vận hành. Biết các thông tin có thể điền bao gồm: ops, dev, sec, kiểm thử, lập trình, phát triển, vận hành",
    input_answers: [
      {
        text: "ô trống (1)",
        value: "dev",
      },
      {
        text: "ô trống (2)",
        value: "ops",
      },
      {
        text: "ô trống (4)",
        value: "dev",
      },
      {
        text: "ô trống (3)",
        value: "ops",
      },
    ],
    type: "group-input",
  },
  {
    no: "6",
    text: "Hãy kéo thả mỗi khái niệm với mô tả phù hợp nhất về tính liên tục của kỹ năng mềm.",
    candidates: [
      "Là lẽ dĩ nhiên bởi không có bất cứ thước đo nào dành cho kỹ năng mềm",
      "Thể hiện ở việc không có bất kỳ giới hạn nào cho nó, đòi hỏi học hỏi không ngừng",
    ],
    drag_map: [
      {
        text: 'Việc "học, học nữa, học mãi" đối với kỹ năng mềm',
        answers: [
          "Là lẽ dĩ nhiên bởi không có bất cứ thước đo nào dành cho kỹ năng mềm",
        ],
      },
      {
        text: "Tính liên tục của kỹ năng mềm",
        answers: [
          "Thể hiện ở việc không có bất kỳ giới hạn nào cho nó, đòi hỏi học hỏi không ngừng",
        ],
      },
    ],
    type: "grouping-2",
  },
  {
    no: "7",
    text: "Hãy nối mỗi kỹ năng mềm với mô tả phù hợp nhất",
    candidates: [
      "Bao gồm việc truyền cảm hứng, động viên và dẫn dắt người khác đạt được mục tiêu chung",
      "Giúp bạn phân tích thông tin khách quan, tìm nguyên nhân gốc rễ và đưa ra giải pháp sáng tạo",
      "Giúp bạn ứng phó linh hoạt với thay đổi, duy trì bình tĩnh dưới áp lực và kiên trì theo đuổi mục tiêu",
    ],
    drag_map: [
      {
        text: "Khả năng thích nghi, quản lý cảm xúc và sự kiên nhẫn",
        answer:
          "Bao gồm việc truyền cảm hứng, động viên và dẫn dắt người khác đạt được mục tiêu chung",
      },
      {
        text: "Kỹ năng lãnh đạo và quản lý con người",
        answer:
          "Giúp bạn phân tích thông tin khách quan, tìm nguyên nhân gốc rễ và đưa ra giải pháp sáng tạo",
      },
      {
        text: "Tư duy phản biện và giải quyết vấn đề",
        answer:
          "Giúp bạn ứng phó linh hoạt với thay đổi, duy trì bình tĩnh dưới áp lực và kiên trì theo đuổi mục tiêu",
      },
    ],
    type: "drag-drop-2",
  },
];
