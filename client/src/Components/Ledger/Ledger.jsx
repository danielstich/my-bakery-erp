import { Component } from 'react';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';
import BlankTransactionLine from '../BlankTransactionLine/BlankTransactionLine';
import './Ledger.scss';
import addIcon from '../../Assets/Icons/add.svg';
import editIcon from '../../Assets/Icons/edit.svg';
import removeIcon from '../../Assets/Icons/remove.svg';
import doneIcon from '../../Assets/Icons/done.svg';
import closeIcon from '../../Assets/Icons/close_black_24dp.svg'
import deleteIcon from '../../Assets/Icons/delete.svg'
import axios from 'axios';
import { v4 as uuid } from 'uuid';

export default class Ledger extends Component {
    state = {
        isLoading: true,
        isJournalsLoading: true,
        isEdit: false,
        isAdd: false,
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

    componentDidMount () {
        this.getTransactions();
    }

    dateFormatter = (date) => {
        console.log(date.slice(0,10).replace('-', /d/i))
        const newDate = new Date(date);
        const day = newDate.getDate().toString().padStart(2, '0');
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const year = newDate.getFullYear().toString().slice(2);
        return `${month}/${day}/${year}`
    }

    getAccounts() {

    }

    getTransactions() {
        const { API_URL, options } = this.state;
        axios.get(`${API_URL}/transactions`, options)
        
            .then(response => {
                if(response.data.transactions.length === 0) throw new Error ('No transactions found');
                    this.setState({
                        isLoading: false,
                        transactions: response.data.transactions,
                        currentTransaction: {...response.data.transactions[0]},
                        isJournalsLoading: true
                })
            })
            .catch(error => {
                console.log(error)
                this.props.alertHandler({type: 'error', msg: error.message})
                console.log(error)
            })
    }
    
    selectTransaction = (trx) => {
        const { API_URL, options } = this.state;

        axios.get(`${API_URL}/transactions/${trx.id}/ledger`, options)
            .then(response => {
                this.setState({
                    isJournalsLoading: false,
                    journals: [...response.data['journal entries']],
                    currentTransaction: trx,
                    newJournals: [],
                    isEdit: false
                })
            })
    } 

    onJournalChangeHandler = (event, id) => {
        const i = this.state.newJournals.findIndex(je => je.id === id);
        const newJournals = [...this.state.newJournals]
        const { name, value } = event.target;

        if (name === 'debit') {
            newJournals[i]['amount'] = parseFloat(value);
            newJournals[i]['debit_credit'] = 'D';
        } 
        else if (name === 'credit') {
            newJournals[i]['amount'] = parseFloat(value);
            newJournals[i]['debit_credit'] = 'C';
        }
        else {
            newJournals[i][name] = value;
        }
        this.setState({newJournals})
    }

    editJournal = () => {
        const currentTransaction = {...this.state.currentTransaction}
        if (this.state.isEdit) {
            this.setState({
                isEdit: !this.state.isEdit,
                newJournals: [],
            }, this.selectTransaction(currentTransaction))
        }
        if (!this.state.isEdit) {
            this.setState({
                isEdit: !this.state.isEdit,
                newJournals: [],
            })
        }
    }

    showAdd = () => {
        this.setState({
            isAdd: true,
            isJournalsLoading: true,
        })
    }

    hideAdd = () => {
        this.setState({
            isAdd: false
        })
    }

    addLine = () => {
        const newJournals = [...this.state.newJournals];
        newJournals.push({
            date: '',
            account: '',
            debit_credit: '',
            description: '',
            amount: '',
            id: uuid()
        })
        this.setState({newJournals})
    }

    removeNewLine = (id) => {
        const newJournals = this.state.newJournals.filter(je => je.id !== id);
        this.setState({newJournals});
    }

    removeLine = (id) => {
        const journals = this.state.journals.filter(je => je.id !== id);
        this.setState({journals});
    }

    confirmNewLine = (id) => {
        const journal = {...this.state.newJournals.find(je => je.id === id)};
        const journals = [...this.state.journals];
        journals.push(journal);
        const newJournals = this.state.newJournals.filter(je => je.id !== id);
        this.setState({
            journals,
            newJournals
        })
    }

    submitTransaction = (id) => {
        const { API_URL, options } = this.state;

        const journals = this.state.journals.map(je => {
            je.date = je.date.slice(0,10)
            delete je.id;
            delete je.user_id;
            console.log(je)
            return je;
        })

        const transaction = {...this.state.currentTransaction};
        delete transaction.create_at;
        delete transaction.user_id;
        delete transaction.id;
        transaction.date = transaction.date.slice(0, 10)

        console.log(transaction)

        const trx = {transaction, journals}

        axios.post(`${API_URL}/transactions`, trx, options)
            .then(() => {
                return axios.delete(`${API_URL}/transactions/${id}`, options);
            })
            .then(response => {
                this.getTransactions();
                this.props.alertHandler({type: 'success', msg: 'Transaction was Updated'})
            })
            .catch(error => {
                console.log(error.response)
                this.props.alertHandler({type: 'error', msg: error.response.data.error})
            })
    }

    addTransaction = () => {
        const { API_URL, options } = this.state;

        const trx = {transaction: this.state.currentTransaction, journals: this.state.journals}

        axios.post(`${API_URL}/transactions`, trx, options)
            .then(response => {
                this.getTransactions();
                this.props.alertHandler({type: 'success', msg: response.data.success})
            })
            .catch(error => {
                this.props.alertHandler('error', error.response.data.error)
            })
    }

    deleteTransaction = (id) => {
        const { API_URL, options } = this.state;

        axios.delete(`${API_URL}/transactions/${id}`, options)
            .then(response => {
                this.getTransactions();
                console.log(response.data)
                this.props.alertHandler({type: 'success', msg: response.data.success})
            })
            .catch(error => {
                this.props.alertHandler('error', error.response.data.error)
            })
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
                    {this.state.isEdit && <img onClick={() => this.removeLine(je.id)} className='Journal__Remove-Icon' src={removeIcon} alt="" />}
                </div>
            )
        })

        this.state.newJournals.forEach((je, i) => {
            const newLine = <BlankTransactionLine 
                                je={je}
                                onJournalChangeHandler={this.onJournalChangeHandler}
                                removeNewLine={this.removeNewLine}
                                confirmNewLine={this.confirmNewLine} />                
            journalsList.push(newLine)
        })
        

        if (this.state.journals.length === 0) journalsList.push(<BlankTransactionLine 
            je={{
                date: '',
                account: '',
                description: '',
                amount: '',
                id: uuid()
            }}
            onJournalChangeHandler={this.onJournalChangeHandler}
            removeNewLine={this.removeLine}
            confirmNewLine={this.confirmNewLine} />)

        return journalsList;
    }

    renderTransactions = () => {
        return this.state.transactions.map(trx => {

            let text = trx.description.length > 32 ? trx.description.slice(0,28)+"..." : trx.description;
            const className = (trx.id === this.state.currentTransaction.id) && !this.state.isJournalsLoading ? 'Transactions__Item Transactions__Item--Active' : 'Transactions__Item';
            return (
                <div key={trx.id} onClick={() => this.selectTransaction(trx)} className={className}>
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
                        <img onClick={this.showAdd} className='Transactions__Add-Icon' src={addIcon} alt="add" />
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
                {!this.state.isJournalsLoading && 
                <div className='Journal'>
                    <div className='Journal__Header'>
                        <h1 className='Journal__Title'>Transaction Details:</h1>
                        {!this.state.isEdit && <img onClick={this.editJournal} className='Journal__Edit-Icon' src={editIcon} alt="" />}
                        {this.state.isEdit && <img onClick={() => this.submitTransaction(this.state.currentTransaction.id)} className='Journal__Icon Journal__Icon--Submit' src={doneIcon} alt="" />}
                        {this.state.isEdit && <img onClick={() => this.deleteTransaction(this.state.currentTransaction.id)} className='Journal__Icon' src={deleteIcon} alt="" />}
                        {this.state.isEdit && <img onClick={this.editJournal} className='Journal__Icon' src={closeIcon} alt="" />}
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
                </div>}
                {this.state.isAdd && <AddTransactionForm hideAdd={this.hideAdd} />}
            </div>
        );
    }
}
