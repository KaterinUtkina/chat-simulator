import {useEffect} from "react";

export function useAfterRender(callback: () => void, dependencies: any[]) {
    useEffect(() => {
        const handle = requestAnimationFrame(() => {
            callback();
        });

        return () => cancelAnimationFrame(handle);
    }, dependencies);
}