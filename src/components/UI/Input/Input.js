import React from 'react'
import classes from '../../UI/Input/Input.module.css'
const input = (props) => {
    let inputElement = null
    const inptClasses = [classes.inputElement]

    if (props.invalid && props.shouldValidate && props.touched) {
        inptClasses.push(classes.invalid)
    }
    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inptClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} onChange={props.changed} />
            break;
        case ('textarea'):
            inputElement = <textarea className={inptClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} onChange={props.changed} />
            break;
        case ('select'):
            inputElement = <select className={inptClasses.join(' ')}
                value={props.value} onChange={props.changed}>
                {props.elementConfig.option.map(option => (
                    <option key={option.value} value={option.value}>{option.displayValue}</option>
                ))}

            </select>
            break;
        default:
            inputElement = <input className={inptClasses.join(' ')}
                {...props.elementConfig}
                value={props.value} onChange={props.changed} />
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label} >{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input