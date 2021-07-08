import { useContext, useEffect, useState } from 'react';
import { GlobalProvider, GlobalContext } from './context/GlobalState';
import {
	getToken,
	getUserFromToken,
	removeTokenFromStorage,
} from './actions/tokenActions';
import PetsView from './views/PetsView';
import PetView from './views/PetView';
import LoginView from './views/LoginView';
import PetEditView from './views/PetEditView';
import AddPetView from './views/AddPetView';
import UsersView from './views/UsersView';
import UserView from './views/UserView';
import RegisterNewUser from './views/RegisterNewUser';
import UserEditView from './views/UserEditView';
import AboutView from './views/AboutView';
import HomeView from './views/HomeView';
import Header from './components/Header';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

function App() {
	const URL = 'https://pet-dashboard-backend.herokuapp.com';

	const { userInfo, checkForToken } = useContext(GlobalContext);

	const token = getToken();
	let user;

	if (token) {
		user = getUserFromToken();
	}

	return (
		<Router>
			<GlobalProvider>
				<Header />
				<Switch>
					<Route path="/pets" exact>
						<PetsView URL={URL} />
					</Route>
					<Route
						path="/pets/new"
						exact
						render={(props) => {
							if (user) return <AddPetView {...props} URL={URL} />;
							return <Redirect to="/users/login" />;
						}}></Route>
					<Route
						path="/pets/:id/edit"
						exact
						render={(props) => {
							if (user) {
								return <PetEditView URL={URL} {...props} />;
							}
							return <Redirect to="/users/login" />;
						}}></Route>
					<Route
						path="/pets/:id"
						render={(props) => <PetView URL={URL} {...props} />}
					/>

					<Route
						path="/users"
						exact
						render={(props) => {
							if (!user || !user.isAdmin) return <Redirect to="/users/login" />;
							return <UsersView URL={URL} {...props} />;
						}}></Route>
					<Route
						path="/users/login"
						exact
						render={(props) => <LoginView URL={URL} {...props} />}
					/>
					<Route
						path="/users/new"
						exact
						render={(props) => <RegisterNewUser URL={URL} {...props} />}
					/>
					<Route
						path="/users/:id/edit"
						exact
						render={(props) => {
							if (user && (user._id === props.match.params.id || user.isAdmin))
								return <UserEditView URL={URL} {...props} />;
							return <Redirect to="/users/login" />;
						}}></Route>
					<Route
						path="/users/:id"
						render={(props) => {
							if (user) return <UserView URL={URL} {...props} />;
							return <Redirect to="/users/login" />;
						}}></Route>
					<Route path="/about" exact component={AboutView}></Route>
					<Route path="/" exact component={HomeView}></Route>
				</Switch>
			</GlobalProvider>
		</Router>
	);
}

export default App;
