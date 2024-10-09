import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {BackEnd_url}  from '../../../constance';

export default function Addproducts() {
    const navigate = useNavigate();
    const { userid } = useParams();
    const [categories, setcategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);

    useEffect(() => {
        axios.get(`${BackEnd_url}/api/category`)
            .then(response => {
                const allSubcategories = response.data.flatMap(category => category.subcategory);
                setSubcategories(allSubcategories);
                const allcategories = response.data.map(category => category.name);
                setcategories(allcategories); 
            });
    }, []);
    

    

    const [product, setProduct] = useState({
        title: "",
        price: "",
        category: "",
        subcategory: "",
        description: "", 
        discount: 0,
        stock: 1,
    });
    
    console.log(product.title);
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", product.title);
        formData.append("price", product.price);
        formData.append("category", product.category);
        formData.append("subcategory", product.subcategory);
        formData.append("description", product.description);
        formData.append("discount", product.discount);
        formData.append("stock", product.stock);
        formData.append("image", image);

        if (userid) {
            axios.post(`${BackEnd_url}/api/products/${userid}`, formData, {
                headers: {
                    'Authorization': `${localStorage.getItem("token")}`,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                alert('Product added successfully');
                navigate("/myProducts");
            })
            .catch(error => {
                console.log(error);
                alert(error.response?.data ); 
            });
        }
    };
      
    return (
        <div>
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} />
                    <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} />
                
                <div>
                    {/* <input type="text"  name="category"    placeholder="Category"  value={product.category}   onChange={handleChange} /> */}
                    <select name="category" value={product.category} onChange={handleChange}>
                    <option value="" disabled>Select categoryname </option> 
                    {categories.map((subcategory) => (
                    <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                    </select>
                </div>
                    

                <div>
                    <input type="text"   name="subcategory" placeholder="subCategory"     value={product.subcategory}  onChange={handleChange}  />
                    <select name="subcategory" value={product.subcategory} onChange={handleChange}>
                    <option value="" disabled>Select Subcategory</option> 
                    {subcategories.map((subcategory) => (
                     <option key={subcategory} value={subcategory}>{subcategory}</option>
                    ))}
                    </select>
                </div>
                    <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} />
                    <input type="number" name="discount" placeholder="Discount" value={product.discount} onChange={handleChange} />
                    <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} />
                    <input type="file" name="image" placeholder="Image" onChange={handleImageChange} />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
