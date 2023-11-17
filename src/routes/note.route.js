const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const noteController = require("../controllers/note.controller");
const validationMiddleware = require("../middlewares/validations.middleware");
const noteMiddleware = require("../middlewares/note.middleware");

const router = express.Router();

router.use(authMiddleware.protect);

router.get("/", noteController.findAllNotes);
router.get("/archived", noteController.AllArchivedNotes);
router.get(
  "/:id",
  noteMiddleware.validateNoteOwner,
  noteController.findOneNote
);

router.post(
  "/",
  validationMiddleware.createNoteValidation,
  noteController.createNote
);

router.patch(
  "/status/:id",
  noteMiddleware.validateNoteOwner,
  noteController.archiveNote
);

router.patch(
  "/active/:id",
  noteMiddleware.validateNoteOwner,
  noteController.activeNote
);

router
  .route("/:id")
  .patch(noteMiddleware.validateNoteOwner, noteController.updateNote)
  .delete(noteMiddleware.validateNoteOwnerAll, noteController.deleteNote);

module.exports = router;
