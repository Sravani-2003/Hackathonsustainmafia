import './App.css';
import { Container,Nav,Navbar } from 'react-bootstrap';
import {Route,Routes,NavLink} from 'react-router-dom';
import Home from "./components/Home";
import Signup from "./components/Signup";
import Contactus from "./components/Contactus";
import Login from "./components/Login";

function App() {
  return (
    <div>
       <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">Yathin CliQ</Navbar.Brand>
    <Navbar.Toggle/>
    <Navbar.Collapse className='justify-content-evenly'>
      <NavLink classname="nav-link" to="/">Home</NavLink>
      <NavLink classname="nav-link" to="/signup">Signup</NavLink>
      <NavLink classname="nav-link" to="/login">Login</NavLink>
      <NavLink classname="nav-link" to="/contactus">Contactus</NavLink>
    </Navbar.Collapse>
    </Container>
  </Navbar>
  <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/contactus" element={<Contactus/>}/>
  </Routes>
    </div>
  );
}

export default App;
