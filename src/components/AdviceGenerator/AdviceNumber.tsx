import "./AdviceNumber.css";
import { AnimatePresence, motion } from "framer-motion";

/*
    =====================
    * ADVICE NUMBER
    =====================
*/
type AdviceNumberType = {
    id: number | undefined;
    loading: boolean;
};
export const AdviceNumber: React.FC<AdviceNumberType> = ({ id, loading }) => {
    return (
        <motion.div className="advice-number">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
                advice #
            </motion.span>
            <span>
                <AnimatePresence>
                    {!loading && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            {id || "500"}
                        </motion.span>
                    )}
                </AnimatePresence>
            </span>
        </motion.div>
    );
};
