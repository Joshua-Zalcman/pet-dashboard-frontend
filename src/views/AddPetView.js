import { useContext, useState } from 'react';
import { Container, Button, Form } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';

const AddPetView = ({ history, URL }) => {
	const { userInfo } = useContext(GlobalContext);
	const [name, setName] = useState('');
	const [type, setType] = useState('Dog');
	const [img, setImg] = useState('');
	const [age, setAge] = useState('');
	const [description, setDescription] = useState('');
	const [isHealthy, setIsHealthy] = useState(true);
	const [forAdoption, setForAdoption] = useState(true);
	const [forFoster, setForFoster] = useState(true);
	const [createdBy, setCreatedBy] = useState(userInfo._id);

	const handleSubmit = (evt) => {
		evt.preventDefault();
		console.log(createdBy);

		axios
			.post(`${URL}/pets/`, {
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
				console.log(res.data);
				history.push(`/pets/${res.data.pet._id}`);
			});
	};

	return (
		<Container>
			<h1>Add New Pet Post:</h1>
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
				<Form.Group>
					<Form.Label>
						Healthy
						<Form.Check
							checked={isHealthy}
							onChange={(e) => setIsHealthy(e.target.checked)}
						/>
					</Form.Label>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						Adoption:
						<Form.Check
							checked={forAdoption}
							onChange={(e) => setForAdoption(e.target.checked)}
						/>
					</Form.Label>
				</Form.Group>
				<Form.Group>
					<Form.Label>
						Foster:
						<Form.Check
							checked={forFoster}
							onChange={(e) => setForFoster(e.target.checked)}
						/>
					</Form.Label>
				</Form.Group>
				<Button type="submit" value="Submit">
					Submit
				</Button>
			</Form>
		</Container>
	);
};

export default AddPetView;
