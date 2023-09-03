import { Route, Routes, useNavigate } from "react-router-dom";
// import Comments from "./components/Comments";
import Auth from "./components/Auth";
import Nav from './components/Nav'
import Home from "./components/Home";
import { useEffect, useState } from "react";

function App() {
	const navigate =useNavigate();
	const [auth,setAuth]= useState();
	useEffect(()=>{
		const data=JSON.parse(localStorage.getItem('profile'));
		if(!data){
			setAuth();
			navigate('/auth');
		}
		else{
			setAuth(data);
			navigate('/home')
		}
	},[navigate])
	return (
		<div>
			<Nav auth={auth} navigate={navigate} setAuth={setAuth}/>
			<Routes>
				<Route path='/auth' element={<Auth />} />
				<Route path='/home' element={<Home />} />
				<Route path='*' element={<Home />} />
				{/* <Route path='/comments/:category/:id' element={<Comments />} /> */}
			</Routes>
		</div>
	);
}

export default App;
