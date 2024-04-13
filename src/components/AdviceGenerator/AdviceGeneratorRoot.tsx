import "./AdviceGeneratorRoot.css";
import { motion } from "framer-motion";

/*
    =====================
    * ADVICE GENERATOR
    =====================
*/
type AdviceGeneratorRootType = {
    children?: React.ReactNode;
};
export const AdviceGeneratorRoot: React.FC<AdviceGeneratorRootType> = ({ children }) => {
    return (
        <motion.div
            className="advice-generator-root"
            initial={{ opacity: 0, y: "10%" }}
            animate={{ opacity: 1, y: "-10%" }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};
