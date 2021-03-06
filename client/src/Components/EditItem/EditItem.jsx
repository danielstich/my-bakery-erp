import React from 'react';
import './EditItem.scss';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import closeIcon from '../../Assets/Icons/close_black_24dp.svg';
import deleteIcon from '../../Assets/Icons/delete.svg';

export default function EditItem(props) {
    const { type, onChangeHandler, onSubmitHandler, deleteItem, hideModal, item } = props;

    const submitItem = item.id ? ((event) => {onSubmitHandler(event, item.id)}) : onSubmitHandler;
    const numField = type === 'item' ? 'qty' : 'amount';
    const label = type === 'item' ? 'Quantity' : 'Amount';

    return (
        <div className='EditItem'>
            <h1 className='EditItem__Title'>{item.name ? item.name : 'Add Item'}:</h1>
            <form 
                className='EditItem__Form' 
                onSubmit={submitItem}>
                <InputField 
                    label='Item Name'
                    type='text'
                    name='name'
                    id='name'
                    value={item ? item.name : ''}
                    placeholder='Item Name'
                    onChangeHandler={onChangeHandler}
                    />
                <InputField 
                    label={label}
                    type='number'
                    name={numField}
                    id={numField}
                    value={type === 'item' ? item.qty : item.amount}
                    placeholder={label}
                    onChangeHandler={onChangeHandler}
                    />
                <InputField 
                    label='Unit'
                    type='text'
                    name='unit'
                    id='unit'
                    value={item ? item.unit : ''}
                    placeholder='Unit'
                    onChangeHandler={onChangeHandler}
                    />
                <Button extraClasses='Button--EditItem' type="submit" label={item.id ? 'Edit Item' : 'Add Item'}/>
                <div className='EditItem__Icon-Container'>
                    <img className='EditItem__Icon' onClick={hideModal} src={closeIcon} alt="" />      
                    {item.id ? <img className='EditItem__Icon' src={deleteIcon} alt='delete' onClick={() => deleteItem(item.id)} /> : <></>}
                </div>
            </form>
        </div>
    )
}
