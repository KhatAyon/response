import mongoose from "mongoose";
const { Schema, model } = mongoose;

const todoSchema = Schema({
    first_name: {
        type: String,
        required: true,

    },


    last_name: {
        type: String,
        required: true,
        
    },

    date_of_birth: {
        type: String,
        required: true,
        
    },

    school: {
        type: String,
        required: true,

        
    },

});

const response = model("todo", todoSchema);
export default response;