import axios from 'axios';
import React, { useState } from 'react'

const TaskForm = ({task,socket}) => {
    const url=`http://localhost:4000`
    const [title, setTitle] = useState("");
    const [description, setDesc] = useState("");
    const [assignedto, setAssign] = useState("");
    const [users,setUsers] = useState([]);
    const [userId,setUserId]= useState();

    if(task){
        // setTitle(task.title);
        // setDesc(task.description);
        // setAssign(task.assignedto[0]);
        // console.log(task);
    }

    const [openD,setOpenD]= useState(false);
    const [loading,setLoading]= useState(false);

    const handleSearch=async (e)=>{
        setUserId();
        setOpenD(true);
        setLoading(true);
        setAssign(e.target.value);
        const {data}=await axios.get(url+`/api/user`,{
            headers:{
                authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjA4YWY3MjRjMTlhNDI0OTI3MmVkYyIsImlhdCI6MTY5MzQ4NTgxNiwiZXhwIjoxNjk2MDc3ODE2fQ.skS79j77nTs0nc4x-WbENfR3ODPfc49_VyYKCobqgnQ`
            },
            params:{
                searchQuery:e.target.value
            }
        })
        setUsers(data);
        setLoading(false);
        console.log(users);
    }

    const handleSelection= async(e,user)=>{
        setOpenD(false);
        setUserId(user);
        setAssign(user.username)
    }

	const handleSubmit = async (e) => {
		e.preventDefault();
        try{

            const {data}=await axios.post(url+`/api/task`,{title,description,assignedto:userId._id},{
                headers:{
                    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjA4YWY3MjRjMTlhNDI0OTI3MmVkYyIsImlhdCI6MTY5MzQ4NTgxNiwiZXhwIjoxNjk2MDc3ODE2fQ.skS79j77nTs0nc4x-WbENfR3ODPfc49_VyYKCobqgnQ`
                }
            })
            data.assignId=[data.assignedto._id];
            data.admin=[data.admin.username];
            data.assignedto=[data.assignedto.username];
            data.id=data._id;
            console.log(data);
            socket.emit("createTask", data);
        }
        catch(err){
            console.log(err.message);
        }
		setTitle("");
        setDesc('');
        setAssign('');
        setUserId();
	};

    // const handleUpdate=async(e)=>{
    //     e.preventDefault();
    //     try{

    //         const {data}=await axios.post(url+`/api/task${task.id}`,{title,description,assignedto},{
    //             headers:{
    //                 authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjA4YWY3MjRjMTlhNDI0OTI3MmVkYyIsImlhdCI6MTY5MzQ4NTgxNiwiZXhwIjoxNjk2MDc3ODE2fQ.skS79j77nTs0nc4x-WbENfR3ODPfc49_VyYKCobqgnQ`
    //             }
    //         })
    //         data.admin=[data.admin.username];
    //         data.assignedto=[data.assignedto.username];
    //         data.id=data._id;
    //         console.log(data);
    //         socket.emit("updateTask", data);
    //     }
    //     catch(err){
    //         console.log(err.message);
    //     }
    // }
    
  return (
    <>
        <button className={task?"edit_button":"addTodoBtn"} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling">{task?'Edit Task':'Create'}</button>
        <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabindex="-1" id="offcanvasScrolling" aria-labelledby="offcanvasScrollingLabel">
            <div className="form__input">
                <h5 className="offcanvas-title" id="offcanvasScrollingLabel">{task?"Edit Task":"Create Task"}</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <form className='form__input' onSubmit={handleSubmit} autoComplete='off'>
                    <label htmlFor='title'>Title</label>
                    <input
                        type='text'
                        name='title'
                        id='title'
                        value={title}
                        className='input'
                        required
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <label htmlFor='desc'>Description</label>
                    <input
                        type='text'
                        name='desc'
                        id='desc'
                        value={description}
                        className='input'
                        required
                        onChange={(e) => setDesc(e.target.value)}
                    />
                    <label htmlFor='assignedto'>User</label>
                    <input
                        type='text'
                        name='assignedto'
                        id='assignedtoc'
                        value={assignedto}
                        className='input'
                        required
                        onChange={handleSearch}
                    />
                    {openD && <div className='search_container'>
                        {!loading && users?.length>0 && users.map((user)=>{
                            return (
                                <>
                                    <p onClick={(e)=>handleSelection(e,user)}>{user.username}</p>
                                </>
                            )
                        })}
                        {
                            !loading && users?.length===0 &&(
                                <p>No data</p>
                            )
                        }
                        {
                            loading && (
                                <p>loading...</p>
                            )
                        }
                    </div>}
                    {!task && <button className='addTodoBtn' disabled={!userId || loading}>{loading?"loading...":"Submit"}</button>}
                    {/* {task && <button className='addTodoBtn' disabled={!userId || loading} onClick={handleUpdate}>{loading?"loading...":"Update"}</button>} */}
                </form>
            </div>
        </div>
    </>
  )
}

export default TaskForm