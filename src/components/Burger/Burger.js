import React from 'react';
import classes from './Burger.css';
import Ingredient from './Ingredient/Ingredient'


const burger = (props) => {
    let reformedIngs = Object.keys(props.ingredients).map((ingKey) => {
        return [...Array(props.ingredients[ingKey])].map((_, index) => {
            return <Ingredient key={ingKey + index} type={ingKey} />
        });
    }).reduce((prevVal, currentVal, i) => {
        return prevVal.concat(currentVal);
    }, []);


    if (reformedIngs.length === 0){
        reformedIngs = <div>Please Add Some Ingredient</div>;
    }

    console.log(reformedIngs);


    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            {reformedIngs}
            <Ingredient type="bread-bottom" />
        </div>
    );
};

export default burger;