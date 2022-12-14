const express = require("express");
const router = express.Router();
const { nanoid } = require("nanoid");

// Receive a submission
router.post("/", async (req, res) => {
  try {
    let data = {
      src: req.body.src,
      input: req.body.stdin,
      lang: req.body.lang,
      id: nanoid(10),
    };

    // Send to worker now
    res.status(202).json({
      success: true,
      submission_id: data.id,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
});

module.exports = router;
