import { useState, useEffect } from 'react';
import { Form, Button, Container, Row } from 'react-bootstrap';
import axios from 'axios';

const PetEditView = ({ match, history, URL }) => {
	// let token;
	// const [user, setUser] = useState(null);
	const [name, setName] = useState('');
	const [type, setType] = useState('');
	const [img, setImg] = useState('');
	const [age, setAge] = useState('');
	const [description, setDescription] = useState('');
	const [isHealthy, setIsHealthy] = useState(true);
	const [forAdoption, setForAdoption] = useState(true);
	const [forFoster, setForFoster] = useState(true);
	const [createdBy, setCreatedBy] = useState('');

	useEffect(() => {
		//if user has valid token and is the creator of the pet post they can edit
		// token = getToken();
		// if (token) {
		//   const userToken = getUserFromToken();
		//   setUser(userToken);
		//   console.log(user);
		//check if correct user by checking createdBy preoperty of pet
		axios.get(`${URL}/pets/${match.params.id}`).then((res) => {
			const pet = res.data.pet;
			//if (pet.createdBy === user._id) {
			setName(pet.name);
			setType(pet.type);
			setImg(pet.img);
			setAge(pet.age);
			setDescription(pet.description);
			setIsHealthy(pet.isHealthy);
			setForAdoption(pet.forAdoption);
			setForFoster(pet.forFoster);
			setCreatedBy(pet.createdBy);
		});
	}, []);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		axios
			.put(`${URL}/pets/${match.params.id}`, {
				name,
				type,
				img,
				age,
				description,
				isHealthy,
				forAdoption,
				forFoster,
				createdBy,
			})
			.then((res) => {
				history.push(`/pets/${match.params.id}`);
			});
	};

	return (
		<Container>
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
						Type of Pet:
						<Form.Control
							as="select"
							size="md"
							value={type}
							onChange={(e) => setType(e.target.value)}>
							<option value="Dog">Dog</option>
							<option value="Cat">Cat</option>
						</Form.Control>
					</Form.Label>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						Image:
						<Form.Control
							type="text"
							value={img}
							onChange={(e) => setImg(e.target.value)}
						/>
					</Form.Label>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						Age:
						<Form.Control
							type="text"
							value={age}
							onChange={(e) => setAge(e.target.value)}
						/>
					</Form.Label>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						Description:
						<Form.Control
							as="textarea"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						/>
					</Form.Label>
				</Form.Group>
				<Row>
					<Form.Group>
						<Form.Label>
							Healthy
							<Form.Check
								type="checkbox"
								checked={isHealthy}
								onChange={(e) => setIsHealthy(e.target.checked)}
							/>
						</Form.Label>
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Adoption:
							<Form.Check
								type="checkbox"
								checked={forAdoption}
								onChange={(e) => setForAdoption(e.target.checked)}
							/>
						</Form.Label>
					</Form.Group>
					<Form.Group>
						<Form.Label>
							Foster:
							<Form.Check
								type="checkbox"
								checked={forFoster}
								onChange={(e) => setForFoster(e.target.checked)}
							/>
						</Form.Label>
					</Form.Group>
				</Row>
				<Button type="submit" value="Submit">
					Edit Post
				</Button>
			</Form>
		</Container>
	);
};

export default PetEditView;
