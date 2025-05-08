const User = require("../models/User");

module.exports = async (req, res, next) => {
    try {
      const { userId } = req.session;
  
      if (!userId) {
        return res.redirect('/home'); // Chưa có session
      }
  
      const user = await User.findById(userId).lean(); // Kiểm tra user tồn tại
  
      if (!user) {
        return res.redirect('/login'); // Session có nhưng user không tồn tại
      }
      next(); // Cho phép đi tiếp nếu hợp lệ
    } catch (error) {
      console.error('Lỗi middleware xác thực:', error);
      res.status(500).send('Lỗi máy chủ');
    }
  };

  


