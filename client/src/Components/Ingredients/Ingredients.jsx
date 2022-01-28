import './Ingredients.scss';
import Item from '../Item/Item';
import addIcon from '../../Assets/Icons/add.svg';

export default function Ingredients( { name, ingredients }) {
    const ingredientsList = ingredients.map(ingredient => {
        return <Item key={ingredient.id} item={ingredient} editModal={() => {}} />
    })
    return (
        <div className='Ingredients'>
            <div className='Ingredients__Header'>
                <h1 className='Ingredients__Title'>{name} Ingredients:</h1>
                <img onClick={() => {}} className='Button Button--Add-Icon' src={addIcon} alt="add button" />
            </div>
            <div className='Ingredients__List'>
                {ingredientsList}
            </div>
        </div>
    );
    
}
