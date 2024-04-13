import "./AdviceBox.css";
import { AnimatePresence, motion } from "framer-motion";

/*
    =====================
    * ADVICE BOX
    =====================
*/
type AdviceBoxType = {
    advice?: string;
    loading: boolean;
    error?: string;
};
export const AdviceBox: React.FC<AdviceBoxType> = ({ advice, error, loading }) => {
    const output = () => {
        if (advice) return "\u201c" + advice + "\u201d";
        if (error) return "\u201c" + error + "\u201d";
        return null;
    };

    return (
        <motion.div className="advice-box">
            <AnimatePresence initial={false}>{!loading && <AdviceText>{output()}</AdviceText>}</AnimatePresence>
        </motion.div>
    );
};

type AdviceTextType = {
    children?: React.ReactNode;
};
const AdviceText: React.FC<AdviceTextType> = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="advice-text"
        >
            {children}
        </motion.div>
    );
};
