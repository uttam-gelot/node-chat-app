const express = require("express");
const path = require("path");

const publicPath = path.join(__dirname, "../public");
const port = process.env.PORT || 5555;

var app = express();
app.use(express.static(publicPath));

app.listen(port, () =>
{
    console.log(`server is up on port ${port}`);
});