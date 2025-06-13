const express = require("express");
const router = express.Router();
const pool = require("../db");

// Root
router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

//
// === USERS ROUTES ===
//
router.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/users", async (req, res) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3",
      [name, email, id]
    );
    res.json({ message: "User updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = $1", [id]);
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//
// === PRODUCTS ROUTES ===
//
router.get("/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/products", async (req, res) => {
  const { name, price, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *",
      [name, price, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    await pool.query(
      "UPDATE products SET name = $1, price = $2, description = $3 WHERE id = $4",
      [name, price, description, id]
    );
    res.json({ message: "Product updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM products WHERE id = $1", [id]);
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
