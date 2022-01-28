import React from 'react';
import './Item.scss'
import editIcon from '../../Assets/Icons/edit.svg';
import deleteIcon from '../../Assets/Icons/delete.svg';

export default function Item(props) {
    const { item, editModal, deleteItem } = props
    item.qty = item.qty ? item.qty : item.amount;
    return (
    <div key={item.id} className='Item'>
        <h3 className='Item__Title'>{item.name}</h3>
        <p className='Item__Body'>{item.qty} {item.unit}</p>
        <img onClick={() => editModal(item.id)} className='Item__Icon Item__Icon--edit' src={editIcon} alt="" />
        <img onClick={() => deleteItem(item.id)} className='Item__Icon' src={deleteIcon} alt="" />
    </div>
    );
}
