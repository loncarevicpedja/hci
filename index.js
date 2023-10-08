require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");

const User = require("./models/User");

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://onlineizlozba:pedja123@cluster0.yzxpnve.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/register", async (req, res) => {
  const { username, password } = req.body;
  const userDoc = awaitUser.create({ username, password });
  res.json({ requestData: { username, password } });
});

// Create - Dodajte novog korisnika
app.post("/users", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ error: "Greška prilikom dodavanja korisnika." });
  }
});

// Read - Dohvatite sve korisnike
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Greška prilikom dohvatanja korisnika." });
  }
});

// Update - Ažurirajte korisnika po ID-u
app.put("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, password },
      { new: true }
    );
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Greška prilikom ažuriranja korisnika." });
  }
});

// Delete - Obrišite korisnika po ID-u
app.delete("/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndRemove(userId);
    res.json({ message: "Korisnik uspešno obrisan." });
  } catch (error) {
    res.status(500).json({ error: "Greška prilikom brisanja korisnika." });
  }
});

app.listen(PORT, () => {
  console.log("Server started on: http://localhost:" + PORT);
});

//mongodb+srv://onlineizlozba:pedja123@cluster0.yzxpnve.mongodb.net/?retryWrites=true&w=majority
