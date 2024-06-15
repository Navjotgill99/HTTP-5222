const mongoose = require("mongoose"); //import Mongoose

const dbUrl = `mongodb+srv://${process.env.DBUSER}:${process.env.DBPWD}@${process.env.DBHOST}`;

//set up Schema and model
const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  year: Number,
  price: Number,
  image: String
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
  const bookList = [
    {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      year: 1925,
      price: 10.99,
      // image: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781471173936/the-great-gatsby-9781471173936_hr.jpg'
    },
    {
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      year: 1960,
      price: 8.99,
      // image: 'https://th.bing.com/th/id/OIP.2GMxAqCpItxai1LYbPlmJwAAAA?rs=1&pid=ImgDetMain'
    },
    {
      title: "1984",
      author: "George Orwell",
      year: 1949,
      price: 9.99,
      // image: 'https://imgv2-2-f.scribdassets.com/img/word_document/338240944/original/82f08c539c/1587828916?v=1'
    },
    {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      year: 1813,
      price: 12.99,
      // image: 'https://www.themoviedb.org/t/p/original/vAxWpk857xbpaeoSvkRsfMbokPl.jpg'
    },
    {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      year: 1951,
      price: 7.99,
      // image: 'https://th.bing.com/th/id/R.cac52fbbefa83812774f681dbf874163?rik=v%2bHq2yBp%2f6RzYw&riu=http%3a%2f%2fmedia.npr.org%2fassets%2fbakertaylor%2fcovers%2fc%2fcatcher-in-the-rye%2f9780316769488_custom-b6fc2e108f3865eb320720875c20e4f869da8065-s6-c30.jpg&ehk=fpDBmQJbSuHhhoBl2AYOifBz0QLtjPI7FBgIYnU65cM%3d&risl=&pid=ImgRaw&r=0'
    },
    {
      title: "Moby-Dick",
      author: "Herman Melville",
      year: 1851,
      price: 11.99,
      // image: 'https://th.bing.com/th/id/R.19271e32a5263019693fd465f354773b?rik=Tzcvow6gTjUpQg&riu=http%3a%2f%2ffc02.deviantart.net%2ffs71%2ff%2f2013%2f298%2f5%2fe%2fmoby_dick_book_cover_by_mario0357-d6rt002.jpg&ehk=ZNqoikEb%2fJLDT9q4944mzn%2bjg3zZgFed8%2fUZHqFKmD0%3d&risl=&pid=ImgRaw&r=0'
    },
    {
      title: "War and Peace",
      author: "Leo Tolstoy",
      year: 1869,
      price: 14.99,
      // image: 'https://images-na.ssl-images-amazon.com/images/I/81zXqtB-GVL._RI_.jpg'
    },
    {
      title: "The Odyssey",
      author: "Homer",
      year: -800,
      price: 13.99,
      // image: 'https://www.themoviedb.org/t/p/original/wCiQ7XySqnz9X1REtDNZRGLfhpe.jpg'
    },
    {
      title: "Crime and Punishment",
      author: "Fyodor Dostoevsky",
      year: 1866,
      price: 10.49,
      // image: 'https://cloud.firebrandtech.com/api/v2/img/111/9780785841739/XL'
    },
    {
      title: "The Brothers Karamazov",
      author: "Fyodor Dostoevsky",
      year: 1880,
      price: 15.99,
      // image: 'https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781625583826/brothers-karamazov-9781625583826_hr.jpg'
    }
  ];
  await Book.insertMany(bookList);
  console.log(bookList);
}

//Function to add a book to the books collection
async function addBook(title, author, year, price, image) {
  await connect();
  const newBook = new Book({
    title,
    author,
    year,
    price,
    image
  });
  await newBook.save();
  console.log("New book added: ", newBook);
}

module.exports = {
  getBooks,
  initializeBooks,
  addBook,
};