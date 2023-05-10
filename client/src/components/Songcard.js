function Songcard({ img, name, desc }) {
    return (
        <a href = "#bottom-click" className = "card">
            <div>
                <img src={img}  alt="img" className="card-img"/>
                <a href="https://boxicons.com/?query=volume"></a>
  
                <div className="card-body">
                    <h2 className="name">{name}</h2>
                    <p className="desc">{desc}</p>
                </div>
            </div>
        </a>
    )
}

export default Songcard;