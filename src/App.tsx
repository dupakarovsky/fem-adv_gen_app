import { motion } from "framer-motion";

/*
    ================
    * APP
    ===============
*/
const App: React.FC = () => {
    return (
        <>
            <AdviceGenerator />
        </>
    );
};

export default App;

/*
    =====================
    * ADVICE GENERATOR
    =====================
*/
const AdviceGenerator: React.FC = () => {
    return (
        <div className="advice-generator">
            <Advice>
                <AdviceNumber></AdviceNumber>
                <AdviceBox advice="It is easy to sit up and take notice, what's difficult is getting up and takeing action."></AdviceBox>
            </Advice>
            <Picture
                sources={[
                    { sourceSet: "pattern-divider-mobile.svg", media: "(max-width: 375px)" },
                    { sourceSet: "pattern-divider-desktop.svg", media: "(min-width: 376px)" },
                ]}
                fallbackImgURL="pattern-divider-desktop.svg"
            />
            <Button></Button>
        </div>
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
const AdviceNumber: React.FC = () => {
    return <span className="advice-number">advice # 117</span>;
};

/*
    =====================
    * ADVICE BOX
    =====================
*/
type AdviceBoxType = {
    advice: string;
};
const AdviceBox: React.FC<AdviceBoxType> = ({ advice }) => {
    const stagger: number = 0.025;
    const dur: number = 0.02;

    const adviceArray = advice.split("");
    const renderedAdvice = adviceArray.map((char: string, idx: number) => {
        if (char === " ") {
            char = "\u0020";
        }
        return (
            <motion.span
                key={idx + 1}
                className={`char--${idx + 1}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + stagger * idx, duration: dur }}
            >
                {char}
            </motion.span>
        );
    });

    return (
        <div className="advice-box">
            <div className="advice">
                <motion.span
                    className={`left-quote char--${0}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + stagger * 0, duration: dur }}
                >
                    {"\u201C"}
                </motion.span>
                {renderedAdvice}
                <motion.span
                    className={`right-quote char--${adviceArray.length}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + stagger * adviceArray.length, duration: dur }}
                >
                    {"\u201D"}
                </motion.span>
            </div>
        </div>
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

const Button: React.FC = () => {
    return (
        <button className="button">
            <img src="icon-dice.svg" alt="button" />
        </button>
    );
};
