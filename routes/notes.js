const express = require("express");
const fetchuser = require("../middlerware/fetchuser");
const Notes = require("../models/notesSchema");
const { body, validationResult } = require("express-validator");

const router = express.Router();
router.post(
  "/createnotes",
  [
    body("title", "please enter the title").isLength({ min: 1 }),
    body("description", "please enter the description").isLength({ min: 1 }),
    body("image", "please enter the image").isLength({ min: 1 }),
    body("price", "please  enter the price").isLength({ min: 1 }),
    body("size", "please  select the size").isLength({ min: 1 }),
    body("quantity", "please enter the qunatity").isLength({ min: 1 }),
    body("address", "please enter the address").isLength({ min: 1 }),
  ],

  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, image, price, quantity, size,address } = req.body;
      const notes = new Notes({
        address,
        title,
        description,
        image,
        price,
        size,
        quantity,
        user: req.user.id,
      });
      const savenote = await notes.save();
      res.json(savenote);
    } catch (error) {
      console.error({ error: error.message });
      res.status(500).json({ error: "internal server error" });
    }
  }
);

router.get("/getnotes", fetchuser, async (req, res) => {
  const id = req.user.id;
  const notes = await Notes.find({ user: id });
  res.json(notes);
});

// update
router.put(
  "/updatenotes/:id",
  [
    body("title", "please enter the title").isLength({ min: 1 }),
    body("description", "please enter the description").isLength({ min: 1 }),
    body("tag", "please the tag").isLength({ min: 1 }),
  ],
  fetchuser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;

      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      let note = await Notes.findById(req.params.id);

      if (note.user.toString() !== req.user.id) {
        res.status(401).json("note allowed");
      }
      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "not found" });
    }
  }
);

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);

    if (note.user.toString() !== req.user.id) {
      res.status(401).json({ error: "not allowed" });
    }
    note = await Notes.findByIdAndDelete(req.params.id);
    res.send("sucessfully deleted");
  } catch (error) {
    res.status(404).json({ error: "notfound" });
  }
});
module.exports = router;
