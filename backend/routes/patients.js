const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

// GET all users
router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("patients").select("*");

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create user
router.post("/", async (req, res) => {
  try {
    const {
      name,
      whatsapp,
      addres,
      registered,
      last_visit,
      last_treatment,
      image,
    } = req.body;
      const registeredDate = registered || new Date().toISOString().split('T')[0];
    const { data, error } = await supabase
      .from("patients")
      .insert([
        {
          name,
          whatsapp,
          addres,
          registered: registeredDate,
         last_visit: last_visit || null, 
          last_treatment,
          image,
        },
      ])
      .select();

    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update user
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, whatsapp, addres, last_visit } = req.body;
    const { data, error } = await supabase
      .from("patients")
      .update({ name, whatsapp, addres, last_visit })
      .eq("id", id)
      .select();

    if (error) throw error;
    res.json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("patients").delete().eq("id", id);

    if (error) throw error;
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
