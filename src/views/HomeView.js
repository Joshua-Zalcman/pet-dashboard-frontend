import { Link } from 'react-router-dom';
import { Container, Button } from "react-bootstrap";




const HomeView = () => {



  return (
    <Container>
      <h1>Welcome To Pet Foster Board</h1>
      <p><Link to="/users/login">Login in</Link> or <Link to="/users/new">Sign up</Link> if you are new to the site!</p>

    </Container>

  );
};



export default HomeView;