import React from 'react'
import {useState, useEffect} from 'react';

const styles = {
    content: {
        fontSize: '35px',
        position: 'absolute',
        left: '0',
        right: '0',
        marginTop: '20px',
        textAlign: 'center',
    }
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
        <p style={styles.content}>
            {content}
        </p>
    )
}
