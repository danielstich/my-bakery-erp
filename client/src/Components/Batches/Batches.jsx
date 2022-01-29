import { Component } from 'react';
import axios from 'axios';
import './Batches.scss'

export default class Batches extends Component {
    state = {
        isLoading: true,
        batches: [],
        API_URL: process.env.REACT_APP_API_URL,
        options: {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    }
    getBatches = () => {
        const { API_URL, options } = this.state;
        axios.get(`${API_URL}/batches`, options)
            .then(response => {
                console.log(response.data)
                this.setState({
                    isLoading: false,
                    batches: response.data.Batches
                })
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

    componentDidMount() {
        this.getBatches();
    }
    render() {
        return (
        <div>
            {!this.state.isLoading && this.state.batches.map(batch => {
                return (
                    <div key={batch.id}>
                        <p>{batch.name}</p>
                        <p>{batch.date}</p>
                        <p>{batch.qty}</p>
                    </div>
                )
            })}
        </div>
        );
    }
}
