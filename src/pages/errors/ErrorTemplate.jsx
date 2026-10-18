import { Link } from 'react-router-dom';

export default function ErrorTemplate({ code, title, description, children }) {
    return (
        <main className="min-h-screen bg-[#fbf8ff] flex items-center justify-center px-6 py-24 antialiased">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <h1 className="text-9xl font-extrabold text-indigo-100 tracking-tighter select-none">
                        {code}
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none -mt-32">
                        <span className="text-4xl sm:text-5xl font-extrabold text-[#2e3145] tracking-tight whitespace-nowrap">
                            {title}
                        </span>
                    </div>
                </div>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                    {description}
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    {children ? children : (
                        <Link 
                            to="/" 
                            className="inline-flex h-12 items-center justify-center rounded-xl bg-indigo-600 px-8 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700"
                        >
                            Volver al inicio
                        </Link>
                    )}
                </div>
            </div>
        </main>
    );
}
