import './BlankTransactionLine.scss'
import removeIcon from '../../Assets/Icons/remove.svg';
import doneIcon from '../../Assets/Icons/done.svg';

export default function BlankTransactionLine(props) {
    const {je, onJournalChangeHandler, removeNewLine, confirmNewLine} = props;
    return (
        <div key={je.id}className='Journal__Item Journal__Item--Input'>
            <input 
                type='date'
                name='date'
                value={je.date}
                onChange={(event) => onJournalChangeHandler(event, je.id)}
                className='Journal__Input'/>
            <input 
                type='text'
                name='account'
                value={je.account}
                onChange={(event) => onJournalChangeHandler(event, je.id)}
                placeholder='Account'
                className='Journal__Input'/>
            <input 
                type='text'
                name='description'
                placeholder='Description'
                value={je.description}
                onChange={(event) => onJournalChangeHandler(event, je.id)}
                className='Journal__Input Journal__Input--Description'/>
            <input 
                type='number'
                name='debit'
                placeholder='0'
                value={je.debit_credit === 'D' ? je.amount : 0}
                onChange={(event) => onJournalChangeHandler(event, je.id)}
                min='0'
                className='Journal__Input'/>
            <input 
                type='number'
                name='credit'
                placeholder='0'
                value={je.debit_credit === 'C' ? je.amount : 0}
                onChange={(event) => onJournalChangeHandler(event, je.id)}
                min='0'
                className='Journal__Input Journal__Input--Credit'/>
            <img onClick={() => removeNewLine(je.id)} className='Journal__Remove-Icon Journal__Remove-Icon--new' src={removeIcon} alt="" />
            <img onClick={() => confirmNewLine(je.id)} className='Journal__Confirm-Icon Journal__Remove-Icon--new' src={doneIcon} alt="" />
            <p className='Journal__Input Journal__Input--Balance'></p>
        </div>
    );
}
