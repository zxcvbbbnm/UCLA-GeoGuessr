import React, { useState, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import axios from "axios"

function Login() {
	const navigate = useNavigate()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	
    useEffect(() => {
		const userToken = localStorage.getItem('userobj');
        if (userToken){
            navigate('/home');
        }
	}, [navigate]);

	async function submit(e) {
		e.preventDefault();
		try {
			const response = await axios.post('/api/user_info/login', {email, password});
			console.log(response);
			if (response){
				localStorage.setItem('userobj', JSON.stringify({response}));
				navigate('/home');
			}
			else {
				alert("Authentication Failed!");
			}
		}
		catch (error){
			console.log(error);
		}
	} 
	
	return (
		<div className="login">
			<h1>UCLA GEOGUESSER</h1>
			<h2>Log In</h2>
			<form action="POST">
				<input type="email" onChange={(e) => { setEmail(e.target.value) }} placeholder="Email" name="" id="" />
				<br/>
				<br/>
				<input type="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Password" name="" id="" />
				<br/>
				<br/>
				<input type="submit" onClick={submit} />
			</form>
			<br />
			<p>OR</p>
			<br />
			<Link to="/SignUp">Sign Up Here</Link>
		</div>
	);
}
export default Login;
