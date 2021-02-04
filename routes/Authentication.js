const router = require("express").Router();

router.get("/", (req, res) => {
  return res
    .status(200)
    .json({ status: "Ok", message: "authentication route working" });
});

module.exports = router;
