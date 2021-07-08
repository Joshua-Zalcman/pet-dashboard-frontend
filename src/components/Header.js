import { useContext, useEffect } from 'react';
import { Nav, Navbar, NavDropdown, } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalState';


function Header() {
  const { userInfo, checkForToken, logoutUser } = useContext(GlobalContext);
  const history = useHistory();
  useEffect(() => {
    checkForToken();
  }, []);

  const handleLogOut = () => {
    logoutUser();
    history.push('/pets');
  };

  return (
    <>
      <Navbar bg="light" expand="sm" className="px-2">

        <Navbar.Brand ><Link to="/pets">Pet Foster Board</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/pets">Pets</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <NavDropdown title={userInfo.name ? userInfo.name : "Users"} id="basic-nav-dropdown">
              {!userInfo._id ? (<><NavDropdown.Item href="/users/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/users/new">Sign Up</NavDropdown.Item></>) : (<NavDropdown.Item onClick={handleLogOut}>Logout</NavDropdown.Item>)}
              {userInfo.isAdmin && <NavDropdown.Item href="/users">Users</NavDropdown.Item>}
              <NavDropdown.Divider />
              <NavDropdown.Item href={`/users/${userInfo._id}`} >My Profile</NavDropdown.Item>
            </NavDropdown>
          </Nav>

        </Navbar.Collapse>

      </Navbar>
    </>
  );
}

export default Header;