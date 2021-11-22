const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
//uses the public folder
app.use(express.static("public"));

