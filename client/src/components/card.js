import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Card(props) {
    const userJSON = sessionStorage.getItem("account");
    const user = JSON.parse(userJSON);
    const navigate = useNavigate();

    const navigation = () => {
        if (props.path === "artist") {
            axios.get(`http://localhost:9000/user/recent/artists/${props.name}&${user.username}`)
                .then(res => {
                    navigate(`/artists/${props.name}`, { state: props.state })
                })
                .catch(err => {console.log(err);})
        } else if (props.path === "playlist") {
            axios.get(`http://localhost:9000/user/recent/playlists/${user.username}&${props.name}`)
                .then(res => {
                    navigate(`/playlists/${props.name}`, { state: props.state })
                })
                .catch(err => {console.log(err);})
        }
    }

    return (
        <div className="card" onClick={navigation}>
            <img src={props.img}  alt="img" className="card-img"/>
            <div className="card-body">
                <h2 className="name">{props.name}</h2>
                <p className="desc">{props.desc}</p>
            </div>
        </div>
    )
}

export default Card;
