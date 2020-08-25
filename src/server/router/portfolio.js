const express = require("express");
const isAuthenticated = require("../middleWares/isAuth");

const PortModel = require("../models/ports");

const router = express.Router();

router.get("/all", async (_req, res) => {
  const allPorts = await PortModel.find();

  res.send(allPorts);
});

router.get("/who/:handlePath", async (req, res) => {
  const { handlePath } = req.params;

  const existPort = await PortModel.findOne({ handlePath: handlePath });

  if (!existPort) {
    return res.status(400).send({ error: "Not found this port." });
  }

  return res.json(existPort);
});

router.post("/edit_port", isAuthenticated, async (req, res) => {
  const data = req.body;

  try {
    const port = await PortModel.findOneAndUpdate(
      { user: req.user.id },
      { $set: data },
      { new: true }
    );
    return res.json(port);
  } catch (error) {
    console.error(error);
    if (error.codeName === "DuplicateKey")
      return res
        .status(400)
        .send({ error: "The Handle path is already taken." });
    return res.status(400).send({ error: "Something went wrong." });
  }
});

module.exports = router;
