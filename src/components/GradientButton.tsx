import React from 'react';

type GradientButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    children: React.ReactNode;
};

export default function GradientButton({ children, className = '', ...props }: GradientButtonProps) {
    return (
        <button
            className={`flex flex-row justify-center items-center px-[60px] py-[18px] md:px-[133px] md:py-[21px] gap-[13px] rounded-[80px] text-white text-xl md:text-3xl font-semibold bg-gradient-to-r from-teal-500 via-purple-500 to-red-500 whitespace-nowrap cursor-pointer hover:shadow-lg transition-shadow ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
