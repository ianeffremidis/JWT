import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const [email, setEmail] = useState("")
	const [pass, setPass] = useState("")
	const token = sessionStorage.getItem("token");
	const history = useNavigate();
	console.log("this is token", store.token)

	const handleClick = () => {
		actions.login(email, pass)
	}
	if (store.token && store.token!="" && store.token!=undefined) history("/");

	return (
		<div className="text-center mt-5">
			<div>	
				<h1>Login</h1>
			</div>
				{(store.token && store.token!="" && store.token!=undefined) ? "You are logged in with token" + store.token : 
				<div>
				<input type="text" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
				<input type="password" placeholder="Password" value={pass} onChange={(e)=>setPass(e.target.value)}/>
				<button onClick={handleClick}>Login</button>
				</div>
				}	
		</div>
	);
};
