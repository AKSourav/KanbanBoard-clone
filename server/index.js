const express = require("express");
const dotenv=require("dotenv");
const connectDB = require("./config/db");
const app = express();
const cors = require("cors");
const http = require("http").Server(app);
const PORT = 4000;
const path= require('path');
const bodyParser=require('body-parser')
const {notFound,errorHandler} =require('./middleware/errorMiddleware');
const Task=require('./models/taskModel');

dotenv.config();
connectDB().then(()=>{

	http.listen(PORT, () => {
		console.log(`Server listening on ${PORT}`);
	});

});


//routes
const userRoutes=require('./routes/userRoutes');
const taskRoutes=require('./routes/taskRoutes');
const { updateTask } = require("./helper/updateTask");
const { getTasks } = require("./helper/getTasks");

app.use(express.json()); // to accept JSON Data
app.use(bodyParser.json({extended: true})); // to accept JSON Data



const socketIO = require("socket.io")(http, {
	cors: {
		origin: "*",
	},
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const fetchID = () => Math.random().toString(36).substring(2, 10);

let tasks = {
	pending: {
		title: "pending",
		items: [
			
		],
	},
	ongoing: {
		title: "ongoing",
		items: [
			
		],
	},
	completed: {
		title: "completed",
		items: [
			
		],
	},
};

getTasks().then((data)=>
			{
				tasks=data
				console.log(tasks);
			}
);



socketIO.on("connection", (socket) => {
	console.log(`⚡: ${socket.id} user just connected!`);
	
	socket.on("createTask", (newTask) => {
		tasks["pending"].items.push(newTask);
		socket.emit("tasks", tasks);
		
	});

	socket.on("updateTask", (newTask) => {
		console.log('update task socket triggered!!',newTask)
		const index=tasks[newTask.status].items.findIndex((e)=>String(e.id)===String(newTask.id));
		console.log('index:',index)
		if(index!==-1)
		tasks[newTask.status].items[index]=newTask;
		socket.emit("tasks", tasks);
		
	});

	socket.on("deleteTask", (task) => {
		console.log("here is the task to be deleted!",task);
		tasks[task.status].items=tasks[task.status].items.filter((e)=>String(e.id)!==String(task.id));
		socket.emit("tasks", tasks);
		
	});
	
	socket.on("taskDragged", (data) => {
		const { taskId,source, destination } = data;
		const status=destination.droppableId;
		const movedItem=tasks[source.droppableId].items.find((e)=>String(e.id)===String(taskId));
		tasks[source.droppableId].items=tasks[source.droppableId].items.filter((e)=>String(e.id)!=String(taskId));
		tasks[destination.droppableId].items.push(movedItem);
		socket.emit("tasks", tasks);
			// console.log("Source >>>", tasks[source.droppableId].items);
			// console.log("Destination >>>", tasks[destination.droppableId].items);
			updateTask({taskId,status}).then(()=>getTasks().then((data)=>{
				tasks=data;
				socket.emit("tasks", tasks);
			})
			);
		});
		
		socket.on("fetchComments", (data) => {
			const taskItems = tasks[data.category].items;
			for (let i = 0; i < taskItems.length; i++) {
				if (taskItems[i].id === data.id) {
					socket.emit("comments", taskItems[i].comments);
				}
			}
		});
		socket.on("addComment", (data) => {
			const taskItems = tasks[data.category].items;
			for (let i = 0; i < taskItems.length; i++) {
				if (taskItems[i].id === data.id) {
					taskItems[i].comments.push({
						name: data.userId,
						text: data.comment,
						id: fetchID(),
					});
					socket.emit("comments", taskItems[i].comments);
				}
			}
		});
		socket.on("disconnect", () => {
			socket.disconnect();
			console.log("🔥: A user disconnected");
		});
	});
	
	app.get("/api", async (req, res) => {
	res.json(tasks);
});

app.get('/',(req,res)=>res.send('Hosted!'))

app.use('/api/user',userRoutes)
app.use('/api/task',taskRoutes)

//error handling for invalid routes
app.use(notFound);
app.use(errorHandler);
