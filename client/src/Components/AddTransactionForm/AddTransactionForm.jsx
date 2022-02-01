import './AddTransactionForm.scss'
import doneIcon from '../../Assets/Icons/done.svg';
import closeIcon from '../../Assets/Icons/close_black_24dp.svg';
import addIcon from '../../Assets/Icons/add.svg';

export default function AddTransactionForm(props) {
    const { hideAdd } = props;
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
