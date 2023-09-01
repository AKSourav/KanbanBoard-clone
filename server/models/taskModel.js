const mongoose = require('mongoose');

const taskModel = mongoose.Schema({
    admin: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    title: {type: String, trim: true},
    description: {type: String, trim:true, default:'N/A'},
    assignedto: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    deadline:{type:Date,default:new Date((new Date(Date.now()).getTime() + (2 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000)))},
    status: { type:String, default:'pending'},
    comments:[{type:Object}]
},{
    timestamps:true,
}
);

const Task = mongoose.model("Task", taskModel);

module.exports= Task;