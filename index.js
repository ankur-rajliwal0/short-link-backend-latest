const express = require("express");
const crypto = require("crypto");
const cors = require("cors");
const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

// Use `let` for mutable variables
let links = [];
let id = 1;

app.post("/", (req, res) => {
  const { originalUrl } = req.body;
  const shortCode = crypto.randomBytes(6).toString("hex").toUpperCase();
  const shortUrl = `https://short-link-backend-latest.onrender.com/${shortCode}`;
  const link = {
    id: id++,
    originalUrl,
    shortCode,
    shortUrl,
  };
  links.push(link);
  res.json({ shortUrl });
  console.log(id);
});

app.get("/:shortCode", (req, res) => {
  const { shortCode } = req.params;
  let foundLink = null;

  // Use a for loop to find the link with the matching short link code
  for (let i = 0; i < links.length; i++) {
    if (links[i].shortCode === shortCode) {
      foundLink = links[i];
      break;
    }
  }

  if (foundLink) {
    res.redirect(foundLink.originalUrl);
  } else {
    res.status(404).send("Link not found git");
  }
});

app.get("/links", (req, res) => {
  res.json(links);
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
