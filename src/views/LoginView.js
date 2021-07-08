import { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { Link } from 'react-router-dom';
import { Button, Form, Container, FormControl } from 'react-bootstrap';
import axios from 'axios';

const LoginView = ({ history, URL }) => {
	const { loginUser } = useContext(GlobalContext);
	const [message, setMessage] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (evt) => {
		evt.preventDefault();

		axios
			.post(`${URL}/users/login`, {
				email: email,
				password: password,
			})
			.then((res) => {
				if (res.data.token) {
					localStorage.setItem('token', res.data.token);
					loginUser();
					history.push('/pets');
				} else {
					setMessage(res.data.message);
				}
			});
		//
	};

	return (
		<Container className="ms-auto">
			<h1>Login:</h1>
			{message && <p>{message}</p>}
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>
						Email:
						<Form.Control
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</Form.Label>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						Password:
						<Form.Control
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</Form.Label>
				</Form.Group>
				<Button type="submit" value="Submit">
					Submit
				</Button>
			</Form>
			<br />
			<p>
				New? <Link to="/users/new">Sign up here!</Link>
			</p>
		</Container>
	);
};

export default LoginView;
