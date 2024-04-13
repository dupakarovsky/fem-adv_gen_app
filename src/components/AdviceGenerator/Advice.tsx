import "./Advice.css";

/*
    =====================
    * ADVICE
    =====================
*/
type AdviceType = {
    children?: React.ReactNode;
};
export const Advice: React.FC<AdviceType> = ({ children }) => {
    return <>{children}</>;
};
