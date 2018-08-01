const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const { generateData } = require("./data");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(morgan("dev"));

const port = 8080;

const router = express.Router();

const data = generateData(10);

router.get("/", (req, res) => {
  res.json({ message: "OK" });
});

router.get("/listSurat", (req, res) => {
  res.json({ status: "OK", data });
});

router.post("/uploadSurat", (req, res) => {
  if (!req.files) return res.status(400).json({ status: "FAIL" });

  const document = req.files.document;
  document.mv(`${process.cwd()}/uploaded/${document.name}`, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ status: "OK" });
    }
  });
});

router.post("/auth", (req, res) => {
  if (!req.body) return res.status(400).json({ status: "FAIL" });

  console.log(req.body);

  const { username, password } = req.body;

  if (username === "a@a.co" && password === "admin123") {
    res.json({ status: "OK" });
  } else {
    res.json({ status: "FAIL" });
  }
});

router.post("/setStatus", (req, res) => {
  if (!req.body) return res.status(400).json({ status: "FAIL" });

  console.log(req.body);

  const { id, status } = req.body;

  if (id !== null && status !== null) {
    const selectedDataIndex = data.findIndex(item => item.id === id);
    data[selectedDataIndex].status = status;
    const selectedData = data.filter(item => item.id === id);
    data[selectedDataIndex] = selectedData[0];
    res.json({ status: "OK", data: selectedData });
  } else {
    res.json({ status: "FAIL", data });
  }
});

app.use("/eservis/api", router);

app.listen(port);

console.log(`Running on ${port}`);
