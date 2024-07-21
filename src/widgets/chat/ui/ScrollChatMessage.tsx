import React, {useEffect, useRef} from 'react';
import {OverlayScrollbarsComponent, OverlayScrollbarsComponentRef} from "overlayscrollbars-react";
import {eventBus} from "../../../shared/lib";
import {ChatEvents} from "../enum";

type CustomScrollProps = {
    children: React.ReactNode,
}

function ScrollChatMessage(
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
            top: scrollOffsetElement.scrollHeight ?? 0,
        });
    };

    useEffect(() => {
        if (contentRef.current) {
            scrollContent();
        }

    }, [props.children]);

    useEffect(() => {
        initEvents();

        return () => {
            destroyEvents();
        }
    }, []);

    const initEvents = () => {
        eventBus.on(ChatEvents.OPTIONS_RENDERED, scrollContent);
    };

    const destroyEvents = () => {
        eventBus.off(ChatEvents.OPTIONS_RENDERED, scrollContent);
    }

    return (
        <OverlayScrollbarsComponent
            ref={ref}
            style={{ height: "100%" }}
            defer>
            <div ref={contentRef}>
                {props.children}
            </div>
        </OverlayScrollbarsComponent>
    );
}

export default ScrollChatMessage;
