import { Link } from 'react-router-dom';
import Card from './card.js';

function ItemsBox() {
    return (
        <div className="items-box">
            <div className="box-title">
                <h2 className='text'>Concentrate</h2>
                <Link to="" className='text'>Show all</Link>
            </div>

            <div className="box-body">
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
        </div>
    )
}

export default ItemsBox;