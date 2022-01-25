import { Component } from 'react';
import './Inventory.scss';
import editIcon from '../../Assets/Icons/edit.svg';
import addIcon from '../../Assets/Icons/add.svg';

export default class Inventory extends Component {
    state = {
        inventory: []
    }

    componentDidMount() {
        this.setState({
            inventory: [
                {
                    name: 'flour',
                    qty: '5',
                    unit: 'kg',
                    id: '1'
                },
                {
                    name: 'sugar',
                    qty: '2.5',
                    unit: 'kg',
                    id: '2'
                },
                {
                    name: 'milk',
                    qty: '10',
                    unit: 'gallons',
                    id: '3'
                },
                {
                    name: 'eggs',
                    qty: '10',
                    unit: 'dozen',
                    id: '4'
                },
                {
                    name: 'vanilla',
                    qty: '100',
                    unit: 'grams',
                    id: '5'
                },
                {
                    name: 'cinnamon',
                    qty: '50',
                    unit: 'grams',
                    id: '6'
                },
                {
                    name: 'chocolate',
                    qty: '500',
                    unit: 'grams',
                    id: '7'
                },
                {
                    name: 'chocolate',
                    qty: '500',
                    unit: 'grams',
                    id: '7'
                },
                {
                    name: 'chocolate',
                    qty: '500',
                    unit: 'grams',
                    id: '7'
                },
                {
                    name: 'chocolate',
                    qty: '500',
                    unit: 'grams',
                    id: '7'
                },{
                    name: 'chocolate',
                    qty: '500',
                    unit: 'grams',
                    id: '7'
                },
            ]
        })
    }

    render() {
        return (
            <div className='Inventory'>
                <h1 className='Inventory__Title'>Inventory</h1>
                <div className='Inventory__Items'>
                    {this.state.inventory.map(item => {
                        return (
                            <div className='Item'>
                                <h3 className='Item__Title'>{item.name}</h3>
                                <p className='Item__Body'>{item.qty} {item.unit}</p>
                                <img className='Item__Icon' src={editIcon} alt="" />
                            </div>
                        )
                    })}
                <img className='Inventory__Add-Icon' src={addIcon} alt="add button" />
                </div>
            </div>
        );
    }
}
