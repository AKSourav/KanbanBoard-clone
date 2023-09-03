import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import API from '../../api';

function EditForm({task,socket}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
      console.log(task);
    setTitle(task.title);
    setDesc(task.description);
    setAssign(task.assignedto[0]);
    setUserId(task.assignId[0])
    setShow(true)
    };

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

const handleUpdate=async(e)=>{
    setLoading(true);
        e.preventDefault();
        try{

            // const {data}=await axios.patch(url+`/api/task/${task.id}`,{title,description,assignedto:userId},{
            //     headers:{
            //         authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjA4YWY3MjRjMTlhNDI0OTI3MmVkYyIsImlhdCI6MTY5MzQ4NTgxNiwiZXhwIjoxNjk2MDc3ODE2fQ.skS79j77nTs0nc4x-WbENfR3ODPfc49_VyYKCobqgnQ`
            //     }
            // })
            const {data}= await API.patch(`/api/task/${task.id}`,{title,description,assignedto:userId});
            data.assignId=[data.assignedto._id];
            data.admin=[data.admin.username];
            data.assignedto=[data.assignedto.username];
            data.id=data._id;
            console.log("updateditem:",data);
            socket.emit("updateTask", data);
        }
        catch(err){
            console.log(err.message);
        }
        setLoading(false);
        setShow(false);
    }

  return (
    <>
      <button className="edit_button" onClick={handleShow}>Edit Task</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form className='form__input' autoComplete='off'>
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
                    {/* {!task && <button className='addTodoBtn' disabled={!userId || loading}>{loading?"loading...":"Submit"}</button>} */}
                    {task && <button className='addTodoBtn' disabled={!userId || loading} onClick={handleUpdate}>{loading?"loading...":"Update"}</button>}
                </form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <button className='addTodoBtn' disabled={!userId || loading}>{loading?"loading...":"Submit"}</button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}

export default EditForm;