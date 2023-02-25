const express = require("express");
const profileRouter = express.Router();
const { ProfileModel } = require("../models/profile.model");

profileRouter.get("/getprofile", async (req, res) => {
  const query = req.query;
  const posts = await ProfileModel.find(query);
  res.send(posts);
});

profileRouter.post("/addprofile", async (req, res) => {
  const payload = req.body;
  try {
    const new_profile = new ProfileModel(payload);
    await new_profile.save();
    res.send("New profile created");
  } catch (err) {
    console.log(err);
    res.send({ msg: "Unable to create a profile" });
  }
});

profileRouter.patch("/editprofile/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  const profile = await ProfileModel.findOne({ _id: id });
  const userId_in_profile = profile.userId;
  const userId_middleWare = req.body.userId;
  try {
    if (userId_middleWare !== userId_in_profile) {
      res.send({ msg: "You are not authorized" });
    } else {
      await PostModel.findByIdAndUpdate({ _id: id }, payload);
      res.send({ msg: "Ppost updated" });
    }
  } catch (err) {
    res.send({ msg: "Unable to update" });
  }
});

module.exports = {
  profileRouter,
};
