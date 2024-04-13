import "./App.css";
/*
    ================
    * APP
    ===============
*/
import { useState } from "react";
import { useAdvice } from "./hooks/use-advice";
import { AdviceGenerator, AdviceBox, Advice, AdviceNumber, Picture, Button } from "./components";

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
