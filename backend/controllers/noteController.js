const Note = require('../models/Note');

// @desc    get all notes for logged in user
// @route   Get /api/notes
// @access  Protected
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Get your single note
// @route   GET /api/notes/:id
// @access  Protected
const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Make sure logged in user owns the note
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Create your note
// @route   POST /api/notes
// @access  protected
const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    const note = await Note.create({
      title,
      content,
      user: req.user._id,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Update your note
// @route   PUT /api/notes/:id
// @access  protected
const updateNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const { title, content } = req.body;

const updatedNote = await Note.findByIdAndUpdate(
  req.params.id,
  { title, content },
  { new: true, runValidators: true }
);

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

// @desc    Delete your note
// @route   DELETE /api/notes/:id
// @access  Protected
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Note.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getNotes, getNoteById, createNote, updateNote, deleteNote };