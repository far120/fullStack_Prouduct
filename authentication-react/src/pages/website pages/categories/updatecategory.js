import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";


export default function Updatecategory() {

// select categories and subcategories
    const [subcategories, setSubcategories] = useState([]);
    const [categories, setcategories] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:2004/api/category")
            .then(response => {
                const allSubcategories = response.data.flatMap(category => category.subcategory);
                setSubcategories(allSubcategories);
                const allcategories = response.data.map(category => category.name);
                setcategories(allcategories); 
            });
    }, []);
    
    

    const navigate = useNavigate()
    const { productid, userid } = useParams();
    const [product, setProduct] = useState({
        title: "",
        price: "",
        category: "",
        subcategory: "",
        description: "", 
        discount: 0,
        stock: 0,
    });
    console.log(product.title)
    const [image, setImage] = useState(null);


    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };


    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };


    useEffect(() => {
        fetch(`http://localhost:2004/api/products/${productid}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data); 
                setImage(data.image); 
            });
    }, [productid]);

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
        if (image instanceof File) {
            formData.append("image", image);
        }

        axios.put(`http://localhost:2004/api/products/${productid}/${userid}`, 
            formData,
            {
                headers: {
                    'Authorization': ` ${localStorage.getItem('token')}`, 
                    'Content-Type': 'multipart/form-data' 
                }
            }
        )
        .then(response => {
            alert('Product updated successfully');
            navigate("/myproducts");
        })
        .catch(error => {
            console.error('Error updating product:', error);
            alert(error.response.data);
        });
    };

return(
<div className="update-product-container">
    <h1 className="form-heading">Update Product</h1>
    <form onSubmit={handleSubmit}>
            <div style={{display:"flex", flexDirection:"column", justifyContent:"center" ,alignItems:"center" }}>
                <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} />
                <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} />
                <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleChange} />
                <input type="text"   name="category" placeholder="Category"     value={product.subcategory}  onChange={handleChange}  />
                <input type="text" name="description" placeholder="Description" value={product.description} onChange={handleChange} />
                <input type="number" name="discount" placeholder="Discount" value={product.discount} onChange={handleChange} />
                <input type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} />
                <input type="file" name="image" placeholder="Image" onChange={handleImageChange} />
                <button type="submit">Submit</button>
            </div>
            </form>
</div>
)
}