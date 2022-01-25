import { Component } from 'react';
import axios from 'axios';
import './Inventory.scss';
import editIcon from '../../Assets/Icons/edit.svg';
import addIcon from '../../Assets/Icons/add.svg';
import EditItem from '../EditItem/EditItem';

export default class Inventory extends Component {
    state = {
        isLoading: true,
        inventory: [],
        currentItem: {},
        showModal: false
    }

    componentDidMount() {
        this.getInventory();
    }

    getInventory = () => {
        const API_URL = process.env.REACT_APP_API_URL;
        const token = sessionStorage.getItem('token');
        const options = {
            headers: {
              Authorization: `Bearer ${token}`
            }
        }
        axios.get(`${API_URL}/inventory`, options).then(response => {
            this.setState({
                isLoading: false,
                inventory: response.data.items,
                currentItem: {...response.data.items[0]}
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    submitItem = (event, id) => {
        event.preventDefault();
        const API_URL = process.env.REACT_APP_API_URL;
        const token = sessionStorage.getItem('token');
        const options = {
            headers: {
              Authorization: `Bearer ${token}`
            }
        }

        if (this.state.isEdit && id) {
            axios.put(`${API_URL}/inventory/${id}`, this.state.currentItem, options)
                .then(response => {
                    console.log(response);
                    this.getInventory();
                    return;
                })
                .catch(error => {
                    console.log(error.message);
                    this.hideModal();
                    return;
                })
        } else {
            axios.post(`${API_URL}/inventory`, this.state.currentItem, options)
                .then(response => {
                    console.log(response);
                    this.getInventory();
                })
                .catch(error => {
                    console.log(error.message);
                    this.hideModal();
                    return;
                })
        }
    }

    selectItem = (item) => {
        this.setState({currentItem: item})
    }

    onChangeHandler = (event) => {
        const { name, value } = event.target;
        const item = {...this.state.currentItem};
        item[name] = value;
        this.setState({currentItem :item})
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
                        onSubmitHandler={this.submitItem} 
                        hideModal={this.hideModal} 
                        item={this.state.currentItem}/>
                    ): <></>}
                </div>
                
                <div className='Inventory__Header'>
                    <h1 className='Inventory__Title'>Inventory</h1>
                    <img onClick={this.addModal} className='Inventory__Add-Icon' src={addIcon} alt="add button" />
                </div>
                <div className='Inventory__Items'>
                    {!this.state.isLoading && this.state.inventory.map(item => {
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
                    {this.state.showModal ? 
                        <EditItem 
                        onChangeHandler={this.onChangeHandler} 
                        onSubmitHandler={this.submitItem} 
                        hideModal={this.hideModal} 
                        item={this.state.currentItem}/> 
                        : 
                        (!this.state.isLoading &&
                        <div><p>Item: {this.state.currentItem.name}</p>
                        <p>Quantity: {this.state.currentItem.qty} {this.state.currentItem.unit}</p></div>)
                    }
                    
                </div>
            </div>
        );
    }
}
