const mongoose = require("mongoose");
const BlogPost = require("./models/BlogPost");

mongoose.connect("mongodb://localhost/my_database", {
  useNewUrlParser: true,
});

async function run() {
  try {
    await mongoose.connect("mongodb://localhost/my_database", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const blogpost = await BlogPost.create({
      title: "Khoá Node.JS từ cơ bản",
      body: "Nếu bạn đam mê với Javascript và muốn khám phá cách xây dựng ứng dụng với Node.js thì đây là cuốn sách dành cho bạn",
    });

    console.log(blogpost);
  } catch (error) {
    console.error(error);
  }
}

async function run() {
  try {
    await mongoose.connect("mongodb://localhost/my_database", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const blogpost = await BlogPost.create({
      title: "Khoá Node.JS từ cơ bản",
      body: "Nếu bạn đam mê với Javascript và muốn khám phá cách xây dựng ứng dụng với Node.js thì đây là cuốn sách dành cho bạn",
    });

    console.log(blogpost);
  } catch (error) {
    console.error(error);
  }
}

async function updatePostById(id) {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      id, // Tìm theo _id
      { body: "Đây là nội dung mới sau khi cập nhật!" }, // Cập nhật nội dung
      { new: true } // Trả về document đã cập nhật
    );
    console.log("Đã cập nhật:", updatedPost);
  } catch (error) {
    console.error("Lỗi khi cập nhật:", error);
  }
}

async function deletePostById(id) {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(id); // Tìm theo _id và xóa

    if (!deletedPost) {
      console.log("Không tìm thấy bài viết với ID này để xóa.");
      return;
    }

    console.log("Bài viết đã bị xóa:", deletedPost);
  } catch (error) {
    console.error("Lỗi khi xóa bài viết:", error);
  }
}

//   run();

// updatePostById("6800cf4cb1745f7cecf7d72a");

deletePostById("6800cf4cb1745f7cecf7d72a");
