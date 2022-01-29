import React, { Component } from 'react';
import './RecipeModal.scss';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import closeIcon from '../../Assets/Icons/close_black_24dp.svg';
import deleteIcon from '../../Assets/Icons/delete.svg';
import Ingredients from '../Ingredients/Ingredients';

export default function RecipeModal({ recipe, onSubmitBatch, onChangeHandler, onChangeBatchHandler, onSubmitHandler, hideModal, deleteRecipe, type }) {
    
    const renderIngredients = () => {
        return (
            <Ingredients hideModal={hideModal} recipe={recipe} />
        )
    }

    const renderBatchInput = () => {
        return (
            <form
                className='Recipe-Modal__Form'
                onSubmit={onSubmitBatch}>
                <h3 className='Recipe-Modal__Title'>Create Batch</h3>
                <InputField 
                    label='Batch Name'
                    type='text'
                    name='name'
                    id='name'
                    placeholder={recipe.name}
                    onChangeHandler={onChangeBatchHandler}
                />
                <InputField 
                    label='Date'
                    type='date'
                    name='date'
                    id='date'
                    onChangeHandler={onChangeBatchHandler}
                />
                <InputField 
                    label='Quantity'
                    type='number'
                    name='qty'
                    id='qty'
                    placeholder='Quantity'
                    onChangeHandler={onChangeBatchHandler}
                />
                <Button extraClasses='Button--EditItem' type='submit' label='Create Batch' />
                <div className='Recipe-Modal__Icon-Container'>
                    <img className='Recipe-Modal__Icon' onClick={() => hideModal(recipe)} src={closeIcon} alt="" />
                </div>
                <div className='Recipe-Modal__Line'></div>
            </form>
        )
    }

    const renderInput = () => {
        const submitRecipe = recipe.id ? ((event) => {onSubmitHandler(event, recipe.id)}) : onSubmitHandler;

        return (
            <form 
                className='Recipe-Modal__Form'
                onSubmit={submitRecipe}>
                <h3 className='Recipe-Modal__Title'>{recipe.id ? 'Edit' : 'Add'}</h3>
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
                    <img className='Recipe-Modal__Icon' onClick={() => hideModal(recipe)} src={closeIcon} alt="" />      
                    {recipe.id ? <img className='Recipe-Modal__Icon' src={deleteIcon} alt='delete' onClick={() => deleteRecipe(recipe.id)} /> : <></>}
                </div>
                <div className='Recipe-Modal__Line'></div>
            </form>
        )
    }
    return (
        <div className='Recipe-Modal'>
            {(type === 'ingredients') && renderIngredients()}
            {(type === 'add') && renderInput()}
            {(type === 'edit') && renderInput()}
            {(type === 'batch') && renderBatchInput()}
        </div>
    )
    
}
