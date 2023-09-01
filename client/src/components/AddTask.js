import React, { useState } from "react";
import TaskForm from "./utils/TaskForm";

const AddTask = ({ socket }) => {
	return (
		<>
			<TaskForm socket={socket}/>
		</>
	);
};

export default AddTask;
