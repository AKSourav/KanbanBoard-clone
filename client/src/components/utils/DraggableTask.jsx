import React, { useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import TaskForm from './TaskForm'
import axios from 'axios'
import EditForm from './EditForm'

const DraggableTask = ({task,item,index,socket}) => {
    const url=`http://localhost:4000`;
    const Navigate=useNavigate();
    const location=useLocation();


    // const openEdit=(e)=>{
    //     e.preventDefault();
    //     console.log(location);
    // }



    const handleDelete=async(e)=>{
        e.preventDefault();
        try{
            axios.delete(url+`/api/task/${item.id}`,{
                headers:{
                    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjA4YWY3MjRjMTlhNDI0OTI3MmVkYyIsImlhdCI6MTY5MzQ4NTgxNiwiZXhwIjoxNjk2MDc3ODE2fQ.skS79j77nTs0nc4x-WbENfR3ODPfc49_VyYKCobqgnQ`
                }
            })
            console.log("Deleted!");
            socket.emit('deleteTask',item);
        }catch(error){
            console.log(error);
        }
    }

  return (
    <>
        <Draggable
            key={item.id}
            draggableId={item.id}
            index={index}
        >
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`${task[1].title.toLowerCase()}__items`}
                >
                    <h3>{item.title}</h3>
                    <h5>{item.description}</h5>
                    <h6>assignedto: <Link to={`/user/${item.assignedto[0]}`}>{item.assignedto[0]}</Link></h6>
                    <div className="actions">
                        {/* <TaskForm task={item} socket={socket}/> */}
                        <EditForm task={item} socket={socket}/>
                        <button onClick={handleDelete} className="delete_button">Delete Task</button>
                    </div>
                </div>
            )}
        </Draggable>
    </>
  )
}

export default DraggableTask