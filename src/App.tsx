/*
    ================
    * APP
    ===============
*/
import { useState } from "react";
import { useAdvice } from "./hooks/use-advice";
import { AnimatePresence, motion } from "framer-motion";

const App: React.FC = () => {
    const [fetchDelay, setFetchDelay] = useState<number>(0);
    const { advice, errorMessage, isLoading } = useAdvice("https://api.adviceslip.com/advice", fetchDelay);

    return (
        <>
            <AdviceGenerator>
                <Advice>
                    <AdviceNumber id={advice?.slip.id} loading={isLoading}></AdviceNumber>
                    <AdviceBox
                        advice={advice?.slip.advice}
                        loading={isLoading}
                        error={errorMessage?.message}
                    ></AdviceBox>
                </Advice>
                <Picture
                    sources={[
                        { sourceSet: "pattern-divider-mobile.svg", media: "(max-width: 375px)" },
                        { sourceSet: "pattern-divider-desktop.svg", media: "(min-width: 376px)" },
                    ]}
                    fallbackImgURL="pattern-divider-desktop.svg"
                />
                <Button onClick={() => setFetchDelay(Math.random())}></Button>
            </AdviceGenerator>
        </>
    );
};
export default App;

/*
    =====================
    * ADVICE GENERATOR
    =====================
*/
type AdviceGeneratorType = {
    children?: React.ReactNode;
};

const AdviceGenerator: React.FC<AdviceGeneratorType> = ({ children }) => {
    return (
        <motion.div
            className="advice-generator"
            initial={{ opacity: 0, y: "10%" }}
            animate={{ opacity: 1, y: "-10%" }}
            transition={{ duration: 0.5 }}
        >
            {children}
        </motion.div>
    );
};

/*
    =====================
    * ADVICE 
    =====================
*/
type AdviceType = {
    children?: React.ReactNode;
};
const Advice: React.FC<AdviceType> = ({ children }) => {
    return <>{children}</>;
};

/*
    =====================
    * ADVICE NUMBER
    =====================
*/
type AdviceNumberType = {
    id: number | undefined;
    loading: boolean;
};
const AdviceNumber: React.FC<AdviceNumberType> = ({ id, loading }) => {
    return (
        <motion.div className="advice-number" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span>advice #</span>
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
const AdviceBox: React.FC<AdviceBoxType> = ({ advice, error, loading }) => {
    return (
        <motion.div className="advice-box">
            <AnimatePresence>
                {!loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="advice"
                    >
                        {error || advice}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

/*
    =====================
    * PICTURE COMPONENT
    =====================
*/
type PictureSourcesType = {
    sourceSet: string;
    media: string;
};
type PictureType = {
    sources: PictureSourcesType[];
    fallbackImgURL: string;
};

const Picture: React.FC<PictureType> = ({ sources, fallbackImgURL }) => {
    const renderedSources = sources.map((source) => {
        return <source key={source.sourceSet} srcSet={source.sourceSet} media={source.media}></source>;
    });

    return (
        <picture>
            {renderedSources}
            <img src={fallbackImgURL} />
        </picture>
    );
};

/*
    =====================
    * BUTTON
    =====================
*/
type ButtonProps = {
    onClick: () => void;
};
const Button: React.FC<ButtonProps> = ({ onClick }) => {
    return (
        <button className="button" onClick={onClick}>
            <img src="icon-dice.svg" alt="button" />
        </button>
    );
};
