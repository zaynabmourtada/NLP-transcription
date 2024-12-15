const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Implement API here
app.post("/transcribe", (req, res) => {
  const { language } = req.body;

  let responseText = "";
  if (language === "ar") {
    responseText = "هذا نص تجريبي للاستجابة"; 
  } else {
    responseText = "This is a dummy transcription response.";
  }

  res.json({ transcript: responseText });
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
