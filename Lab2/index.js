const express = require("express");
const { request } = require("http");
const path = require("path"); //needed for functions having to do with file paths

const app = express();
const port = process.env.PORT || "8888";

//settings for express app
app.set("views", path.join(__dirname, "views")) //setting for "views is set to path: __dirname/views
app.set("view engine", "pug");

//set up folder for static files (css, images)
app.use(express.static(path.join(__dirname, "public")));

//SET UP PAGE ROUTES
app.get("/", (request, response) => {
    //response.status(200).send("Test");
    response.render("index", { title: "Home" });
});

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
})