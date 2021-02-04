const express = require("express");
const bodyParser = require("body-parser");
const generateSecureJWT = require("./controllers/TokenSetup");
const app = express();
require("dotenv").config();

/* PARSING PROTOCOLS
 */
const jsonParser = bodyParser.json();
const urlEncoderParser = bodyParser.urlencoded({ extended: false });
app.use(urlEncoderParser);
app.use(jsonParser);

// ============
/**
 * IMPORTING ROUTES
 */
const authenticationRoute = require("./routes/Authentication");
app.use("/auth", authenticationRoute);

/**
 * API TESTING FUNCTIONS
 */
app.get("/", (_req, res) => {
  return res.status(200).json({ status: "Ok", message: "API functional" });
});

app.get("/random", async (req, res) => {
  const { username, scope } = req.params;
  try {
    const randomToken = await generateSecureJWT(username, scope);
    return res
      .status(200)
      .json({ status: "Ok", message: "Secure jwt generated", randomToken });
  } catch (e) {
    return res.status(500).json({ status: "Error", message: e });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`API listening on PORT ${process.env.PORT}`);
});
