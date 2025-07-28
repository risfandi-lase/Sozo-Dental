const express = require("express");
const router = express.Router();
const supabase = require("../config/supabase");

router.get("/", async (req, res) => {
  try {
    const { data, error } = await supabase.from("staff").select("*");

    if (error) throw error;
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      number,
      assigned_treatment,
      type,
      specialist,
      email,
      working_days,
      image
    } = req.body;
    const { data, error } = await supabase
      .from("staff")
      .insert([
        {
          name,
          number,
          assigned_treatment,
          type,
          specialist,
          email,
          working_days,
          image
        },
      ])
      .select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
