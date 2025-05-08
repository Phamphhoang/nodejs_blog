const path = require("path");
const fs = require("fs");
const BlogPost = require("../models/BlogPost");

exports.getHome = async (req, res) => {
  try {
    const blogposts = await BlogPost.find().lean();
    console.log('alo alo', req.session);
    res.render("home", { blogposts });
  } catch (error) {
    res.status(500).send("Lỗi khi lấy dữ liệu");
  }
};

exports.getDetail = async (req, res) => {
  try {
    const blogdetail = await BlogPost.findById(req.params.id).lean();
    res.render("detail", { blogdetail });
  } catch (error) {
    res.status(500).send("Lỗi khi lấy dữ liệu");
  }
};

exports.getCreate = (req, res) => {
  if(req.session.userId){
    res.render("create");
  }
  res.redirect('/auth/login');
};

exports.postCreate = async (req, res) => {
  try {
    const image = req.files.image;
    const uploadDir = path.resolve(__dirname, "../public/upload");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const timestamp = Date.now();
    const ext = path.extname(image.name);
    const baseName = path.basename(image.name, ext);
    const newFileName = `${timestamp}_${baseName}${ext}`;
    const uploadPath = path.join(uploadDir, newFileName);

    await image.mv(uploadPath);

    req.body.image = "/upload/" + newFileName;

    await BlogPost.create(req.body);
    res.redirect("/home");
  } catch (error) {
    console.error("Lỗi tạo blog post:", error);
    res.status(500).send("Có lỗi xảy ra khi tạo bài viết");
  }
};
