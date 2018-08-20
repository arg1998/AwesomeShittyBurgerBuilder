import React from 'react';
import classes from './Input.css';

const Input = props => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];

    if (!props.valid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    else{
        inputClasses.push(classes.Valid);
    }

    switch (props.elementType) {
        case 'input':
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    onChange={props.onChange}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
            break;
        case 'select':
            inputElement = (
                <select
                    className={inputClasses.join(' ')}
                    value={props.value}
                    onChange={props.onChange}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.displayText}
                        </option>
                    ))}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={inputClasses.join(' ')}
                    onChange={props.onChange}
                    {...props.elementConfig}
                    value={props.value}
                />
            );
            break;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default Input;
