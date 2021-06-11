const fs=require("fs");

//function to save notes to json file, takes note heading with note body
exports.saveNotesFile = (req, res) => {
    const newData=req.body;
    const prevData = fs.readFileSync("./src/notes.json");
    var tempParsedData=JSON.parse(prevData);
    var parsedData={...tempParsedData,...newData};   // combining previous notes with new note
    const jsonString = JSON.stringify(parsedData);
    fs.writeFile('./src/notes.json', jsonString, err => {
        if (err) {
            return res.status(400).json({message:'something went wrong'});
        } else {
            return res.status(201).json({message:'Note Saved Successfully'});
        }
    });
};

//function to fetch notes from json file
exports.getNotesFile = (req, res) => {
    fs.readFile("./src/notes.json", "utf8", (err, jsonString) => {
        if (err) {
            return res.status(400).json({message:'Error reading file'});
        }
        try {
            const notes = JSON.parse(jsonString);
            return res.status(204).json({notes:notes});
        } 
        catch (err) {
            return res.status(400).json({message:'Error parsing JSON file',error:err});
        }
    });
};

//function to deletenotes from json file, takes heading of note to be deleted
exports.deleteNotesFile = (req, res) => {
    const name=req.body.delete;
    fs.readFile("./src/notes.json", "utf8", (err, jsonString) => {
        if (err) {
            return res.status(400).json({message:'Error reading file'});
        }
        try {
            const notes = JSON.parse(jsonString);
            delete notes[name];
            const afterDeletion = JSON.stringify(notes);
            fs.writeFile('./src/notes.json',afterDeletion, err => {
                if (err) {
                    return res.status(400).json({message:'something went wrong'});
                } else {
                    return res.status(201).json({message:'Note Deleted Successfully'});
                }
            });
        } 
        catch (err) {
            return res.status(400).json({message:'Error Parsing JSON file',error:err});
        }
    });
};

// function to modify existing notes in json file, takes name and new body for that note
exports.modifyNotesFile = (req, res) => {
    noteName=req.body.name;
    noteBody=req.body.modify;
    fs.readFile("./src/notes.json", "utf8", (err, jsonString) => {
        if (err) {
            return res.status(400).json({message:'Error reading file'});
        }
        try {
            const notes = JSON.parse(jsonString);
            notes[noteName]=noteBody;
            const afterModification=JSON.stringify(notes);
            fs.writeFile('./src/notes.json',afterModification, err => {
                if (err) {
                    return res.status(400).json({message:'something went wrong'});
                } else {
                    return res.status(201).json({message:'Note Modified Successfully'});
                }
            });
        } 
        catch (err) {
            return res.status(400).json({message:'Error Parsing JSON file',error:err});
        }
    });
};
    
