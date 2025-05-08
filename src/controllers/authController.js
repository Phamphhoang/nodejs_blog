const User = require("../models/User");
const bcrypt = require("bcrypt");

const getRegister = (req, res) => {
  res.render("register");
};

const postRegister = async(req, res) => {
  try {
    await User.create(req.body);
    res.redirect("/home");
  } catch (error) {
    console.error("Lỗi tạo user:", error);
    res.status(500).send("Có lỗi xảy ra khi tạo user");
  }
};

const getLogin = (req, res) => {
  res.render("login");
};

const postLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).exec();

    if (!user) {
      return res.redirect("/auth/register");
    }

    const same = await bcrypt.compare(password, user.password);

    if (same) {
      req.session.userId = user._id;
      res.redirect("/home");
    } else {
      res.redirect("/auth/login");
    }
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    res.status(500).send("Có lỗi xảy ra khi đăng nhập!");
  }
};

const getLogout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/home");
  });
};

module.exports = {
  getRegister,
  postRegister,
  getLogin,
  postLogin,
  getLogout
};
