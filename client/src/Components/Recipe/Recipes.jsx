import { Component } from 'react';
import axios from 'axios';
import './Recipes.scss';
import editIcon from '../../Assets/Icons/edit.svg';
import addIcon from '../../Assets/Icons/add.svg';

export default class Recipes extends Component {
    state = {
        isLoading: false,
        recipes: [],
        currentRecipe: {},
        showModal: false,
        API_URL: process.env.REACT_APP_API_URL,
        options: {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    }

    componentDidMount = () => {
        this.getRecipes();
    }

    getRecipes = () => {
        const recipes = [
            {
                name: 'Loaf Bread',
                description: 'Whole wheat bread, sliced, sold by the loaf',
                id: 1,
                user_id: 1
            },
            {
                name: 'Crescents',
                description: 'Flakey, buttery, golden and delicious',
                id: 2,
                user_id: 1
            },
            {
                name: 'Lemon-Blueberry Scones',
                description: 'One bite of these scones can fill a man\'s belly for a day',
                id: 3,
                user_id: 1
            },
            {
                name: 'Arepas',
                description: 'By 6 and get 1 free for the walk home',
                id: 4,
                user_id: 1
            },

        ]

        this.setState({recipes: recipes});
    }

    selectRecipe = (recipe) => {
        this.setState({recipe: recipe})
    }

    onChangeHandler = (event) => {
        const { name, value } = event.target;
        const recipe = {...this.state.currentRecipe};
        recipe[name] = value;
        this.setState({currentRecipe :recipe})
    }

    hideModal = () => {
        this.setState({showModal: false})
    }

    addModal = () => {
        this.setState({
            showModal: true,
            currentRecipe: {
                name: '',
                description: '',
            }
        })
    }

    editModal = () => {
        this.setState({
            showModal: true
        })
    }
  
    render() {
        // const editAddModal = (
        //     <EditItem 
        //                 onChangeHandler={this.onChangeHandler} 
        //                 onSubmitHandler={this.submitItem} 
        //                 hideModal={this.hideModal} 
        //                 deleteItem={this.deleteItem}
        //                 item={this.state.currentItem}/>
        // )

        return (
            <div className='Recipes'>
                <div className='Recipes__Modal'>

                </div>

                <div className='Recipes__Header'>
                    <h1 className='Recipes__Title'>Recipes</h1>
                    <img onClick={this.addModal} className='Recipes__Add-Icon' src={addIcon} alt="add button" />
                </div>
            </div>
        )
    }
}
