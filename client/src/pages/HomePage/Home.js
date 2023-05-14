import ItemsBox from '../../components/ItemsBox';

function Home() {
    return (
        <div className="home main-content">
            <div className="parts">
                <ItemsBox name="Adele" />
                <ItemsBox name="Billie Eilish" />
                <ItemsBox name="XXXTentacion"/>
            </div>
        </div>
    );
}

export default Home;