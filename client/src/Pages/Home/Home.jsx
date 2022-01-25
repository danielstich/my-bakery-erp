import './Home.scss'
import { Link, Redirect, Switch } from 'react-router-dom'
import { Component } from 'react';
import axios from 'axios';

import Header from '../../Components/Header/Header';

export default class Home extends Component {
  state = {
    isLoggedIn: false,
    isVerifying: true,
    user: null
  }

  componentDidMount = () => {
    const token = sessionStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:8080/users', {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      })
      .then(response => {
        console.log(response);
        this.setState({
          isLoggedIn: true,
          isVerifying: false,
          user: response.data
        })
      })
      .catch(error => {
        console.log(error)
        this.setState({isVerifying: false})
      })
    } else {
      this.setState({isVerifying: false})
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <Header />
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia quis, doloribus ipsa, optio possimus, distinctio sapiente dicta facere aspernatur a nesciunt numquam esse aut neque delectus impedit harum velit iusto asperiores molestias laudantium modi! Dolorum unde architecto explicabo ut maiores aperiam non excepturi beatae autem vero natus impedit officia libero, ducimus dolorem accusantium quam vitae fuga neque exercitationem illo nemo maxime mollitia. Repellendus, placeat aliquam qui sapiente perspiciatis eius necessitatibus a? Officia temporibus voluptates cum totam quia sed, fuga veritatis hic iure possimus eligendi voluptatibus fugiat optio molestiae repellat, voluptas sapiente eum labore accusantium! Deleniti facere est laboriosam numquam repellendus! Dolores ipsa reiciendis a nostrum, consectetur maxime, recusandae et odio non possimus corrupti temporibus? In omnis nulla, dignissimos et eius quaerat libero distinctio rerum ipsa. Dolorum, illo. Voluptatem quidem quos iusto? Ratione, obcaecati repudiandae. Suscipit id provident placeat dolorum in quisquam error ex. Voluptate distinctio dolorum omnis earum sed itaque, architecto dignissimos incidunt similique nemo accusamus porro impedit voluptas, iste libero qui dolor magnam ratione? Rem saepe adipisci voluptate culpa, tenetur minus magnam? Magnam nesciunt expedita unde blanditiis tenetur nobis quaerat. Et, tempora molestiae, reprehenderit non suscipit beatae alias quisquam placeat eaque id est distinctio vel optio? A laudantium, nam animi dolorum, aliquam minus repudiandae ut eos assumenda ad corrupti blanditiis. Ipsa soluta porro, molestiae laborum quas quidem hic obcaecati eligendi tenetur deleniti, odit ad, impedit ut! Mollitia cum dolore similique magnam sit rerum modi laborum alias nihil officia velit quae ullam, debitis laudantium provident culpa distinctio itaque a earum?
        </div>
          <Switch>
            {/* <Route path={url + '/Inventory'} Component={Inventory} /> */}
            {/* <Route path={url + '/Batches'} Component={Batches} /> */}
            {/* <Route path={url + '/Recipes'} Component={Recipes} /> */} 
          </Switch>
      </div>
    )
  }
}
