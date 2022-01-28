import { Component } from 'react';
import axios from 'axios';
import './Recipes.scss';
import editIcon from '../../Assets/Icons/edit.svg';
import addIcon from '../../Assets/Icons/add.svg';
import listIcon from '../../Assets/Icons/list.svg'
import RecipeModal from '../RecipeModal/RecipeModal';

export default class Recipes extends Component {
    state = {
        isLoading: true,
        recipes: [],
        showEditModal: false,
        showAddModal: false,
        showIngredients: false,
        currentRecipe: {},
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
                    currentRecipe: {...response.data.recipes[0]},
                    isLoading: false
                })
            })
            .catch(error => {
                console.log(error.message)
            })
    }

    responseHandler = promise => {
        promise
            .then(response => {
                this.getRecipes();
                this.hideModal();
                return;
            })
            .catch(error => {
                console.log(error.message, error.response);
                return;
            })
    }

    submitRecipe = (event, id) => {
        event.preventDefault();
        const { API_URL, options } = this.state;

        const promise = id ? 
            axios.put(`${API_URL}/recipes/${id}`, this.state.currentRecipe, options) :
            axios.post(`${API_URL}/recipes`, this.state.currentRecipe, options);
        this.responseHandler(promise);
    }

    deleteRecipe = (id) => {
        const { API_URL, options } = this.state;
        const promise = axios.delete(`${API_URL}/recipes/${id}`, options);
        this.responseHandler(promise);
    }

    onChangeHandler = (event) => {
        const { name, value } = event.target;
        const recipe = {...this.state.currentRecipe};
        recipe[name] = value;
        this.setState({currentRecipe :recipe})
    }

    hideModal = (recipe) => {
        if (!recipe?.name) recipe = {...this.state.prevRecipe}
        let newState = {
            showEditModal: false,
            showAddModal: false,
            showIngredients: false,
            currentRecipe: recipe};
        this.setState(newState)
    }

    addModal = () => {
        const prevRecipe = {...this.state.currentRecipe}
        this.setState({
            showEditModal: false,
            showAddModal: true,
            showIngredients: false,
            prevRecipe,
            currentRecipe: {
                name: '',
                description: '',
            }
        })
    }

    editModal = (recipe) => {
        this.setState({
            currentRecipe: recipe,
            showEditModal: true,
            showAddModal: false,
            showIngredients: false,
        })
    }

    ingredientsModal = (recipe) => {
        this.setState({
            currentRecipe: recipe,
            showEditModal: false,
            showAddModal: false,
            showIngredients: true
        })
    }

    renderModal = (type) => {
        return (
            <RecipeModal 
            type={type}
            onChangeHandler={this.onChangeHandler} 
            onSubmitHandler={this.submitRecipe} 
            hideModal={this.hideModal} 
            deleteRecipe={this.deleteRecipe}
            recipe={this.state.currentRecipe}/>)
    }
  
    render() { 
        if (this.state.isLoading) return <></>;
        return (
            <div className='Recipes'>
                <div className='Recipes__Container'>
                    <div className='Recipes__Header'>
                        <h1 className='Recipes__Title'>Recipes</h1>
                        <img onClick={this.addModal} className='Button Button--Add-Icon' src={addIcon} alt="add button" />
                        {this.state.showAddModal && this.renderModal('add')}
                    </div>
                    <div className='Recipes__List'>
                        {!this.state.isLoading && this.state.recipes.map(recipe => {
                            return (
                                <div className='Recipe' key={recipe.id}>
                                    <div className='Recipe__Label-Container'>
                                        <h3 className='Recipe__Title'>{recipe.name}</h3>
                                        <p className='Recipe__Body'>{recipe.description}</p>
                                    </div>
                                    {this.state.showEditModal && (this.state.currentRecipe.id === recipe.id) && this.renderModal('edit')}
                                    {this.state.showIngredients && (this.state.currentRecipe.id === recipe.id) && this.renderModal('ingredients')}
                                    <img onClick={() => this.editModal(recipe)} className='Recipe__Icon Recipe__Icon--edit' src={editIcon} alt="" />
                                    <img onClick={() => this.ingredientsModal(recipe)} className='Recipe__Icon' src={listIcon} alt="" />
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}
