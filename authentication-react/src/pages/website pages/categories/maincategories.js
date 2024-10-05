import { useEffect, useState } from "react";
import Aside from "../aside/aside";
import "./maincategories.css";

export default function Maincategories(props) {
    const [maincategories, setmaincategories] = useState([]);

    useEffect(() => {
        fetch('http://localhost:2004/api/products')
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const filteredProducts = data.filter(product => {
                        // Check if subcategory is defined or not
                        if (props.subcategory === undefined) {
                            return product.category === props.category; // Match category
                        } else {
                            return  product.subcategory === props.subcategory; // Match both
                        }
                    });
                    // Set the filtered products or null if none found
                    if (filteredProducts.length > 0) {
                        setmaincategories(filteredProducts);
                    } else {
                        setmaincategories([]); // Set to an empty array if no products found
                        alert("No products found for this category and subcategory");
                    }
                } else {
                    setmaincategories([]); // Set to an empty array on invalid format
                    alert("Invalid data format received from the server");
                }
            })
            .catch(error => {
                console.error('Fetch error:', error);
                alert("Failed to fetch products");
            });
    }, [props.category, props.subcategory]); 

    console.log(props.category);
    console.log(props.subcategory);

    if (maincategories.length === 0) return <h1>Loading...</h1>; // Check if maincategories is empty

    const mainCategoryList = maincategories.map(maincategory => (
        <div key={maincategory._id}>
            <img src={`http://localhost:2004/images/products/${maincategory.image}`} alt={maincategory.name} />
            <h2>{maincategory.title}</h2>
            <h3>{maincategory.price} USD</h3>            
            <h3>{maincategory.user_id}</h3>            
            <p>{maincategory.description}</p>
            <p>{maincategory.category}</p>
            <p>{maincategory.subcategory}</p>
        </div>
    ));

    return (
        <div className="maincategories">
            <div className="maincategories-part1">
                <Aside/>
            </div>
            <div className="maincategories-part2">
                <h1>Welcome to My App</h1>
                {mainCategoryList}
            </div>
        </div>
    );
}
