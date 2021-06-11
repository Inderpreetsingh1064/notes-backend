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
exports.deleteNotesFile = (req, res) => {
    //underconstruction
}
    
exports.modifyNotesFile = (req, res) => {
    //underconstruction
};
    