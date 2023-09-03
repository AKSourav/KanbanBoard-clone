import React, { useEffect, useState } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import TaskForm from './TaskForm'
import axios from 'axios'
import EditForm from './EditForm'
import API from '../../api'

const DraggableTask = ({task,item,index,socket,user}) => {
    const url=`http://localhost:4000`;
    const Navigate=useNavigate();
    const location=useLocation();

    const isAccess=(String(item.assignId[0])===String(user._id) || String(item.adminId[0])===String(user._id))
    

    const handleDelete=async(e)=>{
        e.preventDefault();
        try{
            // axios.delete(url+`/api/task/${item.id}`,{
            //     headers:{
            //         authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjA4YWY3MjRjMTlhNDI0OTI3MmVkYyIsImlhdCI6MTY5MzQ4NTgxNiwiZXhwIjoxNjk2MDc3ODE2fQ.skS79j77nTs0nc4x-WbENfR3ODPfc49_VyYKCobqgnQ`
            //     }
            // })
            API.delete(`/api/task/${item.id}`);
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
                    <h9>assignedto: <Link to={`/user/${item.assignedto[0]}`}>{item.assignedto[0]}</Link></h9>
                    <br/>
                    <h9>assignedBy: <Link to={`/user/${item.admin[0]}`}>{item.admin[0]}</Link></h9>
                    {isAccess && <div className="actions">
                        {/* <TaskForm task={item} socket={socket}/> */}
                        <EditForm task={item} socket={socket}/>
                        <button onClick={handleDelete} className="delete_button">Delete Task</button>
                    </div>}
                </div>
            )}
        </Draggable>
    </>
  )
}

export default DraggableTask