import { useReducer, createContext } from 'react';
import {
	getToken,
	getUserFromToken,
	removeTokenFromStorage,
} from '../actions/tokenActions';
import AppReducer from './AppReducer';

//initial state
const initialState = {
	userInfo: {},
};

//create context
export const GlobalContext = createContext(initialState);

//provider component for all children
export const GlobalProvider = ({ children }) => {
	const [state, dispatch] = useReducer(AppReducer, initialState);

	//actions for reducer
	//login
	function loginUser() {
		const token = getToken();
		if (token) {
			const user = getUserFromToken();
			dispatch({
				type: 'LOGIN_USER',
				payload: user,
			});
		}
	}
	//check for token
	function checkForToken() {
		const token = getToken();
		if (token) {
			const user = getUserFromToken();
			dispatch({
				type: 'CHECK_FOR_USER',
				payload: user,
			});
		}
	}
	//logout
	function logoutUser() {
		removeTokenFromStorage();
		const user = {};
		dispatch({
			type: 'LOGOUT_USER',
			payload: user,
		});
	}

	return (
		<GlobalContext.Provider
			value={{
				userInfo: state.userInfo,
				loginUser,
				checkForToken,
				logoutUser,
			}}>
			{children}
		</GlobalContext.Provider>
	);
};
