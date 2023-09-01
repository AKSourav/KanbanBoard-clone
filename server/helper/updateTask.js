const Task = require("../models/taskModel");
const User = require("../models/userModel");
const _ = require("lodash");

module.exports.updateTask=async (args)=>{
    const {taskId,title,status,description,assignedto,deadline}= args;
    console.log("Here!!!!!!!!!!:",taskId,status);
    
    const updates={};
    // console.log(req.body)

    if(title) updates.title=_.capitalize(title.trim());
    if(description) updates.description=description;
    if(deadline!=undefined && deadline>0){
        updates.deadline=new Date((new Date(Date.now()).getTime() + (deadline* 24 * 60 * 60 * 1000)))
    }
    if(assignedto)
    {
        const employee= await User.findById(assignedto);
        if(employee && employee.admin===false)
            updates.assignedto=assignedto;
        else if(employee) throw new Error(`task can't be assigned to an admin `)
    }
    if(status)
        updates.status=status;

    console.log(updates);
    try {
        const task= await Task.findByIdAndUpdate(taskId,updates,{new:true}).populate('admin assignedto','-password');
        console.log("Task Updated");
    } catch (error) {
        console.log(error.message);
    }
}