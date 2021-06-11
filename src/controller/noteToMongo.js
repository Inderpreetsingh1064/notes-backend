const Note = require("../model/note");
//function to save notes to mongoDB, takes name of user and save's corresponding notes
exports.saveNotes = (req, res) => {
    var name;
    if(req.body.name)name=req.body.name;
    newnote=req.body.data;
    Note.findOneAndUpdate({name:name},{ $push: {body:newnote}}).exec((error,note)=>{
        if(error){
            return res.status(404).json({message:'something went wrong'});
        }
        else if(note){
            return res.status(200).json({message:'note added successfully'});
        }
        else{
            body=newnote;
            noteobj={name,body}
            const _note =new Note(noteobj);
            _note.save((error,data)=>{
            if(data){return res.status(201).json({
                    user:data,
                    message:'note created successfully'})};
            if(error){
                return res.status(400).json({message:'something went wrong'});};
            });
        }
    })
        
};
//function to fetch notes from MongoDB,using name of user as Id
exports.getNotes = (req, res) => {
    Note.find({name:req.body.name}).exec((error, notes) => {
        if (error) return res.status(400).json({ error });
        if (notes) {
          res.status(200).json({notes });
        }
        });
};

exports.deleteNotes = (req, res) => {
//underconstruction
}

exports.modifyNotes = (req, res) => {
//underconstruction
};
