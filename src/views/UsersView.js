import { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { GlobalContext } from '../context/GlobalState';
import axios from 'axios';

const UsersView = ({ URL }) => {
	const [data, setData] = useState([]);
	const { userInfo } = useContext(GlobalContext);

	const history = useHistory();

	useEffect(() => {
		axios.get(`${URL}/users`).then((res) => {
			setData(res.data.users);
		});
	}, []);

	return (
		<Container>
			<div>
				{!data ? (
					'Loading...'
				) : (
					<ul>
						{data.map((user) => (
							<li key={user._id}>
								<Link to={`/users/${user._id}`}>
									{user.name} {user.isAdmin && '(Admin)'}
								</Link>
							</li>
						))}
					</ul>
				)}
			</div>
		</Container>
	);
};

export default UsersView;
