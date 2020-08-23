import React, { useEffect, useState } from 'react';

import classes from './Currency.module.css';
import Axios from 'axios';

const Currency = () => {

    const [currencies, setCurrencies] = useState();

    useEffect(() => {
        Axios.get('https://api.exchangeratesapi.io/latest?base=EUR').then(({ data }) => {
            setCurrencies(data);
        })
    }, []);

    const [firstValue, setFirstValue] = useState(1);
    const [secondValue, setSecondValue] = useState(1);

    const [fromCurrency, setFirstCurrency] = useState("EUR");
    const [secondCurrency, setSecondCurrency] = useState("EUR");

    const FirstCurrencyChange = event => {
        setFirstCurrency(event.target.value);
    };

    const secondCurrencyChange = event => {
        setSecondCurrency(event.target.value);
    };

    const firstValueChange = e => {
        setFirstValue(parseFloat(e.target.value));
    };

    const secondValueChange = e => {
        setSecondValue(parseFloat(e.target.value));
    };

    const convertFromTo = () => {
        const fromRate =
            fromCurrency === "EUR" ? 1 : currencies.rates[fromCurrency];
        const valueInEur = firstValue / fromRate;
        const toRate = secondCurrency === "EUR" ? 1 : currencies.rates[secondCurrency];
        setSecondValue(valueInEur * toRate);
    };

    const convertToFrom = () => {
        const toRate = secondCurrency === "EUR" ? 1 : currencies.rates[secondCurrency];
        const valueInEur = secondValue / toRate;
        const fromRate =
            fromCurrency === "EUR" ? 1 : currencies.rates[fromCurrency];
        setFirstValue(valueInEur * fromRate);
    };

    useEffect(() => {
        convertFromTo();
         // eslint-disable-next-line
    }, [firstValue, secondCurrency]);
   

    useEffect(() => {
        convertToFrom();
        // eslint-disable-next-line
    }, [secondValue, fromCurrency]);
    

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
                                value={fromCurrency}
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
