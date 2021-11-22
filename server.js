// Importing packages paths and api
const express = require("express");
const path = require("path");
const api = require("./routes/index.js");

const PORT = process.env.PORT || 3005;

const app = express();

// Middleware 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);

//uses the public folder
app.use(express.static("public"));

//gets routes for index page
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/index.html"))
);
//gets routes for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//GET wildcard route to redirect back to the  homepage 
app.get('*', (req, res) => res.redirect('/'));

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);