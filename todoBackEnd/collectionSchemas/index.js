const mongoose = require("mongoose");


const postUSerDataSchema = new mongoose.Schema({
    email: {
        type: String,
        requried: true
    },
    userName: {
        type: String,
        requried: true
    },
    password: {
        type: String,
        requried: true
    },
    profession: {
        type: String,
        requried: true
    },
    profileImage: {
        type: String,
        required: true
    }

});

const todoSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    user_id:{
        type:String,
        required:true
    },
    createdAt: { type: Date, default: Date.now }
})


const postUserData = mongoose.model('users', postUSerDataSchema);
const todoData = mongoose.model('todos',todoSchema)

module.exports = { postUserData , todoData};