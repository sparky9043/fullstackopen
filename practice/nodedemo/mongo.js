const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please enter a password!");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://sparky9043:${password}@cluster0.nveh9zx.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy",
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  mongoose.connection.close();
});
