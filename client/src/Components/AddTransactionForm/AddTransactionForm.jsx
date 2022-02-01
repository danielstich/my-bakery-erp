import './AddTransactionForm.scss'
import doneIcon from '../../Assets/Icons/done.svg';
import closeIcon from '../../Assets/Icons/close_black_24dp.svg';
import addIcon from '../../Assets/Icons/add.svg';
import { useState } from 'react';

export default function AddTransactionForm(props) {
    const { hideAdd } = props;

    const [transaction, setTransaction ] = useState({})
    const [journals, setJournals ] = useState([])

    const renderJournals = () => {
        let balance = 0;
        const journalsList = journals.map(je => {
            
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

    return (
        <div className='Journal'>
                    <div className='Journal__Header'>
                        <h1 className='Journal__Title'>Transaction Details:</h1>
                        <img onClick={()=>{}} className='Journal__Icon Journal__Icon--Submit' src={doneIcon} alt="" />                        
                        <img onClick={hideAdd} className='Journal__Icon' src={closeIcon} alt="" />
                        <p className='Journal__Label Journal__Label--Header'>Date:</p>
                        <p className='Journal__Label Journal__Label--Header'>Type:</p>
                        <p className='Journal__Label Journal__Label--Header'>Description:</p>
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
                    </div>
                        <img onClick={()=>{}} className='Journal__Add-Icon' src={addIcon} alt='add'/>
                </div>
    );
}
