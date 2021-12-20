const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    selType:{
        type: String,
        required: true

    },
    address:{
        type: String,

    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        minlength: 6
    },
    role:{
        type: String,
        enum: ["organization", "vetting"],
        default: "organization"
    },
    contactNumber: {type: String},
    profilePicture: {type: String}
}, {timestamps: true});

module.exports = mongoose.model("User",userSchema);