import "./categorieslink.css"
import { Link } from "react-router-dom";
export default function Categorieslink(){
    const data = [
        {
            src:"./img/COLOURBOX22466387.webp",
            title:"FASHION"
        },
        {
            src:"./img/beuty.jpg",
            title:"BEAUTY"
        },
        {
            src:"./img/electronic.jpg",
            title:"ELECTRONICS"
        },
        {
            src:"./img/grocery.avif",
            title:"GROCERY"

        },
        {
            src:"./img/health.jpg",
            title:"HEALTH"
        },
        {
            src:"./img/accesories.jpg",
            title:"ACCESSORY"
        },
        {
            src:"./img/books.jpg",
            title:"BOOKS"
        }
    ]
    return(
<>
            <h1 style={{textAlign:"center"}}>Featured Categories</h1>
        <div className="categ" >
            {data.map((item,index) => (
                <div style={{marginBottom:"50px"}} key={index}>
                    <Link to={`/${item.title.toLowerCase()}`} ><img src={item.src} alt={item.title} className="categimg" /></Link>
                    <p style={{textAlign:"center"}}>{item.title}</p>
                </div>
            ))}
</div>
<div style={{textAlign:"center" , marginBottom:"10px"}} >
    <h1>Popular Products</h1>
   <p> Do not miss the current offers until the end of March.</p>
   </div>
<div className="categ" >
            {data.map((item,index) => (
                <div style={{marginBottom:"50px"}} key={index}>
                   <button className="btn"> <p style={{textAlign:"center"}}>{item.title}</p></button>
                </div>
                ))}
                
        </div>

</>
    )
    
}
