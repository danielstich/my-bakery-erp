import './Ingredients.scss';
import Item from '../Item/Item';
import addIcon from '../../Assets/Icons/add.svg';
import closeIcon from '../../Assets/Icons/close_black_24dp.svg';
import { Component } from 'react';
import axios from 'axios';
import EditItem from '../EditItem/EditItem';

export default class Ingredients extends Component {
    state = {
        isLoading: true,
        ingredients: [],
        showEdit: false,
        currentIngredient: {
            name: '',
            amount: '',
            unit: ''
        },
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
                    currentIngredient: {...ingredients[0]},
                    isLoading: false
                })
            })
            .catch(error => {
                this.props.alertHandler({type: 'error', error})
                console.log(error.message)
            })
    }

    componentDidMount() {
        this.getIngredients();
    }

    responseHandler = promise => {
        promise
            .then(response => {
                this.props.alertHandler({type: 'success', msg: response.data.success})
                this.getIngredients();
                this.hideModal();
            })
            .catch(error => {
                this.props.alertHandler({type: 'error', msg: error.response.data.error})
                console.log(error.message, error.response)
            })
    }

    submitItem = (event, id) => {
        event.preventDefault();
        const { API_URL, options } = this.state;
        const newIngredient = {...this.state.currentIngredient};
        newIngredient.recipe_id = this.props.recipe.id;
        const promise = id ? 
            axios.put(`${API_URL}/ingredients/${id}`, newIngredient, options) :
            axios.post(`${API_URL}/ingredients`, newIngredient, options)
        this.responseHandler(promise);
    }

    deleteItem = (id) => {
        const { API_URL, options } = this.state;
        const promise = axios.delete(`${API_URL}/ingredients/${id}`, options);
        this.responseHandler(promise);
    }

    addItem = () => {
        this.setState({
            currentIngredient: {
                name: '',
                amount: '',
                unit: ''
            },
            showEdit: true
        })
    }
    
    editItem = (item) => {
        this.setState({
            currentIngredient: {...item},
            showEdit: true
        })
    }

    hideModal = () => {
        this.setState({showEdit: false})
    }

    onChangeHandler = (event) => {
        const { name, value } = event.target;
        const ingredient = {...this.state.currentIngredient};
        ingredient[name] = value;
        this.setState({currentIngredient : ingredient})
    }


    renderIngredients = () => {
        const {ingredients} = this.state;
        return ingredients.map(ingredient => {
            return <Item key={ingredient.id} item={ingredient} editModal={this.editItem} deleteItem={this.deleteItem} />
        })
    }

    renderEdit = () => {
        return <EditItem 
            type='ingredient'
            onChangeHandler={this.onChangeHandler}
            onSubmitHandler={this.submitItem}
            hideModal={this.hideModal}
            item={this.state.currentIngredient}
            deleteItem={this.deleteItem}
        />
    }

    render() {
        const {recipe, hideModal} = this.props;
        if (this.state.isLoading) return <></>;
        return (
            <div className='Ingredients'>
                <div className='Ingredients__Header'>
                    <h1 className='Ingredients__Title'>{recipe.name} Ingredients:</h1>
                    <img onClick={this.addItem} className='Button Button--Add-Icon' src={addIcon} alt="add button" />
                </div>
                <div className='Ingredients__List'>
                    {this.state.showEdit && this.renderEdit()}
                    {this.renderIngredients()}
                </div>
                <img className='Ingredients__Icon' onClick={() => hideModal(recipe)} src={closeIcon} alt="" />      
                <div className='Ingredients__Line'></div>
            </div>
        );
    }
    
}
