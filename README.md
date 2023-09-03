# KanbanBoard-clone
A Real-Time KanbanBoard Clone Application build with MERN stack. Equiped with Web Sockets, Search and many more.

## Demo

### Auth Page
![Screenshot 2023-09-03 204153](https://github.com/AKSourav/KanbanBoard-clone/assets/97042110/c60608f3-4ac8-42d9-b29f-9e8a5e59acf5)
### Home Page
![Screenshot 2023-09-03 203926](https://github.com/AKSourav/KanbanBoard-clone/assets/97042110/d6d2b61f-a9e0-4db1-af6b-5cf804f4f0d1)
### Edit Side Modal
![Screenshot 2023-09-03 204037](https://github.com/AKSourav/KanbanBoard-clone/assets/97042110/a27f68c4-1562-4200-8eb0-51843a57bf08)

## User Permissions
* making an account is required
* can search for other users

## Features
* Real Time Application
* Draggable tasks
* Encryption

## View live App

Hosted at [Vercel](https://kanban-clone-app.vercel.app/) **without** **Web** **Sockets**


## Tech Stack Used

### The MERN Stack

* [MongoDB](https://docs.mongodb.com/) - Document database - to store data as JSON 
* [Express.js](https://devdocs.io/express/) - Back-end web application framework running on top of Node.js
* [React](https://reactjs.org/docs/) - Front-end web app framework used
* [Node.js](https://nodejs.org/en/docs/) - JavaScript runtime environment 

### Middleware

* [Mongoose](https://mongoosejs.com/docs/guide.html) - ODM for MongoDB

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Your machine should have npm and node.js installed to use it locally.

### Setup and Installation


1. First fork the repo to your account.  
   Go to the forked repo and clone it to your local machine:

```sh
git clone https://github.com/AKSourav/KanbanBoard-clone.git
```

This will make a copy of the code to your local machine.

2. Move to `server` folder and install all the necessary dependencies by the following command:

```sh
cd server
npm install --legacy-peer-deps
cd ..
```

3. Move to `client` folder and install all the necessary dependencies by the following command:

```sh
cd client
npm install --legacy-peer-deps
cd ..
```

4. Create a `.env` file in the `MERN-CHAT-APP` directory and add the following

```sh
MONGODB_URL=YOUR_MONGODB_URL
JWT_SECRET=YOUR_JWT_SECRET
```

### Run locally

Run the below command to start the app:

```sh
npm run dev
```
* The **backend** runs on port **4000**
* The **frontend** side runs on port **3000**
* Both client and server must run **concurrently.**
**Go to: [http://localhost:3000](http://localhost:3000)**
