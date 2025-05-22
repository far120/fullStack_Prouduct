import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { BackEnd_url } from '../../../constance';

export default function Addproducts() {
  const navigate = useNavigate();
  const { userid } = useParams();
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    category: "",
    subcategory: "",
    description: "",
    discount: 0,
    stock: 1,
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    axios.get(`${BackEnd_url}/api/category`).then(response => {
      setSubcategories(response.data.flatMap(category => category.subcategory));
      setCategories(response.data.map(category => category.name));
    });
  }, []);

  const handleChange = e => setProduct({ ...product, [e.target.name]: e.target.value });
  const handleImageChange = e => setImage(e.target.files[0]);
  const handleSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(product).forEach(([key, value]) => formData.append(key, value));
    formData.append("image", image);
    if (userid) {
      axios.post(`${BackEnd_url}/api/products/${userid}`, formData, {
        headers: {
          'Authorization': `${localStorage.getItem("token")}`,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then(() => {
          alert('Product added successfully');
          navigate("/myProducts");
        })
        .catch(error => alert(error.response?.data));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-purple-200 to-blue-400 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-xl bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col gap-7 border border-blue-200 backdrop-blur-md">
        <h2 className="text-4xl font-extrabold text-blue-900 text-center mb-2 tracking-tight drop-shadow-lg">Add Product</h2>
        <div className="flex flex-col gap-4">
          <label htmlFor="title" className="block text-blue-900 font-semibold">Product Title</label>
          <input id="title" type="text" name="title" placeholder="Product Title" value={product.title} onChange={handleChange} className="rounded-xl border border-blue-300 px-4 py-3 text-lg focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition w-full bg-blue-50 placeholder:text-blue-400" required />
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
          <label htmlFor="image" className="block text-blue-900 font-semibold mt-2">Product Image URL</label>
          <input
            id="image"
            type="url"
            name="image"
            placeholder="Paste image URL here"
            value={product.image || ''}
            onChange={e => setProduct({ ...product, image: e.target.value })}
            className="rounded-xl border border-blue-300 px-4 py-2 bg-blue-50 focus:ring-2 focus:ring-blue-400 focus:outline-none shadow-sm transition w-full"
            required
          />
        </div>
        <button type="submit" className="mt-4 bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-900 hover:to-purple-900 text-white font-bold py-3 rounded-xl shadow-lg transition text-lg tracking-wide">Add Product</button>
      </form>
    </div>
  );
}
