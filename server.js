const express = require("express");
const { readFromFile, readAndAppend, readAndDelete } = require('./helpers/fsUtils');
const path = require("path");
const PORT = process.env.PORT || 3001;
const db = require("./db/db.json");
const uuid = require('./helpers/uuid');
const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));


app.get("/notes", (req, res) => {


    res.sendFile(path.join(__dirname, "/public/notes.html"));


})

app.get("/api/notes", (req, res) => {

    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));


})



app.post("/api/notes", function (req, res) {
    console.log(req.body);

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
     title, 
     text,
     id: uuid()
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully 🚀`);
  } else {
    res.error('Error in adding note');
  }
});



app.delete("/api/notes/:id", function (req, res) {




    readAndDelete('./db/db.json', req.params.id);
    res.json(`Note deleted successfully 🚀`);

});

app.listen(PORT, () => console.log("listening on port http://localhost:" + PORT))