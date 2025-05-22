import Carsol from "./carsol"
import Categorieslink from "./categorieslink"

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex flex-col items-center justify-start">
            <section className="w-full max-w-7xl mx-auto flex flex-col items-center py-8 px-4">
                <div className="w-full mb-8">
                    <Carsol />
                </div>
                <div className="w-full">
                    <Categorieslink />
                </div>
            </section>
            <section className="w-full bg-white py-12 mt-8 shadow-inner">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-blue-800 mb-4">Welcome to Our Store!</h2>
                    <p className="text-lg text-gray-600 mb-6">Discover the best products, exclusive deals, and a seamless shopping experience.</p>
                    <a href="/allproducts" className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-lg font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition">Browse All Products</a>
                </div>
            </section>
        </div>
    )
}