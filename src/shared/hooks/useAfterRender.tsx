import {useEffect} from "react";

type Dependence = Record<string, boolean> | null;

export function useAfterRender(callback: () => void, dependencies: Dependence[]) {
    useEffect(() => {
        const handle = requestAnimationFrame(() => {
            callback();
        });

        return () => cancelAnimationFrame(handle);
    }, [callback, dependencies]);
}