import './Button.scss'

import React from 'react';

export default function Button({type, label, onClickHandler, extraClasses}) {
    return (
        <button
            type={type}
            onClick={onClickHandler}
            className={'Button ' + extraClasses}>
            {label}
        </button>
    )
}
