import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';

function App() {
  return (
    <Router>
      <div>
        <Routes>
        <Route exact path = "/" element = {<Home></Home>}></Route>
          <Route exact path = "/login" element = {<Login></Login>}></Route>
          <Route exact path = "/signup" element = {<Signup></Signup>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
