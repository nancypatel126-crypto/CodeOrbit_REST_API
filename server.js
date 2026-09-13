const express = require("express");
const fs = require("fs");

const app = express();
const PORT = 3000;

const DATA_FILE = "notes.json";

// ==========================================
// Middleware
// ==========================================
app.use(express.json());


// ==========================================
// Read notes from JSON file
// ==========================================
function readNotes() {
    try {
        const data = fs.readFileSync(DATA_FILE, "utf8");

        if (!data.trim()) {
            return [];
        }

        return JSON.parse(data);

    } catch (error) {
        return [];
    }
}


// ==========================================
// Save notes to JSON file
// ==========================================
function saveNotes(notes) {
    fs.writeFileSync(
        DATA_FILE,
        JSON.stringify(notes, null, 2)
    );
}


// ==========================================
// HOME ROUTE
// ==========================================
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to CodeOrbit REST API",
        status: "API is running successfully"
    });
});


// ==========================================
// GET - Get all notes
// ==========================================
app.get("/api/notes", (req, res) => {

    const notes = readNotes();

    res.json({
        success: true,
        count: notes.length,
        notes: notes
    });
});


// ==========================================
// GET - Get single note
// ==========================================
app.get("/api/notes/:id", (req, res) => {

    const notes = readNotes();
    const id = Number(req.params.id);

    const note = notes.find(note => note.id === id);

    if (!note) {
        return res.status(404).json({
            success: false,
            message: "Note not found"
        });
    }

    res.json({
        success: true,
        note: note
    });
});


// ==========================================
// POST - Add new note
// ==========================================
app.post("/api/notes", (req, res) => {

    const notes = readNotes();

    // Check request body
    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "Request body is missing. Please send JSON data."
        });
    }

    const { title, content } = req.body;

    // Validate title and content
    if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: "Title and content are required"
        });
    }

    // Create new note
    const newNote = {
        id: notes.length > 0
            ? Math.max(...notes.map(note => note.id)) + 1
            : 1,

        title: title,
        content: content,

        createdAt: new Date().toISOString()
    };

    // Add note
    notes.push(newNote);

    // Save note
    saveNotes(notes);

    // Response
    res.status(201).json({
        success: true,
        message: "Note created successfully",
        note: newNote
    });
});


// ==========================================
// PUT - Update note
// ==========================================
app.put("/api/notes/:id", (req, res) => {

    const notes = readNotes();
    const id = Number(req.params.id);

    const noteIndex = notes.findIndex(
        note => note.id === id
    );

    // Check note exists
    if (noteIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Note not found"
        });
    }

    // Check request body
    if (!req.body) {
        return res.status(400).json({
            success: false,
            message: "Request body is missing. Please send JSON data."
        });
    }

    const { title, content } = req.body;

    // Validate
    if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: "Title and content are required"
        });
    }

    // Update note
    notes[noteIndex].title = title;
    notes[noteIndex].content = content;
    notes[noteIndex].updatedAt = new Date().toISOString();

    // Save
    saveNotes(notes);

    // Response
    res.json({
        success: true,
        message: "Note updated successfully",
        note: notes[noteIndex]
    });
});


// ==========================================
// DELETE - Delete note
// ==========================================
app.delete("/api/notes/:id", (req, res) => {

    const notes = readNotes();
    const id = Number(req.params.id);

    const noteIndex = notes.findIndex(
        note => note.id === id
    );

    // Check note exists
    if (noteIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "Note not found"
        });
    }

    // Delete note
    const deletedNote = notes.splice(noteIndex, 1)[0];

    // Save
    saveNotes(notes);

    // Response
    res.json({
        success: true,
        message: "Note deleted successfully",
        note: deletedNote
    });
});


// ==========================================
// 404 - Route not found
// ==========================================
app.use((req, res) => {

    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


// ==========================================
// Start Server
// ==========================================
app.listen(PORT, () => {

    console.log(
        `REST API server running at http://localhost:${PORT}`
    );

});