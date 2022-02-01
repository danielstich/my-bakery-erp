import './AddTransactionForm.scss'
import BlankTransactionLine from '../BlankTransactionLine/BlankTransactionLine';
import doneIcon from '../../Assets/Icons/done.svg';
import closeIcon from '../../Assets/Icons/close_black_24dp.svg';
import removeIcon from '../../Assets/Icons/remove.svg';
import addIcon from '../../Assets/Icons/add.svg';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

export default function AddTransactionForm(props) {
    const { hideAdd, API_URL, options, alertHandler } = props;

    const [transaction, setTransaction ] = useState({date: '', description: ''})
    const [journals, setJournals ] = useState([])
    const [newJournals, setNewJournals ] = useState([{
        date: '',
        account: '',
        debit_credit: '',
        description: '',
        amount: '',
        id: uuid()
}])

    const dateFormatter = (date) => {
        const newDate = new Date(date.slice(0,10).replace(/-/g,'/'));
        const day = newDate.getDate().toString().padStart(2, '0');
        const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
        const year = newDate.getFullYear().toString().slice(2);
        return `${month}/${day}/${year}`
        
    }

    const addLine = () => {
        const newJournalsArr = [...newJournals];
        newJournalsArr.push({
            date: '',
            account: '',
            debit_credit: '',
            description: '',
            amount: '',
            id: uuid()
        })
        setNewJournals(newJournalsArr);
    }

    const removeNewLine = (id) => {
        if (newJournals.length === 1 && journals.length === 0) return;
        const newJournalsArr = newJournals.filter(je => je.id !== id);
        setNewJournals(newJournalsArr);
    }

    const removeLine = (id) => {
        const journalsArr = journals.filter(je => je.id !== id);
        let newJournalsArr;
        if (journalsArr.length === 0 && newJournals.length === 0) {
            newJournalsArr = [...newJournals];
            newJournalsArr.push({
                    date: '',
                    account: '',
                    debit_credit: '',
                    description: '',
                    amount: '',
                    id: uuid()
            })
            setJournals(journalsArr)
            setNewJournals(newJournalsArr)
        }
        setJournals(journalsArr)
    }

    const confirmNewLine = (id) => {
        const journalObj = {...newJournals.find(je => je.id === id)};
        const journalsArr = [...journals];
        journalsArr.push(journalObj);
        const newJournalsArr = newJournals.filter(je => je.id !== id);
        setJournals(journalsArr);
        setNewJournals(newJournalsArr);
    }

    const onTransactionChangeHandler = (event) => {
        const { name, value } = event.target;
        const newTransaction = {...transaction};
        newTransaction[name] = value;
        setTransaction(newTransaction);
    }

    const onJournalChangeHandler = (event, id) => {
        const i = newJournals.findIndex(je => je.id === id);
        const newJournalsArr = [...newJournals]
        const { name, value } = event.target;

        if (name === 'debit') {
            newJournalsArr[i]['amount'] = parseFloat(value);
            newJournalsArr[i]['debit_credit'] = 'D';
        } 
        else if (name === 'credit') {
            newJournalsArr[i]['amount'] = parseFloat(value);
            newJournalsArr[i]['debit_credit'] = 'C';
        }
        else {
            newJournalsArr[i][name] = value;
        }
        setNewJournals(newJournalsArr);
    }

    const submitTransaction = () => {
        const journalsArr = journals.map(je => {
            je.date = je.date.slice(0,10)
            delete je.id;
            delete je.user_id;
            return je;
        })

        const trx = {transaction, journals: journalsArr}

        axios.post(`${API_URL}/transactions`, trx, options)
            .then(response => {
                alertHandler({type: 'success', msg: response.data.success})
                hideAdd(true);
            })
            .catch(error => {
                console.log(error)
                alertHandler({type: 'error', msg: error.response.data.error})
            })
    }

    const renderJournals = () => {
        let balance = 0;
        let journalsList = [];
        journalsList = journals.map(je => {
            
            if (je.debit_credit === 'D') balance += je.amount;
            if (je.debit_credit === 'C') balance -= je.amount;
            
            return (
                <div key={je.id}className='Journal__Item'>
                    <p className='Journal__Text'>{dateFormatter(je.date)}</p>
                    <p className='Journal__Text'>{je.account}</p>
                    <p className='Journal__Text Journal__Text--Description' >{je.description}</p>
                    <p className='Journal__Text Journal__Text--Number'>{je.debit_credit === 'D' ? je.amount.toFixed(2): '-'}</p>
                    <p className='Journal__Text Journal__Text--Number'>{je.debit_credit === 'C' ? je.amount.toFixed(2): '-'}</p>
                    <p className='Journal__Text Journal__Text--Balance'>{balance === 0 ? '-' : balance.toFixed(2)}</p>
                    <img onClick={() => removeLine(je.id)} className='Journal__Remove-Icon' src={removeIcon} alt="" />
                </div>
            )
        })

        newJournals.forEach(je => {
            const newLine = <BlankTransactionLine 
                                key={je.id}
                                je={je}
                                onJournalChangeHandler={onJournalChangeHandler}
                                removeNewLine={removeNewLine}
                                confirmNewLine={confirmNewLine} />                
            journalsList.push(newLine)
        })

        return journalsList
    }

    return (
        <div className='Journal'>
                    <div className='Journal__Header'>
                        <h1 className='Journal__Title Journal__Title--Add'>Transaction Details:</h1>
                        <img onClick={submitTransaction} className='Journal__Icon Journal__Icon--Submit' src={doneIcon} alt="" />                        
                        <img onClick={() => hideAdd(false)} className='Journal__Icon' src={closeIcon} alt="" />
                    </div>
                    <div className='New-Transaction__Input-Container'>
                        <p className='New-Transaction__Label'>Date:</p>
                        <input 
                            onChange={onTransactionChangeHandler} 
                            className='New-Transaction__Input New-Transaction__Input--Date' 
                            name="date" 
                            value={transaction.date}
                            type="date" />
                        {/* <p className='Journal__Label Journal__Label--Header'>Type:</p> */}
                        <p className='New-Transaction__Label'>Description:</p>
                        <textarea 
                            onChange={onTransactionChangeHandler} 
                            className='New-Transaction__Input New-Transaction__Input--Textarea' 
                            name="description" 
                            value={transaction.description}
                            type="text" />
                    </div>
                        <h1 className='Journal__Title Journal__Title--Add'>Journal Entries:</h1>
                    <div className='Journal__List'>
                        <div className='Journal__List-Header'>
                            <p className='Journal__Label'>Date</p>
                            <p className='Journal__Label'>Account</p>
                            <p className='Journal__Label Journal__Label--Description'>Description</p>
                            <p className='Journal__Label Journal__Label--Number'>Debit</p>
                            <p className='Journal__Label Journal__Label--Number'>Credit</p>
                            <p className='Journal__Label Journal__Label--Balance'>Balance</p>
                        </div>
                        {renderJournals()}
                    </div>
                        <img onClick={addLine} className='Journal__Add-Icon' src={addIcon} alt='add'/>
                </div>
    );
}
