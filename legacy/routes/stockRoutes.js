const express = require("express");
const router = express.Router();
const Stock = require("../models/Stock");

// GET all stocks
router.get("/", async (req, res) => {
  const stocks = await Stock.find();
  res.json(stocks);
});

// GET stock by ID
router.get("/:id", async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }
    res.json(stock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// POST create stock
router.post("/", async (req, res) => {
  try {
    const newStock = new Stock(req.body);
    await newStock.save();
    res.status(201).json(newStock);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update stock
router.put("/:id", async (req, res) => {
  try {
    const updated = await Stock.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE stock
router.delete("/:id", async (req, res) => {
  try {
    await Stock.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
