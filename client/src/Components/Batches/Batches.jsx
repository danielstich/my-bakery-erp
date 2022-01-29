import { Component } from 'react';
import axios from 'axios';
import './Batches.scss'
import deleteIcon from '../../Assets/Icons/delete.svg';
import addIcon from '../../Assets/Icons/add.svg';
import BatchModal from '../BatchModal/BatchModal';

export default class Batches extends Component {
    state = {
        isLoading: true,
        batches: [],
        recipes: [],
        currentRecipe: {},
        currentBatch: {},
        showAddModal: false,
        API_URL: process.env.REACT_APP_API_URL,
        options: {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    }

    componentDidMount() {
        this.getBatches();
    }

    responseHandler = promise => {
        promise
            .then(response => {
                this.getBatches();
                this.hideModal();
                return;
            })
            .catch(error => {
                console.log(error.message, error.response);
                return;
            })
    }

    getBatches = () => {
        const { API_URL, options } = this.state;
        axios.get(`${API_URL}/batches`, options)
            .then(response => {
                const batches = response.data.Batches.sort((a,b) => {
                    if (a.date > b.date) return -1;
                    if (a.date < b.date) return 1;
                    return 0;
                });
                this.setState({
                    batches,
                    currentBatch: {...batches[0]}
                })
                return axios.get(`${API_URL}/recipes`, options);
            })
            .then(response => {
                const recipes = response.data.recipes;
                const currentRecipe = recipes.find(recipe => recipe.id === this.state.currentBatch.recipe_id);
                this.setState({
                    isLoading: false,
                    recipes,
                    currentRecipe: {...currentRecipe}
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    onSubmitBatch = (event) => {
        event.preventDefault();
        const { API_URL, options } = this.state;
        const newBatch = {...this.state.currentBatch};
        newBatch.recipe_id = this.state.currentRecipe.id;
        const promise = axios.post(`${API_URL}/batches`, newBatch, options);
        this.responseHandler(promise);
    }

    deleteBatch = (id) => {
        const { API_URL, options } = this.state;
        const promise = axios.delete(`${API_URL}/batches/${id}`, options)
        this.responseHandler(promise);
    }

    addModal = () => {
        this.setState({
            showAddModal: true,
            currentBatch: {
                name: '',
                date: null,
                qty: null,
            }
        })
    }

    hideModal = () => {
        let newState = {
            showAddModal: false
        };
        this.setState(newState)
    }

    onChangeHandler = (event) => {
        const { name, value } = event.target;
        const batch = {...this.state.currentBatch};
        batch[name] = value;
        this.setState({currentBatch :batch})
    }

    onRecipeChangeHandler = (event) => {
        const recipeID = parseInt(event.target.value);
        const recipe = this.state.recipes.find(recipe => recipe.id === recipeID);
        const batch = {...this.state.currentBatch};
        batch.name = recipe.name;
        this.setState({
            currentRecipe: recipe,
            currentBatch: batch
        })
    }

    renderModal = (type) => {
        return (
            <BatchModal
            type={type}
            onRecipeChangeHandler={this.onRecipeChangeHandler}
            recipes={this.state.recipes}
            recipe={this.state.currentRecipe}
            onChangeHandler={this.onChangeHandler}
            onSubmitBatch={this.onSubmitBatch}
            hideModal={this.hideModal}
            />
        )
    }

    render() {
        if (this.state.isLoading) return <></>;
        return (
        <div className='Batches'>
            <div className='Batches__Header'>
                <h1 className='Batches__Title'>Batches</h1>
                <img onClick={this.addModal} className='Batches__Add-Icon' src={addIcon} alt="add button" />
                {this.state.showAddModal && this.renderModal('add')}
            </div>
            <div className='Batches__List'>
                {!this.state.isLoading && this.state.batches.map(batch => {
                    return (
                        <div className='Batch' key={batch.id}>
                            <div className='Batch__Container'>
                                <p className='Batch__Date'>{(new Date(batch.date)).toDateString()}</p>
                                <p className='Batch__Title'>{batch.name} made:</p>
                            </div>
                            <p className='Batch__Body'>{batch.qty.toString().padStart(3, '0')}</p>
                            <img onClick={() => this.deleteBatch(batch.id)} className='Batch__Icon Batch__Icon--delete' src={deleteIcon} alt="" />                            
                        </div>
                    )
                })}
            </div>
        </div>
        );
    }
}
