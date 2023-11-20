const express = require('express');
const router = express.Router();
const login = require('../middleware/login');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');



// ROUTE 1 : Fetch the notes of the user using GET
router.get('/fetchthenotes', login, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    // Return errors
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }
})

// ROUTE 2 : Add the notes of the user using POST
router.post('/addnote', login, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Minimum description length is 5 characters').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        //Returning errors 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();

        res.json(savedNote);
    }
    // Return errors
    catch (error) {
        console.error(error.message);
        res.status(500).send("Server error");
    }

})

module.exports = router