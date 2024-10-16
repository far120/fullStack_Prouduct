import "./categorieslink.css"
import { Link } from "react-router-dom";
export default function Categorieslink(){
    const data = [
        {
            src:"./img/COLOURBOX22466387.webp",
            title:"CLOTHES"
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
        },
        {
            src:"./img/category.webp",
            title:"OTHERCATEGORIES"
        }

    ]
    return (
        <>
          {/* Featured Categories Section */}
          <div className="container">
            <h1 className="text-center my-4">Featured Categories</h1>
            <div className="row">
              {data.map((item, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                  <div className="text-center">
                    <Link to={`/${item.title.toLowerCase()}`}>
                      <img
                        src={item.src}
                        alt={item.title}
                        className="rounded-circle"
                        style={{ width: '100%', height: 'auto' }}
                      />
                    </Link>
                    <div className="card-body">
                      <p className="card-title">{item.title}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
    
          {/* Popular Products Section */}
          <div className="container text-center my-4">
            <h1>Popular Products</h1>
            <p>Do not miss the current offers until the end of March.</p>
          </div>
    
          {/* Popular Products Grid */}
          <div className="container">
            <div className="row">
              {data.map((item, index) => (
                <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={index}>
                  <button className="btn btn-primary w-100 h-100">
                    <p className="m-0">{item.title}</p>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    
}
