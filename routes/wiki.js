const layout = require("../views/layout");
const { Page, pageSlug } = require("../models");
const { addPage } = require("../views");
const { response } = require("express");
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    res.send(layout(""));
  } catch (err) {
    console.log("Error!!");
    next(err);
  }
});

router.get("/add", async (req, res, next) => {
  try {
    res.send(addPage());
  } catch (err) {
    console.log("Error!!");
    next(err);
  }
});

router.get("/:slug", (req, res, next) => {
  res.send(`hit dynamic route at ${req.params.slug}`);
});

router.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });
    res.redirect(`/wiki/${pageSlug}`);
    console.log(pageSlug);
  } catch (err) {
    console.log("Error!!");
    next(err);
  }
});

module.exports = router;
