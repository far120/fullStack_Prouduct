import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {BackEnd_url}  from '../../../constance';


export default function Updatecategory() {

// select categories and subcategories
    const [subcategories, setSubcategories] = useState([]);
    const [categories, setcategories] = useState([]);

    useEffect(() => {
        axios.get(`${BackEnd_url}/api/category`)
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
        fetch(`${BackEnd_url}/api/products/${productid}`)
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

        axios.put(`${BackEnd_url}/api/products/${productid}/${userid}`, 
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

return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-blue-300 p-4">
    <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-7 border border-blue-200 backdrop-blur-md">
      <h1 className="text-4xl font-extrabold text-blue-900 text-center mb-4 tracking-tight drop-shadow-lg">Update Product</h1>
      <div className="flex flex-col gap-4">
        <label htmlFor="title" className="block text-blue-900 font-semibold">Product Title</label>
        <input id="title" type="text" name="title" placeholder="Title" value={product.title} onChange={handleChange} className="rounded-xl border border-blue-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition w-full bg-blue-50 placeholder:text-blue-400" required />
        <label htmlFor="price" className="block text-blue-900 font-semibold">Price</label>
        <input id="price" type="number" name="price" placeholder="Price" value={product.price} onChange={handleChange} className="rounded-xl border border-blue-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition w-full bg-blue-50 placeholder:text-blue-400" required />
        <label htmlFor="category" className="block text-blue-900 font-semibold">Category</label>
        <select id="category" name="category" value={product.category} onChange={handleChange} className="rounded-xl border border-blue-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition w-full bg-blue-50 text-blue-900" required>
          <option value="" disabled>Select Category</option>
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
        <label htmlFor="subcategory" className="block text-blue-900 font-semibold">Subcategory</label>
        <select id="subcategory" name="subcategory" value={product.subcategory} onChange={handleChange} className="rounded-xl border border-blue-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition w-full bg-blue-50 text-blue-900" required>
          <option value="" disabled>Select Subcategory</option>
          {subcategories.map(subcategory => (
            <option key={subcategory} value={subcategory}>{subcategory}</option>
          ))}
        </select>
        <label htmlFor="description" className="block text-blue-900 font-semibold">Description</label>
        <textarea id="description" name="description" placeholder="Description" value={product.description} onChange={handleChange} className="rounded-xl border border-blue-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition w-full bg-blue-50 placeholder:text-blue-400 min-h-[90px] resize-none" required />
        <div className="flex gap-4">
          <div className="w-1/2">
            <label htmlFor="discount" className="block text-blue-900 font-semibold">Discount %</label>
            <input id="discount" type="number" name="discount" placeholder="Discount %" value={product.discount} onChange={handleChange} className="rounded-xl border border-blue-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition w-full bg-blue-50 placeholder:text-blue-400" min={0} max={100} />
          </div>
          <div className="w-1/2">
            <label htmlFor="stock" className="block text-blue-900 font-semibold">Stock</label>
            <input id="stock" type="number" name="stock" placeholder="Stock" value={product.stock} onChange={handleChange} className="rounded-xl border border-blue-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition w-full bg-blue-50 placeholder:text-blue-400" min={1} />
          </div>
        </div>
        <label htmlFor="image" className="block text-blue-900 font-semibold mt-2">Product Image</label>
        <input id="image" type="file" name="image" onChange={handleImageChange} className="rounded-xl border border-blue-300 px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition w-full" />
      </div>
      <button type="submit" className="mt-4 bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-900 hover:to-purple-900 text-white font-bold py-3 rounded-xl shadow-lg transition text-lg tracking-wide">Update Product</button>
    </form>
  </div>
);
}