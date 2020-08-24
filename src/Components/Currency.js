import React, { useEffect, useState } from 'react';

import classes from './Currency.module.css';
import Axios from 'axios';

const Currency = () => {

    //set local states
    const [currencies, setCurrencies] = useState();
    const [firstValue, setFirstValue] = useState(1);
    const [secondValue, setSecondValue] = useState(1);
    const [firstCurrency, setFirstCurrency] = useState("EUR");
    const [secondCurrency, setSecondCurrency] = useState("EUR");

    //get api with currencies and rates
    useEffect(() => {
        Axios.get('https://api.exchangeratesapi.io/latest?base=EUR').then(({ data }) => {
            setCurrencies(data);
        })
    }, []);

    //takes currencies and values 
    const FirstCurrencyChange = (event) => {
        setFirstCurrency(event.target.value);
    };

    const secondCurrencyChange = (event) => {
        setSecondCurrency(event.target.value);
    };

    const firstValueChange = (event) => {
        setFirstValue(event.target.value);
    };

    const secondValueChange = (event) => {
        setSecondValue(event.target.value);
    };

    // convert currencies value
    const convertFromTo = () => {
        const fromRate =
            firstCurrency === "EUR" ? 1 : currencies.rates[firstCurrency];
        const valueInEur = firstValue / fromRate;
        const toRate = secondCurrency === "EUR" ? 1 : currencies.rates[secondCurrency];
        setSecondValue((valueInEur * toRate).toFixed(2));
    };

    const convertToFrom = () => {
        const toRate = secondCurrency === "EUR" ? 1 : currencies.rates[secondCurrency];
        const valueInEur = secondValue / toRate;
        const fromRate =
            firstCurrency === "EUR" ? 1 : currencies.rates[firstCurrency];
        setFirstValue((valueInEur * fromRate).toFixed(2));
    };


    // if changig value or currency call convert functions
    useEffect(() => {
        convertFromTo();
         // eslint-disable-next-line
    }, [firstValue]);

    useEffect(() => {
        convertToFrom();
        // eslint-disable-next-line
    }, [firstCurrency]);

    useEffect(() => {
        convertToFrom();
        // eslint-disable-next-line
    }, [secondValue]);

    useEffect(() => {
        convertFromTo();
         // eslint-disable-next-line
    }, [secondCurrency]);

    if (!currencies) {
        return null;
    }
    return (
        <div className={classes.Currency}>
            <h1 className={classes.headliner}>React currency exchange</h1>
            <div className={classes.currencyBlocks}>
                <div className={classes.block}>
                    <form>
                        <input
                            type="number"
                            value={firstValue}
                            onChange={firstValueChange}
                        ></input>
                        <select>
                            <option
                                value={firstCurrency}
                                onChange={FirstCurrencyChange}
                            >EUR</option>
                            {Object.keys(currencies.rates).map((rate, index) => (
                                <option
                                key={`${rate}_${index}`}
                                value={rate}
                            >{rate}
                            </option>
                            ))}
                        </select>
                    </form>
                </div>
                <div className={classes.block}>
                    <form>
                        <input
                            type="number"
                            value={secondValue}
                            onChange={secondValueChange}
                        ></input>
                        <select
                            value={secondCurrency}
                            onChange={secondCurrencyChange}
                        >
                            <option>EUR</option>
                            {Object.keys(currencies.rates).map((rate, index) => (
                                <option
                                    key={`${rate}_${index}`}
                                    value={rate}
                                >{rate}
                                </option>
                            ))}
                        </select>
                    </form>
                </div>
            <h5>Calculated by {currencies.date} course</h5>
            </div>
        </div>
    )
}

export default Currency
