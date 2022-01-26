import React from 'react';
import { Link } from 'react-router-dom';
import inventoryIcon from '../../Assets/Icons/inventory_white_24dp.svg';
import recipesIcon from '../../Assets/Icons/recipes.svg';
import kitchenIcon from '../../Assets/Icons/kitchen.svg';
import storeIcon from '../../Assets/Icons/storefront.svg'
import './Toolbar.scss'

export default function Toolbar() {
    return (
        <div className='Toolbar'>
            <Link className='Toolbar__Link' to='/home/inventory'>
                <img className='Toolbar__Icon' src={inventoryIcon} alt="clipboard icon" />
                Inventory
            </Link>
            <Link className='Toolbar__Link' to='/home/inventory'>
                <img className='Toolbar__Icon' src={recipesIcon} alt="clipboard icon" />
                Recipes
            </Link>
            <Link className='Toolbar__Link' to='/home/inventory'>
                <img className='Toolbar__Icon' src={kitchenIcon} alt="clipboard icon" />
                Kitchen
            </Link>
            <Link className='Toolbar__Link' to='/home/inventory'>
            <img className='Toolbar__Icon' src={storeIcon} alt="clipboard icon" />
                Sales
            </Link>
        </div>
    );
}
