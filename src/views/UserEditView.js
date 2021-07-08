import { useState, useEffect, useContext } from 'react';
import { Form, Container, Button } from 'react-bootstrap';
import axios from 'axios';
import { GlobalContext } from '../context/GlobalState';

const UserEditView = ({ match, history, URL }) => {
	const { userInfo } = useContext(GlobalContext);
	const [message, setMessage] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [city, setCity] = useState('');
	const [address, setAddress] = useState('');
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		axios.get(`${URL}/users/${match.params.id}`).then((res) => {
			const user = res.data.user;
			//if (pet.createdBy === user._id) {
			setName(user.name);
			setEmail(user.email);
			setPassword(user.password);
			setPhoneNumber(user.phoneNumber);
			setCity(user.city);
			setAddress(user.address);
			setIsAdmin(user.isAdmin);
		});
	}, []);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axios
			.put(`${URL}/users/${match.params.id}`, {
				name,
				email,
				password,
				phoneNumber,
				city,
				address,
				isAdmin,
			})
			.then((res) => {
				console.log(res.data);
				history.push(`/users/${match.params.id}`);
			});
	};

	return (
		<Container>
			<h1>Edit User Details:</h1>
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
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
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
				{userInfo.isAdmin && (
					<Form.Group>
						<Form.Label>
							Admin:
							<Form.Check
								type="checkbox"
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							/>
						</Form.Label>
					</Form.Group>
				)}
				<Button type="submit" value="Submit">
					Edit User Details
				</Button>
			</Form>
		</Container>
	);
};

export default UserEditView;
