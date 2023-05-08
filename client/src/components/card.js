function Card({ img, name, desc }) {
    return (
        <div className="card">
            <img src={img}  alt="img" className="card-img"/>
  
            <div className="card-body">
                <div className="name"><h2>{name}</h2></div>
                <div className="desc"><p>{desc}</p></div>
            </div>
        </div>
    )
}

export default Card;
// may thang nguuuuuuuuuuuuuuuuuuuuuuuuuu