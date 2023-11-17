const Note = require("../models/note.model");

exports.validateNoteOwner = async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  const note = await Note.findOne({
    where: {
      id,
    },
  });

  if (!note) {
    return res.status(400).json({
      status: "error",
      message: "Note not found",
    });
  }

  if (note.userId !== sessionUser.id) {
    return res.status(401).json({
      status: "success",
      message: "The note does not belong to the user",
    });
  }

  req.note = note;
  next();
};

exports.validateNoteOwnerAll = async (req, res, next) => {
  const { sessionUser } = req;
  const { id } = req.params;

  const note = await Note.findOne({
    where: {
      id,
    },
  });

  if (!note) {
    return res.status(400).json({
      status: "error",
      message: "Note not found",
    });
  }

  if (note.userId !== sessionUser.id) {
    return res.status(401).json({
      status: "success",
      message: "The note does not belong to the user",
    });
  }

  req.note = note;
  next();
};
