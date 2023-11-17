const Note = require("../models/note.model");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const { id } = req.sessionUser;

    const note = await Note.create({
      title,
      content,
      userId: id,
    });

    if (!note) {
      return res.status(400).json({
        status: "error",
        message: "Note not created",
      });
    }

    return res.status(200).json({
      status: "success",
      message: "Note created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.findAllNotes = async (req, res) => {
  try {
    const { id } = req.sessionUser;

    const notes = await Note.findAll({
      where: {
        userId: id,
        status: "active",
      },
    });

    return res.status(200).json({
      status: "success",
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.AllArchivedNotes = async (req, res) => {
  try {
    const { id } = req.sessionUser;

    const notes = await Note.findAll({
      where: {
        userId: id,
        status: "disabled",
      },
    });

    return res.status(200).json({
      status: "success",
      notes,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.findOneNote = async (req, res) => {
  try {
    const { note } = req;

    return res.status(200).json({
      status: "success",
      note,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { note } = req;
    const { title, content } = req.body;

    await note.update({
      title,
      content,
    });

    return res.status(200).json({
      status: "success",
      message: "Note updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.archiveNote = async (req, res) => {
  try {
    const { note } = req;

    await note.update({
      status: "disabled",
    });

    return res.status(200).json({
      status: "success",
      message: "Note archived successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.activeNote = async (req, res) => {
  try {
    const { note } = req;

    await note.update({
      status: "active",
    });

    return res.status(200).json({
      status: "success",
      message: "Note active successfully",
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const { note } = req;

    await note.destroy();

    return res.status(200).json({
      status: "success",
      message: "Note delete successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
