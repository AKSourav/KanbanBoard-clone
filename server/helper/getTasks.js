const Task = require("../models/taskModel");

module.exports.getTasks=async()=>{
    let data=await Task.aggregate([
        { $lookup: {
            from: "users",
            localField: "assignedto",
            foreignField: "_id",
            as: "assignedto"
         }},
        { $lookup: {
            from: "users",
            localField: "admin",
            foreignField: "_id",
            as: "admin"
         }},
        {
          $group: {
            _id: '$status',
            items: { $push:{id:'$_id',title:'$title',description:'$description',comments:'$comments',status:'$status',assignedto:'$assignedto.username',assignId:'$assignedto._id',admin:'$admin.username'} }
          }
        }
      ])
console.log(data);
const tasks={};
tasks.pending=data.find((e)=>e._id==="pending") || {
    title: "pending",
    items: [],
};
tasks.ongoing=data.find((e)=>e._id==="ongoing") || {
    title: "ongoing",
    items: [],
};
tasks.completed=data.find((e)=>e._id==="completed") || {
    title: "completed",
    items: [],
};

tasks.pending.title='pending';
tasks.ongoing.title="ongoing";
tasks.completed.title="completed";
return tasks;
}