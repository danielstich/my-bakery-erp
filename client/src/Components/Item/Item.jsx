import React from 'react';
import './Item.scss'
import editIcon from '../../Assets/Icons/edit.svg';

export default function Item(props) {
    const { item, editModal } = props
    item.qty = item.qty ? item.qty : item.amount;
    return (
    <div key={item.id} onClick={() => this.selectItem(item)} className='Item'>
        <h3 className='Item__Title'>{item.name}</h3>
        <p className='Item__Body'>{item.qty} {item.unit}</p>
        <img onClick={editModal} className='Item__Icon' src={editIcon} alt="" />
    </div>
    );
}
