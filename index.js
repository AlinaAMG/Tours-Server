import express from "express";
import { tours } from "./tours.js";

const app = express();
const PORT = 5000;

app.use(express.json());

// GET all tours
app.get("/tours", (req, res) => {
  res.json(tours);
});

// GET one tour by ID
app.get("/tours/:id", (req, res) => {
  const tour = tours.find(t => t.id === parseInt(req.params.id));
  if (!tour) return res.status(404).json({ message: "Tour not found" });
  res.json(tour);
});

// POST add new tour
app.post("/tours", (req, res) => {
  const { name, info, image, price } = req.body;

  const newTour = {
    id: tours.length + 1,
    name,
    info,
    image,
    price
  };

  tours.push(newTour);
  res.status(201).json({ message: "Tour added", tour: newTour });
});

// DELETE tour
app.delete("/tours/:id", (req, res) => {
  const index = tours.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Tour not found" });

  const deleted = tours.splice(index, 1);
  res.json({ message: "Tour deleted", deleted });
});

// Run Server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});