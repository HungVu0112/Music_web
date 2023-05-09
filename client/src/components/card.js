function Card({ img, name, desc }) {
    return (
        <div className="card">
            <img src={img} alt="img" className="card-img"/>
  
            <div className="card-body">
                <h2 className="name">{name}</h2>
                <p className="desc">{desc}</p>
            </div>
        </div>
    )
}

export default Card;