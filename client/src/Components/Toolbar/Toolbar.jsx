import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import inventoryIcon from '../../Assets/Icons/inventory_white_24dp.svg';
import recipesIcon from '../../Assets/Icons/recipes.svg';
import kitchenIcon from '../../Assets/Icons/kitchen.svg';
import storeIcon from '../../Assets/Icons/storefront.svg';
import financeIcon from '../../Assets/Icons/finance.svg';
import receipeIcon from '../../Assets/Icons/receipt.svg';
import ordersIcon from '../../Assets/Icons/orders.svg';
import counterTopIcon from '../../Assets/Icons/countertop_white.svg';
import rightIcon from '../../Assets/Icons/right.svg';
import leftIcon from '../../Assets/Icons/left.svg';

import './Toolbar.scss'

export default function Toolbar() {
    const [ showFinances, setShowFinances ] = useState(false);

    const toggleFinances = () => {
        setShowFinances(!showFinances)
    }

    return (
        <div className='Toolbar__Container'>
            <div className={'Toolbar'}>
                <Link className='Toolbar__Link' to='/home/inventory'>
                    <img className='Toolbar__Icon' src={inventoryIcon} alt="clipboard icon" />
                    Inventory
                </Link>
                <Link className='Toolbar__Link' to='/home/recipes'>
                    <img className='Toolbar__Icon' src={recipesIcon} alt="reciped book" />
                    Recipes
                </Link>
                <Link className='Toolbar__Link' to='/home/batches'>
                    <img className='Toolbar__Icon' src={counterTopIcon} alt="kitchen icon" />
                    Batches
                </Link>
                <Link className='Toolbar__Link' to='/home/ledger'>
                    <img className='Toolbar__Icon' src={financeIcon} alt="kitchen icon" />
                    Ledger
                </Link>
            </div>
        </div>
    )
}
