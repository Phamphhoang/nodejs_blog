
module.exports = (req, res, next) => {
    try {
      const { userId } = req.session;
      console.log("🚀 ~ userId:", userId)
      if (userId) {
        return res.redirect('/home');
      }
      next();
    } catch (error) {
      console.error('Lỗi middleware xác thực:', error);
      res.status(500).send('Lỗi máy chủ');
    }
  };

  


