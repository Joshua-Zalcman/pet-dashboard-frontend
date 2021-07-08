import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, Button, Card, Row, Col } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';

const PetsView = ({ URL }) => {
	const { userInfo } = useContext(GlobalContext);
	const [petData, setPetData] = useState([]);

	useEffect(() => {
		axios.get(`${URL}/pets`).then((res) => {
			setPetData(res.data.pets);
		});
	}, []);

	return (
		<Container fluid>
			<Link to="/pets/new">
				<Button>Add New Pet Post</Button>
			</Link>

			{!petData ? (
				'Loading...'
			) : (
				<Row>
					{petData.map((pet) => (
						<Col className="m-auto" sm={8} md={4} lg={3} key={pet._id}>
							<Card>
								<Link to={`/pets/${pet._id}`}>
									<Card.Img variant="top" src={pet.img} alt={pet.name} />
								</Link>
								<Card.Body>
									<Card.Title>Name: {pet.name}</Card.Title>
									<p>{pet.type}</p>
									<p>Age: {pet.age}</p>
									<p>Description: {pet.description}</p>
									<p>Healthy: {pet.isHealthy ? 'Yes' : 'No'}</p>
									<p>
										Available For: {pet.forAdoption ? 'Adoption' : ''}/
										{pet.forFoster ? 'Foster' : ''}
									</p>
									{/* //conditional for seeing creator contact info */}
									<Link to={`/pets/${pet._id}`}>
										<Button>See More</Button>
									</Link>
								</Card.Body>
								{/* conditional delete and edit buttons */}
							</Card>
						</Col>
					))}
				</Row>
			)}
		</Container>
	);
};

export default PetsView;
