import './AddBatchForm.scss'
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import closeIcon from '../../Assets/Icons/close_black_24dp.svg';

export default function AddBatchForm( { onSubmitBatch, recipe, onChangeBatchHandler, hideModal } ) {
    return (
        <form
            className='Add-Batch__Form'
            onSubmit={onSubmitBatch}>
            <h3 className='Add-Batch__Title'>Create Batch</h3>
            <InputField 
                label='Batch Name'
                type='text'
                name='name'
                id='name'
                value={recipe.name}
                onChangeHandler={onChangeBatchHandler}
                disabled={true}
                
            />
            <InputField 
                label='Date'
                type='date'
                name='date'
                id='date'
                onChangeHandler={onChangeBatchHandler}
            />
            <InputField 
                label='Quantity'
                type='number'
                name='qty'
                id='qty'
                placeholder='Quantity'
                onChangeHandler={onChangeBatchHandler}
            />
            <Button extraClasses='Button--EditItem' type='submit' label='Create Batch' />
            <div className='Add-Batch__Icon-Container'>
                <img className='Add-Batch__Icon' onClick={() => hideModal(recipe)} src={closeIcon} alt="" />
            </div>
            <div className='Add-Batch__Line'></div>
        </form>
    )
}
