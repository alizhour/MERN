const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    customerName: String,
    customerAdress: String,
    customerMobileNumber: String,
    countryCode: String,
    countryName: String,
    operatorName: String,
}, {timestamps: true})



module.exports = mongoose.model('users', UserSchema)