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
                <div className='Journals__Item'>
                    <p className='Journals__Text'>{this.dateFormatter(je.date)}</p>
                    <p className='Journals__Text'>{je.account}</p>
                    <p className='Journals__Text'>{je.debit_credit === 'D' ? je.amount: '-'}</p>
                    <p className='Journals__Text'>{je.debit_credit === 'C' ? je.amount: '-'}</p>
                    <p className='Journals__Text'>{balance}</p>
                </div>
            )
        })

        return journalsList;
    }

    render() {
        if (this.state.isLoading) return <></>;
        return (
            <div className='Ledger'>
                <div className='Ledger__Header'>
                    <h1 className='Ledger__Title'>Journal Entries</h1>
                    <img className='Ledger__Add-Icon' src={addIcon} alt="add" />
                </div>

                <div className='Journals'>
                    <div className='Journals__Header'>
                        <p className='Journals__Label'>Date</p>
                        <p className='Journals__Label'>Account</p>
                        <p className='Journals__Label'>Debit</p>
                        <p className='Journals__Label'>Credit</p>
                        <p className='Journals__Label'>Balance</p>
                    </div>
                    {this.renderJournals()}
                </div>
            </div>
        );
    }
}
