import React, { Component } from 'react';
import './RecipeModal.scss';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import closeIcon from '../../Assets/Icons/close_black_24dp.svg';
import deleteIcon from '../../Assets/Icons/delete.svg';

export default class RecipeModal extends Component {
    state = {
        isEdit: true
    }

    renderInput = () => {
        const { recipe, onChangeHandler, onSubmitHandler, hideModal, deleteRecipe } = this.props;
        const submitRecipe = recipe.id ? ((event) => {onSubmitHandler(event, recipe.id)}) : onSubmitHandler;

        return (
            <form 
                className='Recipe-Modal__Form'
                onSubmit={submitRecipe}>
                <InputField 
                    label='Recipe Name'
                    type='text'
                    name='name'
                    id='name'
                    value={recipe ? recipe.name : ''}
                    placeholder='Recipe Name'
                    onChangeHandler={onChangeHandler}
                />
                <InputField 
                    label='Recipe Description'
                    type='text'
                    name='description'
                    id='description'
                    value={recipe ? recipe.description : ''}
                    placeholder='Recipe Description'
                    onChangeHandler={onChangeHandler}
                />
                <Button extraClasses='Button--EditItem' type="submit" label={recipe.id ? 'Edit Item' : 'Add Item'}/>
                <div className='Recipe-Modal__Icon-Container'>
                    <img className='Recipe-Modal__Icon' onClick={hideModal} src={closeIcon} alt="" />      
                    {recipe.id ? <img className='Recipe-Modal__Icon' src={deleteIcon} alt='delete' onClick={() => deleteRecipe(recipe.id)} /> : <></>}
                </div>
            </form>
        )
    }
    render() {
        
        return (
            <div className='Recipe-Modal'>
                {this.renderInput()}
            </div>
        )
    }
}
