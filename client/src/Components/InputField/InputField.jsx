import React from 'react';
import './InputField.scss'

export default function InputField({ name, label, type, extraClasses, value, placeholder, onChangeHandler }) {
    return (
        <div className='Input'>
            <label className='Input__Label' htmlFor={name}>{label}</label>
            <input 
                className={'Input__Field ' + extraClasses}
                type={type}
                name={name}
                id={name}
                value={value}
                placeholder={placeholder}
                onChange={onChangeHandler}
                autoComplete="off"
            />
        </div>
    );
}
