import {useCallback, useState} from "react";

export function useLoading() {
    const [loading, setLoading] = useState(false);

    const startLoading = useCallback(() => setLoading(true), []);
    const stopLoading = useCallback(() => setLoading(false), []);

    return {
        loading,
        startLoading,
        stopLoading
    };
}
