const mongoose = require("mongoose"); //import Mongoose

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

//set up Schema and model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  price: Number,
});
const Book = mongoose.model("Book", bookSchema);

//MONGODB FUNCTIONS
async function connect() {
  await mongoose.connect(dbUrl); //connect to mongodb
}

//Get all books from the books collection
async function getBooks() {
  await connect();
  return await Book.find({}).sort({ year: 1 });
}
//Initialize books collection with some data.
async function initializeBooks() {
  const BookList = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: 1925,
      price: 10.99
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      year: 1960,
      price: 8.99
    },
    {
      title: "1984",
      author: "George Orwell",
      year: 1949,
      price: 9.99
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      year: 1813,
      price: 12.99
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      year: 1951,
      price: 7.99
    },
    {
      title: "Moby-Dick",
      author: "Herman Melville",
      year: 1851,
      price: 11.99
    },
    {
      title: "War and Peace",
      author: "Leo Tolstoy",
      year: 1869,
      price: 14.99
    },
    {
      title: "The Odyssey",
      author: "Homer",
      year: -800,
      price: 13.99
    },
    {
      title: "Crime and Punishment",
      author: "Fyodor Dostoevsky",
      year: 1866,
      price: 10.49
    },
    {
      title: "The Brothers Karamazov",
      author: "Fyodor Dostoevsky",
      year: 1880,
      price: 15.99
    }
  ];
  await Book.insertMany(BookList);
  console.log(BookList);
}

//Function to add a book to the books collection
async function addBook(title, author, year, price) {
  await connect();
  const newBook = new Book({
    title: title,
    author: author,
    year: year,
    price: price
  });
  await newBook.save();
  console.log("New book added: ", newBook);
}

module.exports = {
  getBooks,
  initializeBooks,
  addBook,
};