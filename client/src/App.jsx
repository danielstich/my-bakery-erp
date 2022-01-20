import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Styles from './Pages/Styles/Styles';

function App() {
  return (

    <Router>
      <div className="App">
        My Bakery App
      </div>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/Styles' exact component={Styles}/>
      </Switch>

    </Router>
  );
}

export default App;
