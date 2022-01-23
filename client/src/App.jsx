import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Styles from './Pages/Styles/Styles';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';

function App() {
  return (

    <Router>
      <div className="App">
        My Bakery App
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/Styles' exact component={Styles}/>
        <Route path='/Signup' exact component={Signup}/>
        <Route path='/Login' exact component={Login} />
      </Switch>
      </div>

    </Router>
  );
}

export default App;
