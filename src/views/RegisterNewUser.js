import { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import axios from 'axios';

const RegisterNewUser = ({ history, URL }) => {
	const [message, setMessage] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [city, setCity] = useState('');
	const [address, setAddress] = useState('');

	const handleSubmit = (evt) => {
		evt.preventDefault();
		if (!name || !email || !password || !confirmPassword || !city) {
			setMessage('Please Enter all required fields!');
		} else {
			if (password !== confirmPassword) {
				setMessage('Please confirm password!');
			} else {
				axios
					.post(`${URL}/users/`, {
						name,
						email,
						password,
						phoneNumber,
						city,
						address,
					})
					.then((res) => {
						history.push(`/pets/`);
					});
			}
		}
	};

	//future enhancement - login right after new sign up!

	return (
		<Container>
			<h1>Sign Up:</h1>
			{message && <p>{message}</p>}
			<Form onSubmit={handleSubmit}>
				<Form.Group>
					<Form.Label>
						Name:
						<Form.Control
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</Form.Label>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						Email:
						<Form.Control
							type="email"
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
				<Form.Group>
					<Form.Label>
						Confirm Password:
						<Form.Control
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</Form.Label>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						Phone Number:
						<Form.Control
							type="text"
							value={phoneNumber}
							onChange={(e) => setPhoneNumber(e.target.value)}
						/>
					</Form.Label>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						City:
						<Form.Control
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
					</Form.Label>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						Address:
						<Form.Control
							type="text"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
						/>
					</Form.Label>
				</Form.Group>

				<Button type="submit" value="Submit">
					Register
				</Button>
			</Form>
			<br />
			<p>
				Already a User? <Link to="/users/login">Login here!</Link>
			</p>
		</Container>
	);
};

export default RegisterNewUser;
