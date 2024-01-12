import mongoose from "mongoose";
const Schema = mongoose.Schema;

const InfomorgenSchema = new Schema ({
    Name: { 
        type: String,
        required: [true, "Name is required"]
    },
    Beruf: {
        type: String,
        required: [true, "Beruf is required"]
    } 
}, {collection: 'userinfo'})

const InfomorgenModel = mongoose.model('Infomorgen', InfomorgenSchema);

//module.exports = InfomorgenModel;
export default InfomorgenModel;