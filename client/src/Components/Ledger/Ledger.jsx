import { Component } from 'react';
import './Ledger.scss';
import addIcon from '../../Assets/Icons/add.svg';
import editIcon from '../../Assets/Icons/edit.svg';
import removeIcon from '../../Assets/Icons/remove.svg';
import doneIcon from '../../Assets/Icons/done.svg';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

export default class Ledger extends Component {
    state = {
        isLoading: true,
        isEdit: false,
        transactions: [],
        journals: [],
        newJournals: [],
        accounts: [],
        currentTransaction: {},
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
        const year = newDate.getFullYear().toString().slice(2);
        return `${month}/${day}/${year}`
    }


    componentDidMount () {
        const { API_URL, options } = this.state;
        axios.get(`${API_URL}/transactions`, options)
        
            .then(response => {
                if(response.data.transactions.length === 0) throw new Error ('No transactions found');
                const id = response.data.transactions[0].id;
                    this.setState({
                        transactions: response.data.transactions,
                        currentTransaction: {...response.data.transactions[0]}
                    
                })
                return axios.get(`${API_URL}/transactions/${id}/ledger`, options)
            })
            .then(response => {
                this.setState({
                    journals: [...response.data['journal entries']],
                    isLoading: false,
                })
            })
            .catch(error => {
                console.log(error)
                this.props.alertHandler({type: 'error', error: error})
                console.log(error)
            })
    }
    
    selectTransaction = (trx) => {
        const { API_URL, options } = this.state;

        axios.get(`${API_URL}/transactions/${trx.id}/ledger`, options)
            .then(response => {
                this.setState({
                    journals: [...response.data['journal entries']],
                    currentTransaction: trx,
                    newJournals: []
                })
            })
    } 

    onJournalChangeHandler = (event, id) => {
        const i = this.state.newJournals.findIndex(je => je.id === id);
        const newJournals = [...this.state.newJournals]
        const { name, value } = event.target;
        console.log(i, id, newJournals[i])
        newJournals[i][name] = value;
        this.setState({newJournals})
    }

    editJournal = () => {
        this.setState({
            isEdit: !this.state.isEdit,
            newJournals: []
        })
    }

    addLine = () => {
        const newJournals = [...this.state.newJournals];
        newJournals.push({
            date: null,
            account: '',
            description: '',
            amount: null,
            id: uuid()
        })
        this.setState({newJournals})
    }
    removeNewLine = (id) => {
        const newJournals = this.state.newJournals.filter(je => je.id !== id);
        this.setState({newJournals});
    }
    confirmNewLine = (id) => {
        // add je to array
        const journal = {...this.state.newJournals.find(je => je.id === id)};
        const journals = [...this.state.journals];
        journals.push(journal);
        const newJournals = this.state.newJournals.filter(je => je.id !== id);
        this.setState({
            journals,
            newJournals
        })
    }

    submitTransaction = () => {
        // add
        // delete
    }

    addTransaction = (trx) => {
        // axios post
    }

    deleteTransaction = (id) => {
        // axios delete
    }

    renderNewLine = () => {

    }

