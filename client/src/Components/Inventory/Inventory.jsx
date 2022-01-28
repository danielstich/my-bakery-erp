import { Component } from 'react';
import axios from 'axios';
import './Inventory.scss';
import addIcon from '../../Assets/Icons/add.svg';
import EditItem from '../EditItem/EditItem';
import Item from '../Item/Item';

export default class Inventory extends Component {
    state = {
        isLoading: true,
        inventory: [],
        currentItem: {},
        showModal: false,
        API_URL: process.env.REACT_APP_API_URL,
        options: {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    }

    componentDidMount() {
        this.getInventory();
    }

    getInventory = () => {
        const { API_URL, options } = this.state;

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

    responseHandler = promise => {
        promise
            .then(response => {
                console.log(response);
                this.getInventory();
                this.hideModal();
                return;
            })
            .catch(error => {
                console.log(error.message, error.response.data);
                return;
            })
    }

    submitItem = (event, id) => {
        event.preventDefault();
        const { API_URL, options } = this.state;
        const promise = id ? 
            axios.put(`${API_URL}/inventory/${id}`, this.state.currentItem, options) :
            axios.post(`${API_URL}/inventory`, this.state.currentItem, options);
        this.responseHandler(promise);
    }

    deleteItem = (id) => {
        const { API_URL, options } = this.state;
        const promise = axios.delete(`${API_URL}/inventory/${id}`, options);
        this.responseHandler(promise);
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
        const editAddModal = (
            <EditItem 
                        onChangeHandler={this.onChangeHandler} 
                        onSubmitHandler={this.submitItem} 
                        hideModal={this.hideModal} 
                        deleteItem={this.deleteItem}
                        item={this.state.currentItem}/>
        )

        return (
            <div className='Inventory'>
                <div className='Inventory__Modal'>
                    {this.state.showModal ? editAddModal : <></>}
                </div>
                
                <div className='Inventory__Header'>
                    <h1 className='Inventory__Title'>Inventory</h1>
                    <img onClick={this.addModal} className='Inventory__Add-Icon' src={addIcon} alt="add button" />
                </div>
                <div className='Inventory__Items'>
                    {!this.state.isLoading && this.state.inventory.map(item => {
                        return <Item key={item.id} item={item} editModal={this.editModal} />
                    })}
                </div>
                <div className='Inventory__Item'>
                    {this.state.showModal ? editAddModal : 
                        (!this.state.isLoading &&
                        <div><p>Item: {this.state.currentItem.name}</p>
                        <p>Quantity: {this.state.currentItem.qty} {this.state.currentItem.unit}</p></div>)
                    }
                    
                </div>
            </div>
        );
    }
}
