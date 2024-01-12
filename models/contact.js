import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ContactSchema = new Schema ({
     Typ: { 
        type: String,
        required: [true, "Typ is required"]
    },
    Technik: {
        type: String,
        required: [true, "Technik is required"]
    },
    Antragsteller: {
        type: String,
        required: [true, "Antragsteller is required"]
    },
    Partnernetz: {
        type: String,
        required: [true, "Partnernetz is required"]
    },
    Kundennummer: {
        type: String,
        required: [true, "Kundennummer is required"]
    },
    Vorname: {
        type: String,
        required: [true, "Vorname is required"]
    },
    Nachname: {
        type: String,
        required: [true, "Nachname is required"]
    },
    Anliegen: {
        type: String,
        required: [true, "Anliegen is required"]
    },
   
}, {collection: 'contacts'})

const ContactModel = mongoose.model('ContactModel', ContactSchema);

//module.exports = InfomorgenModel;
export default ContactModel;