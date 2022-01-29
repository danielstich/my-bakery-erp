import './Alert.scss'

export default function Alert( { alert, show }) {
   
    return (
        <div className={show ? 'Alert Alert--Show' : 'Alert'}>
            <div className={`Alert__Container Alert__Container--${alert.type}`}>
                <p className='Alert__Body'>{alert.msg}</p>
            </div>
        </div>
    );
}
