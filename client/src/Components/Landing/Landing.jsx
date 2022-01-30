import './Landing.scss'

export default function Landing() {
    return (
        <div className='Landing'>
            <h1 className='Landing__Title'>Welcome to My Bakery ERP</h1>
            <p className='Landing__Body'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam blanditiis suscipit laborum veritatis et quas fuga nulla a in, sit cumque dolorem aliquam, assumenda aut facilis ipsa delectus vel sed voluptates quos voluptate debitis possimus eius? Quia saepe harum quo odit, doloribus ipsa cupiditate culpa. Iste officiis ex iure odio nam id, delectus tenetur omnis neque dolores ut odit earum? Sed commodi voluptatibus quo odit ea nostrum? Quae, cumque. Reprehenderit ipsam cupiditate officiis delectus neque! Inventore harum enim illum consectetur? Non dolores expedita error nihil eius, commodi vel voluptatibus quasi labore consectetur quidem sapiente est atque aliquam reprehenderit alias. A!</p>
            <h2 className='Landing__Subtitle'>Here are some features of the site:</h2>
            <ul className='Landing__List'>
                <li className="Landing__Item">Manage Recipes</li>
                <li className="Landing__Item">Create Batches</li>
                <li className="Landing__Item">Track Inventory</li>
            </ul>
        </div>
    );
}
