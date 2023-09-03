import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DraggableTask from "./utils/DraggableTask";
import { baseURL } from "../api";

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TasksContainer = ({ socket }) => {
	const [tasks, setTasks] = useState({});
	const [user,setUser]=useState();

	useEffect(() => {
		function fetchTasks() {
			fetch(baseURL+`/api`)
				.then((res) => res.json())
				.then((data) => {setTasks(data);console.log("tasksList:",data)});
		}
		fetchTasks();
		setUser(JSON.parse(localStorage.getItem('profile')));
	}, []);

	useEffect(() => {
		socket.on("tasks", (data) => {
			setTasks(data);
			console.log("updated TaskList",data);
		});
	}, [socket]);

	const handleDragEnd = (props) => {
		const { draggableId,destination, source }=props;
		console.log("Props",props);
		const userInfo=JSON.parse(localStorage.getItem('profile'));
		const itemI=tasks[source.droppableId].items.findIndex((e)=>e.id===draggableId);
		const item=tasks[source.droppableId].items[itemI]
		if (!destination) return;
		if(!(item.assignedto[0]===userInfo.username || item.admin[0]===userInfo.username))
		{
			toast.warning('You are not allowed to perform this action', {
				position: toast.POSITION.TOP_RIGHT,
			  })
		}
		if (
			destination.droppableId=== source.droppableId ||
			!(item.assignedto[0]===userInfo.username || item.admin[0]===userInfo.username)
		)
			return;
		item.status=destination.droppableId;
		console.log("dropped:",item);
		
		
		socket.emit("taskDragged", {
			taskId:item.id,
			source,
			destination,
		});
	};
	const sections=['To Do','Doing','Done']
	return (
		<div className='container'>
			<ToastContainer />
			<DragDropContext onDragEnd={handleDragEnd}>
				{Object.entries(tasks).map((task,index) => (
					<div
						className={`${task[1].title.toLowerCase()}__wrapper`}
						key={task[1].title}
					>
						<h3>{sections[index]}</h3>
						<div className={`${task[1].title.toLowerCase()}__container`}>
							<Droppable droppableId={task[1].title}>
								{(provided) => (
									<div ref={provided.innerRef} {...provided.droppableProps}>
										{task[1].items.map((item, index) => (
											<DraggableTask task={task} item={item} index={index} socket={socket} user={user}/>
										))}
										{provided.placeholder}
									</div>
								)}
							</Droppable>
						</div>
					</div>
				))}
			</DragDropContext>
		</div>
	);
};

export default TasksContainer;
