import React from 'react';
import './EditItem.scss';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import closeIcon from '../../Assets/Icons/close_black_24dp.svg'

export default function EditItem(props) {
    const { onChangeHandler, onSubmitHandler, hideModal, item } = props;
    return (
        <div className='EditItem'>
            <form 
                className='EditItem__Form' 
                onSubmit={item ? (event) => {onSubmitHandler(event, item.id)} : onSubmitHandler}>
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
                    label='Quantity'
                    type='text'
                    name='qty'
                    id='qty'
                    value={item ? item.qty : ''}
                    placeholder='Quantity'
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
                <Button extraClasses='Button--EditItem' type="submit" label="Add"/>
                <img className='EditItem__Icon' onClick={hideModal} src={closeIcon} alt="" />      
            </form>
        </div>
    )
}
