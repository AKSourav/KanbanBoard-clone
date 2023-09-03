import React, { useEffect } from "react";

const Nav = ({auth,setAuth,navigate}) => {
	useEffect(()=>{
		if(!auth)
		{
			navigate('/auth');
		}
	},[auth,navigate]);
	const handleSignOut=()=>{
		localStorage.removeItem('profile');
		setAuth();
		navigate('/auth');
	}
	return (
		<nav className='navbar'>
			<h3>Task List</h3>
			{auth && <div className="actions_nav">
				<p>{auth?.username}</p>
				<button onClick={handleSignOut}>Sign Out</button>
			</div>}
		</nav>
	);
};

export default Nav;
