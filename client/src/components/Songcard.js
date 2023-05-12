function Songcard({ img, name, desc }) {
    return (
        <a href = "#bottom-click" className = "card">
            <img src={img}  alt="img" className="card-img"/>
  
            <div className="card-body">
                <h2 className="name">{name}</h2>
                <p className="desc">{desc}</p>
            </div>
        </a>
    )
}

export default Songcard;