import { motion, HTMLMotionProps } from 'framer-motion';

type GradientButtonProps = HTMLMotionProps<"button"> & {
    children: React.ReactNode;
};

export default function GradientButton({ children, className = '', ...props }: GradientButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className={`flex flex-row justify-center items-center px-[60px] py-[18px] md:px-[133px] md:py-[21px] gap-[13px] rounded-[80px] text-white text-xl md:text-3xl font-semibold bg-gradient-to-r from-teal-500 via-purple-500 to-red-500 whitespace-nowrap cursor-pointer hover:shadow-lg transition-shadow ${className}`}
            {...props}
        >
            {children}
        </motion.button>
    );
}
