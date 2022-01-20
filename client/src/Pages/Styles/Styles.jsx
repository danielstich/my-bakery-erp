import { Component } from 'react'
import InputField from '../../Components/Input/InputField'
import './Styles.scss'

export default class Styles extends Component {
  state= {
    value: ''
  } 

  onChangeHandler = (event) => {
    this.setState({
      value: event.target.value
    })
  }
  render() {
    return (
      <div className='Styles'>
          <h1 className='Styles__Title'>Styles</h1>
          <h2 className='Styles__Subtitle'>Subtitle</h2>
          <h3 className='Styles__Label'>Label</h3>
          <p className='Styles__Text'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem atque quisquam sit? Soluta et beatae iste itaque facere odio possimus, voluptatum molestias porro non corporis aut aliquam consectetur, sit, eligendi similique nisi magni iusto repellendus eius. Praesentium iure suscipit reiciendis dolorum delectus sunt enim quisquam atque? Delectus quos autem, itaque sapiente libero magni amet. Dolor neque sit omnis et fugit tempora, quisquam unde corporis dolores, similique veniam iste a cum ratione aliquam ullam dolore vel totam quis non aut reprehenderit. Expedita, quo nesciunt consequuntur perferendis eligendi nihil eos sint perspiciatis quidem quod corrupti accusamus minus ipsa unde. Facilis, quasi deleniti.</p>
  
          <div className="Styles__Box Styles__Box--1">
            <p className="Styles__Text Styles__Text--Light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eum recusandae alias repellendus dignissimos exercitationem et repellat aperiam perferendis aliquam doloremque, magnam labore animi autem dicta nulla impedit porro accusantium similique fugiat nisi maxime quidem quibusdam voluptatem! Nemo dolores incidunt eveniet, facilis minima omnis quod molestias nesciunt dolor, aut possimus!</p>
          </div>
  
          <div className="Styles__Box Styles__Box--2">
          <p className="Styles__Text Styles__Text--Light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eum recusandae alias repellendus dignissimos exercitationem et repellat aperiam perferendis aliquam doloremque, magnam labore animi autem dicta nulla impedit porro accusantium similique fugiat nisi maxime quidem quibusdam voluptatem! Nemo dolores incidunt eveniet, facilis minima omnis quod molestias nesciunt dolor, aut possimus!</p>
          </div>
  
          <div className="Styles__Box Styles__Box--3">
          <p className="Styles__Text Styles__Text--Light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eum recusandae alias repellendus dignissimos exercitationem et repellat aperiam perferendis aliquam doloremque, magnam labore animi autem dicta nulla impedit porro accusantium similique fugiat nisi maxime quidem quibusdam voluptatem! Nemo dolores incidunt eveniet, facilis minima omnis quod molestias nesciunt dolor, aut possimus!</p>
          </div>
  
          <div className="Styles__Box Styles__Box--4">
          <p className="Styles__Text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam eum recusandae alias repellendus dignissimos exercitationem et repellat aperiam perferendis aliquam doloremque, magnam labore animi autem dicta nulla impedit porro accusantium similique fugiat nisi maxime quidem quibusdam voluptatem! Nemo dolores incidunt eveniet, facilis minima omnis quod molestias nesciunt dolor, aut possimus!</p>
          </div>
          <InputField 
            name='firstName'
            label='First Name'
            type='text'
            extraClasses=''
            value={this.state.value}
            placeholder='First Name'
            onChangeHandler={this.onChangeHandler}
          />
      </div>
    )
  }
}
