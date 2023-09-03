import React, { useEffect } from "react";
import AddTask from "./AddTask";
import TasksContainer from "./TasksContainer";
import socketIO from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../api";

const socket = socketIO.connect(baseURL);

const Home = () => {
	const navigate=useNavigate();
	useEffect(()=>{
		if(!localStorage.getItem('profile'))
			navigate('/auth');
	},[socket])
	return (
		<div>
			<AddTask socket={socket} />
			<TasksContainer socket={socket} />
		</div>
	);
};

export default Home;
