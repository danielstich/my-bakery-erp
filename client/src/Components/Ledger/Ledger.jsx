import { Component } from 'react';
import './Ledger.scss';
import addIcon from '../../Assets/Icons/add.svg';
import axios from 'axios';

export default class Ledger extends Component {
    state = {
        isLoading: true,
        journals: [],
        accounts: [],
        currentJournal: {},
        API_URL: process.env.REACT_APP_API_URL,
        options: {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }
    }

    dateFormatter = (date) => {
        const newDate = new Date(date);
        const day = newDate.getDate().toString().padStart(2, '0');
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const year = newDate.getFullYear();
        return `${month}/${day}/${year}`
    }


    componentDidMount () {
        const { API_URL, options } = this.state;
        axios.get(`${API_URL}/transactions/ledger`, options)
            .then(response => {
                this.setState({
                    isLoading: false,
                    journals: response.data['journal entries'],
                    currentJournal: {...response.data['journal entries'][0]}
                })
            })
            .catch(error => {
                console.log(error)
                this.props.alertHandler({type: 'error', error})
                console.log(error.message)
            })
    }

    renderJournals = () => {
        let balance = 0;
        const journalsList = this.state.journals.map(je => {
            
            if (je.debit_credit === 'D') balance += je.amount;
            if (je.debit_credit === 'C') balance -= je.amount;
            
            return (
                <div key={je.id}className='Entries__Item'>
                    <p className='Entries__Text'>{this.dateFormatter(je.date)}</p>
                    <p className='Entries__Text'>{je.account}</p>
                    <p className='Entries__Text'>{je.description}</p>
                    <p className='Entries__Text Entries__Text--Number'>{je.debit_credit === 'D' ? je.amount.toFixed(2): '-'}</p>
                    <p className='Entries__Text Entries__Text--Number'>{je.debit_credit === 'C' ? je.amount.toFixed(2): '-'}</p>
                    <p className='Entries__Text Entries__Text--Number'>{balance === 0 ? '-' : balance.toFixed(2)}</p>
                </div>
            )
        })

        return journalsList;
    }

    render() {
        if (this.state.isLoading) return <></>;
        return (
            <div className='Ledger'>
                <div className='Transactions'>
                    <div className='Transactions__Header'>
                        <h1 className='Transactions__Title'>Transactions</h1>
                        <img className='Transactions__Add-Icon' src={addIcon} alt="add" />
                    </div>
                </div>
                <div className='Journal'>
                    <div className='Journal__Header'>
                        <h1 className='Journal__Title'>Journal Entries</h1>
                    </div>

                    <div className='Entries'>
                        <div className='Entries__Header'>
                            <p className='Entries__Label'>Date</p>
                            <p className='Entries__Label'>Account</p>
                            <p className='Entries__Label'>Description</p>
                            <p className='Entries__Label Entries__Label--Number'>Debit</p>
                            <p className='Entries__Label Entries__Label--Number'>Credit</p>
                            <p className='Entries__Label Entries__Label--Number'>Balance</p>
                        </div>
                        {this.renderJournals()}
                        {this.renderJournals()}
                        {this.renderJournals()}
                        {this.renderJournals()}
                    </div>
                </div>
            </div>
        );
    }
}
