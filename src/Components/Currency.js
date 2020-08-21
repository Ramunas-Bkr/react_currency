import React from 'react'
import classes from './Currency.module.css'

const Currency = () => {
    return (
        <div className={classes.Currency}>
            <h1 className={classes.headliner}>React currency exchange</h1>
            <div className={classes.currencyBlocks}>
                <div className={classes.block}>
                    <form>
                        <input></input>
                        <select>
                            <option>EUR</option>
                            <option>USD</option>
                        </select>
                    </form>
                </div>
                <div className={classes.block}>
                    <form>
                        <input></input>
                        <select>
                            <option>EUR</option>
                            <option>USD</option>
                        </select>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Currency
