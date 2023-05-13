import { Link } from 'react-router-dom';
import Songcard from './Songcard.js';

function ItemsBox() {
    return (
        <div className="items-box">
            <div className="box-title">
                <h2 className='text'>Concentrate</h2>
                <Link to="" className='text'>Show all</Link>
            </div>

            <div className="box-body">
                <Songcard song={{}}></Songcard>
                <Songcard song={{}}></Songcard>
                <Songcard song={{}}></Songcard>
                <Songcard song={{}}></Songcard>
            </div>
        </div>
    )
}

export default ItemsBox;