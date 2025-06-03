//`mongodb+srv://sparky9043:${password}@cluster0.nveh9zx.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("Please enter a password to continue.");
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb+srv://sparky9043:${password}@cluster0.nveh9zx.mongodb.net/personApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);
mongoose.connect(url);
