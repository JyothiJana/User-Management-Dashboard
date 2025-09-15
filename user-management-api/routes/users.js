// routes/users.js
const express = require('express');
const router = express.Router();
const db = require('../database.js');

/**
 * GET /api/users
 * Fetch all users
 */
router.get("/", (req, res) => {
    const sql = "SELECT * FROM users";
    db.all(sql, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json({ data: rows });
    });
});

/**
 * GET /api/users/:id
 * Fetch a single user by ID
 */
router.get("/:id", (req, res) => {
    const sql = "SELECT * FROM users WHERE id = ?";
    db.get(sql, [req.params.id], (err, row) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (!row) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ data: row });
    });
});

/**
 * POST /api/users
 * Create a new user
 */
router.post("/", (req, res) => {
    const { name, email, phone, company, street, city, zipcode, lat, lng } = req.body;

    // Validation
    if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required fields." });
    }

    const sql = `
        INSERT INTO users (name, email, phone, company, street, city, zipcode, lat, lng)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const params = [name, email, phone, company, street, city, zipcode, lat, lng];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message }); // e.g. UNIQUE constraint failed
        }
        res.status(201).json({ id: this.lastID });
    });
});

/**
 * PUT /api/users/:id
 * Update an existing user
 */
router.put("/:id", (req, res) => {
    const { name, email, phone, company, street, city, zipcode, lat, lng } = req.body;

    const sql = `
        UPDATE users SET
        name = ?, email = ?, phone = ?, company = ?,
        street = ?, city = ?, zipcode = ?, lat = ?, lng = ?
        WHERE id = ?
    `;
    const params = [name, email, phone, company, street, city, zipcode, lat, lng, req.params.id];

    db.run(sql, params, function(err) {
        if (err) {
            return res.status(400).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User updated successfully", changes: this.changes });
    });
});

/**
 * DELETE /api/users/:id
 * Delete a user
 */
router.delete("/:id", (req, res) => {
    const sql = "DELETE FROM users WHERE id = ?";
    db.run(sql, req.params.id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    });
});

module.exports = router;
