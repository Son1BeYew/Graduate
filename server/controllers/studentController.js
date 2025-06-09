const Account = require("../models/account");
const StudentInfo = require("../models/studentInfo");

// Tạo thông tin sinh viên
exports.createStudentInfo = async (req, res) => {
  const {
    username,
    fullname,
    educationProgram,
    educationLevel,
    faculty,
    className,
    courseYear,
  } = req.body;

  try {
    const account = await Account.findOne({ username });
    if (!account)
      return res.status(404).json({ message: "Không tìm thấy tài khoản" });

    const existed = await StudentInfo.findOne({ accountId: account._id });
    if (existed)
      return res
        .status(400)
        .json({ message: "Thông tin sinh viên đã tồn tại" });

    const student = new StudentInfo({
      accountId: account._id,
      studentCode: account.username,
      email: account.email,
      fullname,
      educationProgram,
      educationLevel,
      faculty,
      className,
      courseYear,
    });

    await student.save();
    res.json({ message: "Tạo thông tin sinh viên thành công", student });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

// Lấy thông tin sinh viên theo username
exports.getStudentInfo = async (req, res) => {
  try {
    const student = await StudentInfo.findOne({
      studentCode: req.params.username,
    });
    if (!student)
      return res
        .status(404)
        .json({ message: "Không tìm thấy thông tin sinh viên" });

    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
