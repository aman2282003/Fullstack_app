const { Router } = require("express");
const noteModel = require("../model/noteModel");
const auth = require("../middlewares/auth.middleware");
const noteRouter = Router();

noteRouter.post("/create", auth, async (req, res) => {
  const { title, description, userId, username } = req.body;
  try {
    const note = new noteModel({ title, description , userId, username });
    await note.save();
    res.status(201).json({ message: "Note created succesfully" });
  } catch (error) {
    res.status(500).json({ message: "Error while creating a note " });
  }
});

noteRouter.get("/", auth, async (req, res) => {
  try {
    const notes = await noteModel.find();
    res.status(201).json({ message: "All notes", notes });
  } catch (error) {
    res.status(500).json({
      message: "Error while getting the notes",
      error,
    });
  }
});

noteRouter.patch("/update/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await noteModel.findByIdAndUpdate({ _id: id }, req.body);
    res.status(200).json({ message: "Note is updated successfully" });
  } catch (error) {
    res.status(400).send({
      message: "Error while updating the note",
    });
  }
});

noteRouter.delete("/delete/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    await noteModel.findByIdAndDelete({ _id: id });
    res.status(200).json({ message: "Note is deleted successfully" });
  } catch (error) {
    res.status(400).send({
      message: "Error while deleting the note",
    });
  }
});

module.exports = noteRouter;
