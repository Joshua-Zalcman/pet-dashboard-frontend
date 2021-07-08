import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';

const UserView = ({ match, history, URL }) => {
	const { userInfo, checkForToken } = useContext(GlobalContext);
	const [userData, setUserData] = useState('');
	const [petData, setPetData] = useState('');

	useEffect(() => {
		axios.get(`${URL}/users/${match.params.id}`).then((res) => {
			setUserData(res.data.user);
			if (res.data.pets) {
				setPetData(res.data.pets);
			}
		});
	}, []);

	const handleDelete = () => {
		axios.delete(`${URL}/users/${match.params.id}`).then((res) => {
			history.push('/users');
		});
	};

	const handleEdit = () => {
		history.push(`/users/${match.params.id}/edit`);
	};

	return (
		<Container>
			<div>
				{!userData ? (
					'Loading...'
				) : (
					<article>
						<p>Name: {userData.name}</p>
						<p>Email: {userData.email}</p>
						<p>Phone Number: {userData.phoneNumber}</p>
						<p>City: {userData.city}</p>
						<p>{userData.name}'s Pet Posts:</p>
						{petData && (
							<ul>
								{petData.map((pet) => (
									<li key={pet._id}>
										<Link to={`/pets/${pet._id}`}>{pet.name}</Link>
									</li>
								))}
							</ul>
						)}
					</article>
				)}
			</div>
			{userInfo._id === userData._id && (
				<Button onClick={handleDelete}>Delete User</Button>
			)}
			{(userInfo.isAdmin || userInfo._id === userData._id) && (
				<Button onClick={handleEdit}>Edit User Profile</Button>
			)}
		</Container>
	);
};

export default UserView;
