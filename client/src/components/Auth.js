import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Login from "./utils/Login";
import Signup from "./utils/Signup";

const Auth = () => {
	const navigate = useNavigate();

	
	return (
		<>
			<Tabs
			defaultActiveKey="Sign in"
			id="uncontrolled-tab-example"
			className="mb-3"
			style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%'}}
			>
				<Tab eventKey="Sign in" title="Sign in">
					<Login navigate={navigate}/>
				</Tab>
				<Tab eventKey="Sign up" title="Sign up">
					<Signup navigate={navigate}/>
				</Tab>
			</Tabs>
		</>
	);
};

export default Auth;
