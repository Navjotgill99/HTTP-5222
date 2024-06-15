const express = require("express");
const path = require("path"); //needed when setting up static/file paths
const dotenv = require("dotenv");

//load the environment variables from .env
dotenv.config();

const db = require("./modules/books/db"); //load db.js

//set up the Express app
const app = express();
const port = process.env.PORT || "8888";

//set up application template engine
app.set("views", path.join(__dirname, "views")); //the first "views" is the setting name
//the second value above is the path: __dirname/views
app.set("view engine", "pug");

//set up folder for static files
app.use(express.static(path.join(__dirname, "public")));

//USE PAGE ROUTES FROM ROUTER(S)
app.get("/", async (request, response) => {
  let bookList = await db.getBooks();
  //if there's nothing in the books collection, initialize with some content then get the books again
  if (!bookList.length) {
    await db.initializeBooks(); //load data into books
    bookList = await db.getBooks();
  }
  response.render("index", { books: bookList });
});

app.get("/books", async (request, response) => {
  let bookList = await db.getBooks();
  response.render("books", { books: bookList });
});

app.get("/about", (request, response) => {
  response.render("about");
});

app.get("/books/add", (request, response) => {
  response.redirect("add");
});

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/books/add", async (reequest, response) => {
  const { title, author, year, price } = request.body;
  await db.addBook(title, author, year, price);
  response.redirect("/books");
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});