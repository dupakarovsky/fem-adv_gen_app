import { motion, Variants } from "framer-motion";
import { useCallback, useEffect, useState } from "react";

/*
    ================
    * APP
    ===============
*/
const App: React.FC = () => {
    return (
        <>
            <AdviceGenerator>
                <Advice>
                    <AdviceNumber></AdviceNumber>
                    <AdviceBox></AdviceBox>
                </Advice>
                <Picture
                    sources={[
                        { sourceSet: "pattern-divider-mobile.svg", media: "(max-width: 375px)" },
                        { sourceSet: "pattern-divider-desktop.svg", media: "(min-width: 376px)" },
                    ]}
                    fallbackImgURL="pattern-divider-desktop.svg"
                />
                <Button></Button>
            </AdviceGenerator>
        </>
    );
};
export default App;

/*
    ==================
    * HOOK USE ADVICE   
    ==================
*/
type APIJSONResponseType = {
    slip: {
        id: number;
        advice: string;
    };
};
function useAdvice() {
    const [adviceSlip, setAdviceSlip] = useState<APIJSONResponseType | null>(null);
    const [errorMessage, setErrorMessage] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchAdvice = useCallback((url: string) => {
        setIsLoading(true);

        fetch(url)
            .then((result: Response) => {
                // console.log(result);
                if (!result.ok) throw new Error("The API has encontered and error");
                return result.json();
            })
            .then((jsonResponse: APIJSONResponseType) => {
                // console.log({ "slip": jsonResponse.slip, "id": jsonResponse.slip.id, "advice": jsonResponse.slip.advice });
                setAdviceSlip(jsonResponse);
            })
            .catch((err: unknown) => {
                switch (true) {
                    case err instanceof Error: {
                        // console.error(err.message);
                        setErrorMessage(err);
                        break;
                    }
                    default: {
                        // console.log(err);
                        const unknowError: Error = new Error("Something wrong has happened, which is a mistery.");
                        setErrorMessage(unknowError);
                        throw unknowError;
                    }
                }
            })
            .finally(() => {
                console.log("fetchAdvice completed");
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        setErrorMessage(null);
        fetchAdvice("https://api.adviceslip.com/advice");
    }, [fetchAdvice]);

    console.log({ adviceSlip, errorMessage, isLoading });

    return {
        adviceSlip,
        setAdviceSlip,
        isLoading,
        setIsLoading,
        errorMessage,
        setErrorMessage,
    };
}

/*
    =====================
    * ADVICE GENERATOR
    =====================
*/
type AdviceGeneratorType = {
    children?: React.ReactNode;
};
const AdviceGenerator: React.FC<AdviceGeneratorType> = ({ children }) => {
    const { isLoading } = useAdvice();

    const duration: number = 0.2;
    const delay: number = 0.2;

    const adviceGeneratorVariants: Variants = {
        start: { opacity: 0, y: "10%" },
        finish: { opacity: 1, y: "-10%", transition: { duration: duration, ease: "linear", delay: delay } },
    };

    return (
        <motion.div
            className="advice-generator"
            animate={isLoading ? "start" : "finish"}
            variants={adviceGeneratorVariants}
            onAnimationComplete={(definition) => console.log("Animation has completed", definition)}
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
const AdviceNumber: React.FC = () => {
    const { adviceSlip, isLoading } = useAdvice();

    const duration: number = 0.2;
    const delay: number = 0.2;

    const adviceNumberVariants: Variants = {
        start: { opacity: 0, scale: 2, filter: "blur(2px)" },
        finish: { opacity: 1, scale: 1, filter: " blur(0px)", transition: { duration: duration, delay: delay } },
    };

    return (
        <motion.span className="advice-number" variants={adviceNumberVariants} animate={isLoading ? "start" : "finish"}>
            {isLoading && `advice # 000`}
            {adviceSlip?.slip && `advice # ${adviceSlip.slip.id}`}
        </motion.span>
    );
};

/*
    =====================
    * ADVICE BOX
    =====================
*/

const AdviceBox: React.FC = () => {
    const { isLoading, adviceSlip, errorMessage } = useAdvice();

    const stagger: number = 0.025;
    const duration: number = 0.2;
    const delay: number = 0.4;

    const adviceBoxVariants: Variants = {
        start: { opacity: 0 },
        finish: (custom: number) => {
            return { opacity: 1, transition: { delay: delay + stagger * custom, duration: duration } };
        },
    };

    const displayOutput = () => {
        if (adviceSlip?.slip) return adviceSlip.slip.advice.split("");
        if (errorMessage && errorMessage !== null) return errorMessage.message.split("");
        return [];
    };

    const adviceCharsArray: string[] = displayOutput();

    const renderedAdvice = adviceCharsArray.map((char: string, idx: number) => {
        if (char === " ") {
            char = "\u0020";
        }
        return (
            <motion.span
                key={idx + 1}
                className={`char--${idx + 1}`}
                variants={adviceBoxVariants}
                animate={isLoading ? "start" : "finish"}
                custom={idx}
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
                    variants={adviceBoxVariants}
                    animate={isLoading ? "start" : "finish"}
                    custom={0}
                >
                    {"\u201C"}
                </motion.span>
                {renderedAdvice}
                <motion.span
                    className={`right-quote char--${adviceCharsArray.length}`}
                    variants={adviceBoxVariants}
                    animate={isLoading ? "start" : "finish"}
                    custom={adviceCharsArray.length}
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

/*
    =====================
    * BUTTON
    =====================
*/
const Button: React.FC = () => {
    return (
        <button className="button">
            <img src="icon-dice.svg" alt="button" />
        </button>
    );
};
