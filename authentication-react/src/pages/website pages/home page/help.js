export default function Help (){
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 py-10 px-2">
            <div className="w-full max-w-lg bg-white rounded-xl shadow-lg p-8 flex flex-col items-center">
                <h1 className="text-4xl font-extrabold text-center text-blue-800 mb-4 tracking-tight drop-shadow-lg">Help & Support</h1>
                <p className="text-lg text-gray-600 mb-4 text-center">If you need any assistance, please don't hesitate to contact us.</p>
                <div className="w-full flex flex-col gap-2 text-center">
                    <p className="text-blue-700 font-semibold">Email: <a href="mailto:support@example.com" className="underline hover:text-purple-700">support@example.com</a></p>
                    <p className="text-blue-700 font-semibold">Phone: <a href="tel:+11234567890" className="underline hover:text-purple-700">+1 (123) 456-7890</a></p>
                </div>
            </div>
        </div>
    ) 
    

}