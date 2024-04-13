/*
    =========================
    * CUTSTOM HOOK USEADVICE   
    =========================
*/
import { useState, useEffect, useCallback, useRef } from "react";

export type APIJSONResponseType = {
    slip: {
        id: number;
        advice: string;
    };
};

export function useAdvice(url: string, fetchDelay: number) {
    const [advice, setAdvice] = useState<APIJSONResponseType | null>(null);
    const [errorMessage, setErrorMessage] = useState<Error | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const timeoutID = useRef<number>();

    const fetchAdvice = useCallback(() => {
        fetch(url)
            .then((result: Response) => {
                if (!result.ok) throw new Error("API seems do be down. No advice for now.");
                return result.json();
            })
            .then((jsonResponse: APIJSONResponseType) => {
                setAdvice(jsonResponse);
            })
            .catch((err: unknown) => {
                switch (true) {
                    case err instanceof Error: {
                        setErrorMessage(err);
                        break;
                    }
                    default: {
                        const unknowError: Error = new Error("Something wrong has happened, which is a mistery.");
                        setErrorMessage(unknowError);
                        throw unknowError;
                    }
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [url]);

    useEffect(() => {
        setIsLoading(true);
        setErrorMessage(null);

        timeoutID.current = setTimeout(() => {
            fetchAdvice();
        }, 500 + fetchDelay);

        return () => {
            if (timeoutID.current) {
                clearTimeout(timeoutID.current);
            }
        };
    }, [fetchDelay, fetchAdvice]);

    return {
        advice,
        setAdvice,
        isLoading,
        setIsLoading,
        errorMessage,
        setErrorMessage,
    };
}
