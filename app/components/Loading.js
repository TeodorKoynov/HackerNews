import React from 'react'
import {useState, useEffect} from 'react';

const styles = {
    wrapper: {
        position: 'absolute',
        left: '0',
        right: '0',
        marginTop: '20px',
    },
    content: {
        fontSize: '35px',

        textAlign: 'center',
        fontWeight: '500',
    },
}

export default function Loading({text = 'Loading', speed = 300}) {
    const [content, setContent] = useState(text);

    useEffect(() => {
        const intervalId = setInterval(() =>
            setContent((content) =>
                content === `${text}...`
                    ? text
                    : `${content}.`)
            , speed);

        return () => clearInterval(intervalId);
    }, [text, speed])

    return (
        <div style={styles.wrapper}>
            <p style={styles.content}>
                {content}
            </p>
        </div>
    )
}
