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
        const { API_URL, options } = this.state;
        axios.get(`${API_URL}/recipes`, options)
            .then(response => {
                this.setState({
                    recipes: response.data.recipes,
                    currentRecipe: response.data.recipes[0] || {},
                    isLoading: false
                })
            })

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
                <div className='Recipes__List'>
                    {!this.state.isLoading && this.state.recipes.map(recipe => {
                        return (
                            <div className='Recipe' key={recipe.id} onClick={() => this.selectRecipe(recipe)}>
                                <div className='Recipe__Label-Container'>
                                    <h3 className='Recipe__Title'>{recipe.name}</h3>
                                    <p className='Recipe__Body'>{recipe.description}</p>
                                </div>
                                <img onClick={this.editModal} className='Recipe__Icon' src={editIcon} alt="" />
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}
