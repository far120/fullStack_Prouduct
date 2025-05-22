import "./categorieslink.css";
import { Link } from "react-router-dom";

export default function Categorieslink() {
    const data = [
        { src: "./img/COLOURBOX22466387.webp", title: "CLOTHES" },
        { src: "./img/beuty.jpg", title: "BEAUTY" },
        { src: "./img/electronic.jpg", title: "ELECTRONICS" },
        { src: "./img/grocery.avif", title: "GROCERY" },
        { src: "./img/health.jpg", title: "HEALTH" },
        { src: "./img/accesories.jpg", title: "ACCESSORY" },
        { src: "./img/books.jpg", title: "BOOKS" },
        { src: "./img/category.webp", title: "OTHERCATEGORIES" }
    ];
    return (
        <div>
            <section className="w-full py-8">
                <div className="max-w-7xl mx-auto px-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-700 mb-8">Featured Categories</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                        {data.map((item, index) => (
                            <Link to={`/${item.title.toLowerCase()}`} key={index} className="flex flex-col items-center group hover:scale-105 transition-transform">
                                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-blue-200 group-hover:border-blue-500 shadow-lg mb-3 bg-white">
                                    <img src={item.src} alt={item.title} className="object-cover w-full h-full" />
                                </div>
                                <span className="text-base md:text-lg font-semibold text-gray-700 group-hover:text-blue-700 tracking-wide">{item.title}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            <section className="max-w-7xl mx-auto text-center mt-12">
                <h3 className="text-xl font-bold text-purple-700 mb-2">Popular Products</h3>
                <p className="text-gray-500 mb-6">Do not miss the current offers until the end of March.</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {data.map((item, index) => (
                        <button key={index} className="w-full h-20 bg-gradient-to-r from-blue-400 to-purple-400 text-white rounded-lg shadow hover:from-blue-500 hover:to-purple-500 font-bold text-lg transition">
                            {item.title}
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}
