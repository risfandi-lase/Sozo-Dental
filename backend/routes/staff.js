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


module.exports = router;
