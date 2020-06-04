import React from 'react'
import styles from '../BuilControls/BuildControls.module.css'
import BuildControl from '../BuilControls/BuildControl/BuildControl'


const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

let BuildControls = (props) => (
    <div className={styles.BuildControl}>
        <p>Current Price:<strong>{props.price.toFixed(2)} </strong> </p>
        {controls.map(el => (
            <BuildControl key={el.label}
                label={el.label}

                added={() => props.ingredientAdded(el.type)}
                removed={() => props.ingredientRemoved(el.type)}
                disbaled={props.disabled[el.type]}
            ></BuildControl>
        ))}

        <button className={styles.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >
            {props.isAuth ? 'ORDER NOW' : 'SIGHNUP TO ORDER'}</button>
    </div>

);
export default BuildControls;