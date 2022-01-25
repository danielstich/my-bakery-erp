import { Component } from 'react';
import axios from 'axios';
import './Inventory.scss';
import editIcon from '../../Assets/Icons/edit.svg';
import addIcon from '../../Assets/Icons/add.svg';
import EditItem from '../EditItem/EditItem';

const API_URL = process.env.REACT_APP_API_URL;

export default class Inventory extends Component {
    state = {
        inventory: [],
        currentItem: {},
        showModal: false
    }

    componentDidMount() {
        console.log(`${API_URL}/inventory`)
        const token = sessionStorage.getItem('token');
        const options = {
            headers: {
              Authorization: `Bearer ${token}`
            }
        }
        axios.get(`${API_URL}/inventory`).then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error.message)
        })

        const inventory = [
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
            }
        ];
        inventory.sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        })
        this.setState({
            inventory: inventory,
            currentItem: inventory[0]
        })
    }

    selectItem = (item) => {
        this.setState({currentItem: item})
    }

    onChangeHandler = (event) => {
        const { name, value} = event.target;
        const item = this.state.currentItem;
        item[name] = value;
        this.setState(item)
    }

    onSubmitHandler = (event, id) => {
        event.preventDefault();
        this.hideModal();
    }

    hideModal = () => {
        this.setState({showModal: false})
    }

    addModal = () => {
        this.setState({
            showModal: true,
            currentItem: {
                name: '',
                qty: '',
                unit: ''
            }
        })
    }

    editModal = () => {
        this.setState({
            showModal: true
        })
    }

    render() {
        return (
            <div className='Inventory'>
                <div className='Inventory__Modal'>
                    {this.state.showModal ? (
                        <EditItem 
                        onChangeHandler={this.onChangeHandler} 
                        onSubmitHandler={this.onSubmitHandler} 
                        hideModal={this.hideModal} 
                        item={this.state.currentItem}/>
                    ): <></>}
                </div>
                
                <div className='Inventory__Header'>
                    <h1 className='Inventory__Title'>Inventory</h1>
                    <img onClick={this.addModal} className='Inventory__Add-Icon' src={addIcon} alt="add button" />
                </div>
                <div className='Inventory__Items'>
                    {this.state.inventory.map(item => {
                        return (
                            <div key={item.id} onClick={() => this.selectItem(item)} className='Item'>
                                <h3 className='Item__Title'>{item.name}</h3>
                                <p className='Item__Body'>{item.qty} {item.unit}</p>
                                <img onClick={this.editModal} className='Item__Icon' src={editIcon} alt="" />
                            </div>
                        )
                    })}
                </div>
                <div className='Inventory__Item'>
                    {this.state.showModal ? <EditItem 
                        onChangeHandler={this.onChangeHandler} 
                        onSubmitHandler={this.onSubmitHandler} 
                        hideModal={this.hideModal} 
                        item={this.state.currentItem}/> : 
                        <div><p>Item: {this.state.currentItem.name}</p>
                        <p>Quantity: {this.state.currentItem.qty} {this.state.currentItem.unit}</p></div>
                        }
                    
                </div>
            </div>
        );
    }
}
