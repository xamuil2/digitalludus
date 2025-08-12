import React from 'react';

const ExampleComponent: React.FC = () => {
    return (
        <div className="p-4 sm:p-6 lg:p-8 min-h-screen flex items-center justify-center bg-gradient-to-br from-roman-cream to-roman-marble">
            <div className="max-w-md sm:max-w-lg lg:max-w-xl mx-auto text-center glass-effect rounded-xl p-6 sm:p-8 lg:p-10 shadow-roman border border-roman-gold/20 touch-manipulation">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-classical font-bold text-roman-red mb-4 sm:mb-6">
                    Hello from ExampleComponent!
                </h1>
                <p className="text-sm sm:text-base lg:text-lg text-roman-black font-classical leading-relaxed">
                    This is a reusable component in your Next.js application.
                </p>
            </div>
        </div>
    );
};

export default ExampleComponent;