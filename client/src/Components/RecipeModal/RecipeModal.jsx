import './RecipeModal.scss';
import InputField from '../InputField/InputField';
import Button from '../Button/Button';
import closeIcon from '../../Assets/Icons/close_black_24dp.svg';
import deleteIcon from '../../Assets/Icons/delete.svg';
import Ingredients from '../Ingredients/Ingredients';
import AddBatchForm from '../AddBatchForm/AddBatchForm';

export default function RecipeModal({ recipe, alertHandler, onSubmitBatch, onChangeHandler, onChangeBatchHandler, onSubmitHandler, hideModal, deleteRecipe, type }) {
    
    const renderIngredients = <Ingredients
        alertHandler={alertHandler} 
        hideModal={hideModal} 
        recipe={recipe} />  

    const renderBatchInput = <AddBatchForm 
            onSubmitBatch={onSubmitBatch} 
            recipe={recipe}
            onChangeBatchHandler={onChangeBatchHandler}
            hideModal={hideModal} />

    const renderInput = () => {
        const submitRecipe = recipe.id ? ((event) => {onSubmitHandler(event, recipe.id)}) : onSubmitHandler;

        return (
            <form 
                className='Recipe-Modal__Form'
                onSubmit={submitRecipe}>
                <h3 className='Recipe-Modal__Title'>{recipe.id ? 'Edit' : 'Add'}</h3>
                <InputField 
                    label='Recipe Name'
                    type='text'
                    name='name'
                    id='name'
                    value={recipe ? recipe.name : ''}
                    placeholder='Recipe Name'
                    onChangeHandler={onChangeHandler}
                />
                <InputField 
                    label='Recipe Description'
                    type='text'
                    name='description'
                    id='description'
                    value={recipe ? recipe.description : ''}
                    placeholder='Recipe Description'
                    onChangeHandler={onChangeHandler}
                />
                <InputField 
                    label='Number of Items'
                    type='number'
                    name='qty'
                    id='qty'
                    value={recipe ? recipe.qty : ''}
                    placeholder='Quantity'
                    onChangeHandler={onChangeHandler}
                />
                <Button extraClasses='Button--EditItem' type="submit" label={recipe.id ? 'Edit Item' : 'Add Item'}/>
                <div className='Recipe-Modal__Icon-Container'>
                    <img className='Recipe-Modal__Icon' onClick={() => hideModal(recipe)} src={closeIcon} alt="" />      
                    {recipe.id ? <img className='Recipe-Modal__Icon' src={deleteIcon} alt='delete' onClick={() => deleteRecipe(recipe.id)} /> : <></>}
                </div>
                <div className='Recipe-Modal__Line'></div>
            </form>
        )
    }
    return (
        <div className='Recipe-Modal'>
            {(type === 'ingredients') && renderIngredients}
            {(type === 'add') && renderInput()}
            {(type === 'edit') && renderInput()}
            {(type === 'batch') && renderBatchInput}
        </div>
    )
    
}
