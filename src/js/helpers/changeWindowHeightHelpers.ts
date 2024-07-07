export function changeWindowHeightHelpers() {
    const setHeight = () => {
        const windowHeight = window.visualViewport?.height || window.innerHeight;
        document.documentElement.style.setProperty('--window-height', `${windowHeight}px`);
    }

    return {
        setHeight
    };
}