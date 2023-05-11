import {useEffect,useState} from 'react';
import Card from '../../components/card';
import axios from 'axios';

function AboutUs() {
    const [data, setdata] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9000/aboutus',data)
        .then(res => {
            setdata(res.data)
        })
        .catch(err => { console.log(err) })
    }, [])

    return (
        <div className="aboutus main-content">
            <div className="title">
                <h1 className="text">About Us</h1>
            </div>

            <div className="body">
                { data.map((aboutus, index) => {
                    return <Card img={aboutus.image} name={aboutus.name}
                                  desc ={aboutus.desc}/>
                })}
            </div>
        </div>
    );
}

export default AboutUs;