import './Home.scss'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='Home'>
        <Link to='/Signup' >Signup</Link>
    </div>
  )
}
