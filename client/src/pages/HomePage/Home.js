import { Link } from 'react-router-dom';
import ItemsBox from '../../components/ItemsBox';
 
function Home() {
    return (
        <div className="home main-content">
            <div className="parts">
                <ItemsBox />
                <ItemsBox />
                <ItemsBox />
                <ItemsBox />
            </div>
        </div>
    );
}

export default Home;