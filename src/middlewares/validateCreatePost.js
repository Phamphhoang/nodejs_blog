module.exports = (req, res, next) => {
  if (!req.files || !req.body.title || !req.body.body) {
    console.log("Missing data");
    return res.redirect("/create/blog");
  }
  next();
};