    renderJournals = () => {
        let balance = 0;
        const journalsList = this.state.journals.map(je => {
            
            if (je.debit_credit === 'D') balance += je.amount;
            if (je.debit_credit === 'C') balance -= je.amount;
            
            return (
                <div key={je.id}className='Journal__Item'>
                    <p className='Journal__Text'>{this.dateFormatter(je.date)}</p>
                    <p className='Journal__Text'>{je.account}</p>
                    <p className='Journal__Text Journal__Text--Description' >{je.description}</p>
                    <p className='Journal__Text Journal__Text--Number'>{je.debit_credit === 'D' ? je.amount.toFixed(2): '-'}</p>
                    <p className='Journal__Text Journal__Text--Number'>{je.debit_credit === 'C' ? je.amount.toFixed(2): '-'}</p>
                    <p className='Journal__Text Journal__Text--Balance'>{balance === 0 ? '-' : balance.toFixed(2)}</p>
                    {this.state.isEdit && <img className='Journal__Remove-Icon' src={removeIcon} alt="" />}
                </div>
            )
        })

        if (this.state.newJournals) {
            this.state.newJournals.forEach((je, i) => {
                journalsList.push((
                    <div key={i}className='Journal__Item Journal__Item--Input'>
                        <input 
                            type='date'
                            name='date'
                            value={je.date}
                            onChange={(event) => this.onJournalChangeHandler(event, je.id)}
                            className='Journal__Input'/>
                        <input 
                            type='text'
                            name='account'
                            value={je.account}
                            onChange={(event) => this.onJournalChangeHandler(event, je.id)}
                            placeholder='Account'
                            className='Journal__Input'/>
                        <input 
                            type='text'
                            name='description'
                            placeholder='Description'
                            value={je.description}
                            onChange={(event) => this.onJournalChangeHandler(event, je.id)}
                            className='Journal__Input Journal__Input--Description'/>
                        <input 
                            type='number'
                            name='debit'
                            placeholder='0'
                            value={je.debit_credit === 'D' ? je.amount : null}
                            onChange={(event) => this.onJournalChangeHandler(event, je.id)}
                            min='0'
                            className='Journal__Input'/>
                        <input 
                            type='number'
                            name='credit'
                            placeholder='0'
                            value={je.debit_credit === 'C' ? je.amount : null}
                            onChange={(event) => this.onJournalChangeHandler(event, je.id)}
                            min='0'
                            className='Journal__Input Journal__Input--Credit'/>
                        {this.state.isEdit && <img onClick={() => this.removeNewLine(je.id)} className='Journal__Remove-Icon Journal__Remove-Icon--new' src={removeIcon} alt="" />}
                        {this.state.isEdit && <img onClick={() => this.confirmNewLine(je.id)} className='Journal__Confirm-Icon Journal__Remove-Icon--new' src={doneIcon} alt="" />}
                        <p className='Journal__Input Journal__Input--Balance'></p>
                </div>
                ))
            })
        }

        return journalsList;
    }

    renderTransactions = () => {
        return this.state.transactions.map(trx => {

            let text = trx.description.length > 32 ? trx.description.slice(0,28)+"..." : trx.description;
            return (
                <div key={trx.id} onClick={() => this.selectTransaction(trx)} className='Transactions__Item'>
                    <p className="Transactions__Text">{this.dateFormatter(trx.date)}</p>
                    <p className="Transactions__Text Transactions__Text--Type">{trx.type}</p>
                    <p className="Transactions__Text Transactions__Text--Description">{text}</p>
                </div>
            )
        })
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
                    <div className='Transactions__List'>
                        <div className='Transactions__List-Header'>
                            <p className='Transactions__Label'>Date</p>
                            <p className='Transactions__Label Transactions__Label--Type'>Type</p>
                            <p className='Transactions__Label Transactions__Label--Description'>Description</p>
                        </div>
                    {this.renderTransactions()}
                    </div>
                </div>
                <div className='Journal'>
                    <div className='Journal__Header'>
                        <h1 className='Journal__Title'>Transaction Details:</h1>
                        <img onClick={this.editJournal} className='Journal__Edit-Icon' src={editIcon} alt="" />
                        <p className='Journal__Label Journal__Label--Header'>Date: {this.dateFormatter(this.state.currentTransaction.date)}</p>
                        <p className='Journal__Label Journal__Label--Header'>Type: {this.state.currentTransaction.type}</p>
                        <p className='Journal__Label Journal__Label--Header'>Description:</p>
                        <p className='Journal__Text Journal__Text--Header'>{this.state.currentTransaction.description}</p>
                    </div>

                    <div className='Journal__List'>
                        <div className='Journal__List-Header'>
                            <p className='Journal__Label'>Date</p>
                            <p className='Journal__Label'>Account</p>
                            <p className='Journal__Label Journal__Label--Description'>Description</p>
                            <p className='Journal__Label Journal__Label--Number'>Debit</p>
                            <p className='Journal__Label Journal__Label--Number'>Credit</p>
                            <p className='Journal__Label Journal__Label--Balance'>Balance</p>
                        </div>
                        {this.renderJournals()}
                    </div>
                        {this.state.isEdit && <img onClick={this.addLine} className='Journal__Add-Icon' src={addIcon} alt='add'/>}
                </div>
            </div>
        );
    }
}
