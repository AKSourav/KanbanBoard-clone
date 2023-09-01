import { Route, Routes } from "react-router-dom";
// import Comments from "./components/Comments";
import Login from "./components/Login";
import Nav from './components/Nav'
import Home from "./components/Home";

function App() {
	return (
		<div>
			<Nav />
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/home' element={<Home />} />
				{/* <Route path='/comments/:category/:id' element={<Comments />} /> */}
			</Routes>
		</div>
	);
}

export default App;
