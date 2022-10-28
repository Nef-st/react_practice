import React from 'react'

const Game = ({onClickVariant, ...props}) => {
    const percent = Math.ceil(props.step / props.len * 100);

    return (
        <>
            <div className="progress">
                <div style={{ width: `${percent}%` }} className="progress__inner"></div>
            </div>
            <h1>{props.question.title}</h1>
            <ul>
                {
                props.question.variants.map((text, index) => 
                    <li onClick={() => onClickVariant(index)} key={text}>{text}</li>
                )
                }
            </ul>
        </>
    )
}

export default Game
