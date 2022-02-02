import React from 'react';
import './Item.scss'
import editIcon from '../../Assets/Icons/edit.svg';
import deleteIcon from '../../Assets/Icons/delete.svg';

export default function Item(props) {
    const { item, editModal, deleteItem } = props;
    return (
    <div key={item.id} className='Item'>
        <h3 className='Item__Title'>{item.name}</h3>
        <p className='Item__Body'>{item.qty ? item.qty.toLocaleString() : item.amount} {item.unit}</p>
        {editModal ? 
        <img onClick={() => editModal(item)} className='Item__Icon Item__Icon--last' src={editIcon} alt="" /> :
        <></>}
        <img onClick={() => deleteItem(item.id)} className={editModal ? 'Item__Icon' : 'Item__Icon Item__Icon--last'} src={deleteIcon} alt="" />
    </div>
    );
}
