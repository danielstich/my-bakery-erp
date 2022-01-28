import './Ingredients.scss';
import Item from '../Item/Item';
import addIcon from '../../Assets/Icons/add.svg';
import closeIcon from '../../Assets/Icons/close_black_24dp.svg';
import { Component } from 'react';
import axios from 'axios';

export default class Ingredients extends Component {
    state = {
        isLoading: true,
        ingredients: [],
        currentIngredient: {},
        API_URL: process.env.REACT_APP_API_URL,
        options: {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    }

    getIngredients = () => {
        const { API_URL, options } = this.state;
        const id = this.props.recipe.id;
            axios.get(`${API_URL}/ingredients?recipeID=${id}`, options)
            .then(response => {
                const ingredients = response.data.ingredients;
                this.setState({
                    ingredients: ingredients,
                    isLoading: false
                })
            })
    }

    componentDidMount() {
        this.getIngredients();
    }

    deleteItem = (id) => {
        console.log(id);
        const { API_URL, options } = this.state;
        axios.delete(`${API_URL}/ingredients/${id}`, options)
            .then(response => {
                console.log(response);
                this.getIngredients();
            })
            .catch(error => {
                console.log(error)
            })
    }

    editItem = (id) => {
        console.log(id);
    }

    renderIngredients = () => {
        const {ingredients} = this.state;
        return ingredients.map(ingredient => {
            return <Item key={ingredient.id} item={ingredient} editModal={this.editItem} deleteItem={this.deleteItem} />
        })
    }

    render() {
        const {recipe, hideModal} = this.props;
        if (this.state.isLoading) return <></>;
        return (
            <div className='Ingredients'>
                <div className='Ingredients__Header'>
                    <h1 className='Ingredients__Title'>{recipe.name} Ingredients:</h1>
                    <img onClick={() => {}} className='Button Button--Add-Icon' src={addIcon} alt="add button" />
                </div>
                <div className='Ingredients__List'>
                    {this.renderIngredients()}
                </div>
                <img className='Ingredients__Icon' onClick={() => hideModal(recipe)} src={closeIcon} alt="" />      
                <div className='Ingredients__Line'></div>
            </div>
        );
    }
    
}
