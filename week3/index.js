const express = require("express");
const path = require("path"); //needed for functions having to do with file paths
const { MongoClient, ObjectId } = require("mongodb"); // import MongoClient and ObjectId class from mongodb driver

//Database Setup
const dbUrl = "mongodb://127.0.0.1:27017/"; //MongoDB connection URL
const client =  new MongoClient(dbUrl); //create a MongoDB client

const app = express();
const port = process.env.PORT || "8888"; //Set the port for the server

//Settings for Express app
app.set("views", path.join(__dirname, "views")); //setting for "views" is set to path: __dirname/views
app.set("view engine", "pug");

//Set up folder for static files (e.g. CSS, client-side JS, images)
app.use(express.static(path.join(__dirname, "public")));

//SET UP PAGE ROUTES
app.get("/", async (request, response) => {
  let links = await getLinks();
  //console.log(links);
  //response.status(200).send("Test");
  response.render("index", { title: "Home", menu: links });
});

app.get("/about", async (request, response) => {
  let links = await getLinks();
  response.render("about", { title: "About", menu: links });
});

app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`); //Start the server and log the URL
});

//NEW SETTINGS
app.use(express.urlencoded({ extented: true }));
app.use(express.json());

//ADMIN PAGES 
app.get("/admin/menu", async (request, response) => {
  let links = await getLinks();
  response.render("menu-list", { title: "Adminster menu links", menu: links });
});

//CREATE PAGE AND FORM PROCESSING PATH
app.get("/admin/menu/add", async (request, response) => {
  let links = await getLinks();
  response.render("menu-add", { title: "Add link", menu: links });
});

app.post("/admin/menu/add/submit", async (request, response)=> {
  //weight=1&path=/about&name=About
  //For POST forms, data gets submitted in the body (request.body) and you can get each field's data using request.body.<feild_name>
  let wgt = request.body.weight;
  let href = request.body.path;
  let text = request.body.name;

  let newLink = {
    weight: parseInt(wgt),
    path: href,
    name: text
  };
  await addLink(newLink);
  response.redirect("/admin/menu"); //when done, redirect back to /admin/menu
});

//DELETE FORM SUBMISSION PATH
app.get("/admin/menu/delete", async (request, response) => {
//GET form data is submitted in a query string in the URL
//To access it, use request.query.<feild_name>
await deleteLink(request.query.linkId);
response.redirect("/admin/menu"); //Redirect to the admin menu page
});

//EDIT FORM PATH
app.get("/admin/menu/edit", async (request, response) => {
  if (request.query.linkId) {
    let linkToEdit = await getSingleLink(request.query.linkId);
    let links = await getLinks();
    response.render("menu-edit", { title: "Edit menu link", menu: links, editLink: linkToEdit });
  } else {
    response.redirect("/admin/menu");
  }
});

//Handle the edit form submission
app.post("/admin/menu/edit/submit", async (request, response) => {
  let idFilter = { _id: new ObjectId(request.body.linkId) };
  let link = {
    weight: parseInt(request.body.weight),
    path: request.body.path,
    name: request.body.name
  };
  await editLink(idFilter, link);
  response.redirect("/admin/menu");
});

//MONGODB FUNCTIONS
async function connection(){
  db = client.db("testdb"); //select "testdb" database
  return db;
}

//Function to find one document into menuLinks collection by id
async function getSingleLink(id) {
  db = await connection();
  let editId = { _id: new ObjectId(id) };
  let result = await db.collection("menuLinks").findOne(editId); //Find the document by ID
  return result;
}

//Function to select all documents in the menuLinks collection
async function getLinks(){
  db = await connection();
  let results = db.collection("menuLinks").find({}); //Select all documents in menuLinks
  return await results.toArray(); //Convert results to an array
}

//Function to insert one document into menulinks collection.
async function addLink(newLinkDoc){
  db = await connection();
  let status = await db.collection("menuLinks").insertOne(newLinkDoc);
  //you can do something with status to check if ok
  console.log("link added");
}

//Function to delete one document from menuLinks collection by _id
async function deleteLink(id) {
  db = await connection();
  let idFilter = { _id: new ObjectId(id) };
  let result = await db.collection("menuLinks").deleteOne(idFilter);
  if (result.deleteCount == 1)
    console.log("link deleted");
}

//Function to edit one document in the menuLinks collection
async function editLink(filter, link) {
  db = await connection();
  let update = { $set: link }; //Create an update document
  await db.collection("menuLinks").updateOne(filter, update);
}