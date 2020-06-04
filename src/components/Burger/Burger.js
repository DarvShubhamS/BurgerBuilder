import React from 'react'
import classes from './BurgerIng/Burger.module.css'
import BurgIng from './BurgerIng/BurgerIng.js'
import BurgerIng from './BurgerIng/BurgerIng.js'


const burger = (props) => {
    // let transformedIng = Object.keys(props.ingredients).map(igkey => {
    //     console.log(igkey)
    //     /* props.ingrdients[igkey] value hai keys ki */
    //     return [...Array(props.ingredients[igkey])].map((_, i) => {
    //         console.log("props ingredients")
    //         console.log(props.ingredients[igkey])
    //         console.log("value of i")
    //         console.log(igkey + i)
    //         return <BurgerIng key={igkey + i} type={igkey} />
    //     })
    // }).reduce((arr, el) => {
    //     return arr.concat(el)
    // }, [])
    let transformedIng = [];
    for (let key in props.ingredients) {
        // console.log(key)

        for (let i = 0; i < props.ingredients[key]; i++) {
            transformedIng.push(<BurgerIng key={key + i} type={key} />);
            // console.log(i)
        }

    }


    if (transformedIng.length === 0) {
        transformedIng = <p>Please Add Ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgIng type="bread-top"></BurgIng>
            {transformedIng}
            <BurgIng type="bread-bottom"></BurgIng>
        </div>
    );
}

export default burger;