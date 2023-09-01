import React from "react";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import socketIO from "socket.io-client";

const socket = socketIO.connect("http://localhost:4000");

const Home = () => {
	return (
		<div>
			<AddTask socket={socket} />
			<TasksContainer socket={socket} />
		</div>
	);
};

export default Home;
