import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Button, Card } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';

const PetView = ({ match, history, URL }) => {
	const { userInfo } = useContext(GlobalContext);
	const [petData, setPetData] = useState({});
	const [user, setUser] = useState({});

	useEffect(() => {
		axios.get(`${URL}/pets/${match.params.id}`).then((res) => {
			setPetData(res.data.pet);
			setUser(res.data.user);
		});
	}, []);

	// const handleCheck = () => {
	//   console.log(user);
	// };

	const handleDelete = () => {
		axios.delete(`${URL}/pets/${match.params.id}`).then((res) => {
			history.push('/pets');
		});
	};

	const handleEdit = () => {
		history.push(`/pets/${match.params.id}/edit`);
	};

	return (
		<Container>
			<Link to="/pets">
				<Button>Go back</Button>
			</Link>
			{!petData ? (
				'Loading...'
			) : (
				<Card>
					<Card.Img variant="top" src={petData.img} alt={petData.name} />
					<Card.Body>
						<Card.Title>Name: {petData.name}</Card.Title>
						<p>{petData.type}</p>
						<p>Age: {petData.age}</p>
						<p>Location: {user.city}</p>
						<p>Description: {petData.description}</p>
						<p>Healthy: {petData.isHealthy ? 'Yes' : 'No'}</p>
						<p>
							Available For: {petData.forAdoption ? 'Adoption' : ''}/
							{petData.forFoster ? 'Foster' : ''}
						</p>
						{!userInfo._id ? (
							<p>Login to see Contact info</p>
						) : (
							<p>
								Contact: <Link to={`/users/${user._id}`}>{user.name}</Link>{' '}
							</p>
						)}
						{/* conditional delete and edit buttons */}

						{userInfo._id === user._id && (
							<Button onClick={handleEdit}>Edit</Button>
						)}
						{userInfo._id === user._id && (
							<Button onClick={handleDelete}>Delete</Button>
						)}
					</Card.Body>
				</Card>
			)}
		</Container>
	);
};

export default PetView;
