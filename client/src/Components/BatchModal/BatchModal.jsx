import React from 'react';
import './BatchModal.scss';
import InputField from '../InputField/InputField';
import IngredientsUsed from '../IngredientsUsed/IngredientsUsed';
import Button from '../Button/Button';
import closeIcon from '../../Assets/Icons/close_black_24dp.svg';

export default function BatchModal({ alertHandler, batch, recipes, recipe, onSubmitBatch, onRecipeChangeHandler, onChangeHandler, hideModal, type }) {

    const renderIngredients = <IngredientsUsed
        alertHandler={alertHandler} 
        hideModal={hideModal} 
        batch={batch} />  

    const addBatchForm = 
        <div>
            <form
            className='Add-Batch__Form'
            onSubmit={onSubmitBatch}>
            <h3 className='Add-Batch__Title'>Create Batch</h3>
            <label className='Input__Label Input__Label--Batch' htmlFor='select-field'>Choose a Recipe</label>
            <select className='Batch-Modal__Select' id='select-field' onChange={onRecipeChangeHandler}>
                <option className='Batch-Modal__Option' selected value="none" disabled>Please Select a Recipe:</option>
                {recipes.map(recipe => {
                    return <option className='Batch-Modal__Option' key={recipe.id} value={recipe.id}>{recipe.name}</option>
                })}
            </select>
            <InputField 
                label='Date'
                type='date'
                name='date'
                id='date'
                onChangeHandler={onChangeHandler}
            />
            <InputField 
                label='Number of Batches'
                type='number'
                name='qty'
                id='qty'
                placeholder='Quantity'
                onChangeHandler={onChangeHandler}
            />
            <Button extraClasses='Button--EditItem' type='submit' label='Create Batch' />
            <div className='Add-Batch__Icon-Container'>
                <img className='Add-Batch__Icon' onClick={() => hideModal(recipe)} src={closeIcon} alt="" />
            </div>
            <div className='Add-Batch__Line'></div>
        </form>
        </div>

    return (
        <div className='Batch-Modal'>
            {type === 'add' && addBatchForm}
            {type === 'ingredients' && renderIngredients}
        </div>
    );
}
