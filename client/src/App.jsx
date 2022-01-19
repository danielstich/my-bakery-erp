import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './Pages/Home/Home';

function App() {
  return (

    <Router>
      <div className="App">
        My Bakery App
      </div>
      <Switch>
        <Route path='/' exact component={Home}/>
      </Switch>

    </Router>
  );
}

export default App;
