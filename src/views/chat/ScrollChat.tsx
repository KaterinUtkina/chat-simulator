import React, {useEffect, useMemo, useRef} from 'react';
import {OverlayScrollbarsComponent, OverlayScrollbarsComponentRef} from "overlayscrollbars-react";
import styles from "../../css/base.module.css";

type CustomScrollProps = {
    children: React.ReactNode,
}

function ScrollChat(
    props: CustomScrollProps
) {
    const ref = useRef<OverlayScrollbarsComponentRef>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const scrollContent = () => {
        const { current } = ref;
        const osInstance = current?.osInstance();

        if (!osInstance) {
            return;
        }

        const { scrollOffsetElement } = osInstance.elements();

        scrollOffsetElement.scrollTo({
            top: contentRef.current?.clientHeight ?? 0,
        });
    };

    const getContentHeight = useMemo(() => {
        return contentRef.current ? contentRef.current.clientHeight : 0;
    }, [contentRef, contentRef]);

    useEffect(() => {
        if (contentRef.current) {
            scrollContent();
        }

        // eslint-disable-next-line
    }, [getContentHeight, props.children]);

    return (
        <OverlayScrollbarsComponent
            ref={ref}
            className={styles.scroll}
            style={{ height: "100%" }}
            defer>
            <div ref={contentRef}>
                {props.children}
            </div>
        </OverlayScrollbarsComponent>
    );
}

export default ScrollChat;
