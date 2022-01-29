import React from 'react';
import './BatchModal.scss';
import AddBatchForm from '../AddBatchForm/AddBatchForm';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import closeIcon from '../../Assets/Icons/close_black_24dp.svg';

export default function BatchModal({ recipes, recipe, onSubmitBatch, onRecipeChangeHandler, onChangeHandler, hideModal, type }) {

    const addBatchForm = 
        <div>
            <form
            className='Add-Batch__Form'
            onSubmit={onSubmitBatch}>
            <h3 className='Add-Batch__Title'>Create Batch</h3>
            <select className='Batch-Modal__Select' onChange={onRecipeChangeHandler}>
                <option className='Batch-Modal__Option' selected value="none" disabled>Please Select a Recipe:</option>
                {recipes.map(recipe => {
                    return <option className='Batch-Modal__Option' onChange={() => onRecipeChangeHandler(recipe)} key={recipe.id} value={recipe.id}>{recipe.name}</option>
                })}
            </select>
            <InputField 
                label='Batch Name'
                type='text'
                name='name'
                id='name'
                placeholder={recipe.name}
                onChangeHandler={onChangeHandler}
            />
            <InputField 
                label='Date'
                type='date'
                name='date'
                id='date'
                onChangeHandler={onChangeHandler}
            />
            <InputField 
                label='Quantity'
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
        </div>
    );
}
