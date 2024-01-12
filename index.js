import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import InfomorgenModel from "./models/infomorgen.js";
import ContactModel from "./models/contact.js";
import * as path from 'path';
import fs from 'fs';
import cookieParser from 'cookie-parser';
import { body, validationResult } from 'express-validator';
 
const app = express();
 
 
const dbURI = 'mongodb://localhost:27017/contactform';
const port = 3000;
 
 
const Schema = mongoose.Schema;
 
await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true});
    console.log('connected to db')
 
app.set('view engine', 'ejs');
 
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
 
 
//Login
 
app.use((req, res, next) => {
    res.locals.cookieUsername = req.cookies.cookieUsername || null;
    console.log('Username:', res.locals.cookieUsername);
    next();
});
 
// Startseite
app.get('/login', (req, res) => {
    res.render('login');
});
 
// Handle Login
app.post('/login', (req, res) => {
    const { username } = req.body;
 
    // Setze das Cookie mit dem Benutzernamen
    res.cookie('cookieUsername', username);
   
    // Leite den Benutzer zur Login-Seite weiter
    res.redirect('/login');
   
});
 
 
//Upload
import multer from "multer";
 
// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
 
// Create the multer instance
const upload = multer({ storage: storage });
 
export default upload;
 
// Require the upload middleware
 
 
// Set up a route for file uploads
app.post('/upload', upload.single('file'), (req, res) => {
    const imagePath = req.file.path;
   
    // Handle the uploaded file
    res.render('printUpload', { imagePath });
   
    // Send JSON response with success message
    //res.json({ success: true, message: 'File uploaded successfully!' });
  });
 
 
 
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
 
 
// Routen-Handler für die printUpload-Seite
app.get('/printUpload', (req, res) => {
    res.render('printUpload'); // Rendere die printUpload.ejs-Datei
});
 
 
// Routen-Handler für den Datei-Upload
 
app.get('/printDownload', (req, res) => {
    try {
      // Hier könntest du Logik hinzufügen, um die Liste der verfügbaren Dateien abzurufen
      // und diese Liste an deine EJS-Datei weiterzugeben.
 
      res.render('printDownload'); // Ändere diesen Pfad entsprechend dem Namen deiner EJS-Datei.
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
 
 
app.get('/add', async (req, res) => {
    try {
        const data = await ContactModel.find({});
        res.render('printAll', {"contacts": data});
    } catch (error) {
     
        console.error("Fehler beim Abrufen der Daten aus der Datenbank:", error);
        res.status(500).send("Interner Serverfehler");
    }
});
app.get('/anfrage', async (req, res) => {
    try {
        const data = await ContactModel.find({Typ:"Anfrage"});
        res.render('printAnfrage', {"contacts": data});
    } catch (error) {
     
        console.error("Fehler beim Abrufen der Daten aus der Datenbank:", error);
        res.status(500).send("Interner Serverfehler");
    }
});
app.get('/beschwerden', async (req, res) => {
    try {
        const data = await ContactModel.find({Typ:"Beschwerden"});
        res.render('printBeschwerden', {"contacts": data});
    } catch (error) {
     
        console.error("Fehler beim Abrufen der Daten aus der Datenbank:", error);
        res.status(500).send("Interner Serverfehler");
    }
});
app.get('/stoerung', async (req, res) => {
    try {
        const data = await ContactModel.find({Typ:"Störung"});
        res.render('printBeschwerden', {"contacts": data});
    } catch (error) {
     s
        console.error("Fehler beim Abrufen der Daten aus der Datenbank:", error);
        res.status(500).send("Interner Serverfehlser");
    }
});
app.get('/beratung', async (req, res) => {
    try {
        const data = await ContactModel.find({Typ:"Beratung"});
        res.render('printBeratung', {"contacts": data});
    } catch (error) {
     
        console.error("Fehler beim Abrufen der Daten aus der Datenbank:", error);
        res.status(500).send("Interner Serverfehler");
    }
});
 
 
 
 
 
app.get('/get', (req, res) => {
    const Infomorgen = new InfomorgenModel(
    {Name: 'Maria', Beruf: 'lorum'}
    );
    Infomorgen.save();
    console.log(`/add is running`);
})
 
 
app.post('/add',
    body('group1').notEmpty().withMessage("Typ cannot be empty"),
    body('group2').notEmpty().withMessage("Technik cannot be empty"),
    body('Antragsteller').notEmpty().withMessage("Antragsteller cannot be empty"),
    body('Partnernetz').notEmpty().withMessage("Partnernetz cannot be empty"),
    body('Kundennummer').notEmpty().withMessage("Kundennummer cannot be empty"),
    body('Vorname').notEmpty().withMessage("Vorname cannot be empty"),
    body('Nachname').notEmpty().withMessage("Nachname cannot be empty"),
    body('Anliegen').notEmpty().withMessage("Anliegen cannot be empty"),
 
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
    const Contact = new ContactModel({
        Id:req.body.id,
        Typ: req.body.group1,
        Technik: req.body.group2,
        Antragsteller: req.body.Antragsteller,
        Partnernetz: req.body.Partnernetz,
        Kundennummer: req.body.Kundennummer,
        Vorname: req.body.Vorname,
        Nachname: req.body.Nachname,
        Anliegen: req.body.Anliegen      
    })
    Contact.save();
    console.log(`New Contact Saved in DB`);
   
    //const blogs = [
    //    {title: 'Yoshi', snippet: 'lorem'},
    //    {title: 'Mario', snippet: 'Marem'},
    //    {title: 'Luigi', snippet: 'Go 4 it'},
    //];
    //Contact.find({});
 
     const data = await ContactModel.find({});
     //res.send(blogs);
 
     res.render('printAll',  {"contacts" : data} );  
 
    console.log(data)
    //res.json({'customers': blogs})
    //res.render('printAll', {title: 'Home', blogs});
       
    //const blogs = docs.toJSON();
    //const blogs = Contact.find({});
});
app.post('/delete', async (req, res) => {
    try {
        const { contactId } = req.body;
 
        // Validate if the contactId is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(contactId)) {
            return res.status(400).json({ error: 'Invalid contactId' });
        }
 
        console.log('Received request to delete contact with ID:', contactId);
 
        const deletedContact = await ContactModel.findByIdAndDelete(contactId);
        console.log('Deleted contact:', deletedContact);
 
        if (!deletedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
 
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
 
app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi', snippet: 'lorem'},
        {title: 'Mario', snippet: 'Marem'},
        {title: 'Luigi', snippet: 'Go 4 it'},
    ];
    res.render('index', {title: 'Home', blogs});
});