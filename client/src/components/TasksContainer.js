import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import DraggableTask from "./utils/DraggableTask";

const TasksContainer = ({ socket }) => {
	const [tasks, setTasks] = useState({});

	useEffect(() => {
		function fetchTasks() {
			fetch("http://localhost:4000/api")
				.then((res) => res.json())
				.then((data) => {setTasks(data);console.log("tasksList:",data)});
		}
		fetchTasks();
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
		const itemI=tasks[source.droppableId].items.findIndex((e)=>e.id===draggableId);
		const item=tasks[source.droppableId].items[itemI]
		if (!destination) return;
		if (
			destination.droppableId=== source.droppableId
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
	return (
		<div className='container'>
			<DragDropContext onDragEnd={handleDragEnd}>
				{Object.entries(tasks).map((task) => (
					<div
						className={`${task[1].title.toLowerCase()}__wrapper`}
						key={task[1].title}
					>
						<h3>{task[1].title} Tasks</h3>
						<div className={`${task[1].title.toLowerCase()}__container`}>
							<Droppable droppableId={task[1].title}>
								{(provided) => (
									<div ref={provided.innerRef} {...provided.droppableProps}>
										{task[1].items.map((item, index) => (
											<DraggableTask task={task} item={item} index={index} socket={socket}/>
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
