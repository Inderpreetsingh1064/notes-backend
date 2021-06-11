const express= require('express');
const mongoose=require('mongoose');
const env=require('dotenv');
const { saveNotes, deleteNotes, getNotes, modifyNotes } = require('./controller/noteToMongo');
const { saveNotesFile, deleteNotesFile, getNotesFile, modifyNotesFile } = require('./controller/noteToJson');
const app=express();
app.use(express.json());

//environmentvariable
env.config()

//mongodbconnection
mongoose.connect('mongodb://localhost:27017/notes', {useNewUrlParser: true,useUnifiedTopology:true,useFindAndModify: false,useCreateIndex:true}).then(()=>{
    console.log('Database connected');
});

//routes for JSON
app.post('/saveNoteToFile',saveNotesFile);
app.get('/getNoteFromFile',getNotesFile);
app.put('/modifyNoteToFile',modifyNotesFile);
app.delete('/deleteNoteFromFile',deleteNotesFile);

//routes for mongoDB
app.post('/savenote',saveNotes);
app.get('/getNote',getNotes);
app.put('/modifyNote',modifyNotes);
app.delete('/deleteNote',deleteNotes);


app.listen(process.env.PORT,()=>{console.log(`server running on ${process.env.PORT}`);})