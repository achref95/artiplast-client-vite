import React, { useEffect, useState } from 'react';
import { ToWords } from 'to-words';

const NumberToWordsComponent = () => {
  const [words, setWords] = useState('');

  useEffect(() => {
    const numberToConvert = 137.125;
    const formattedNumber = Math.floor(numberToConvert); // Remove decimal part
    const toWords = new ToWords({
      localeCode: 'fr-FR',
      converterOptions: {
        currency: true,
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
        doNotAddOnly: false,
        currencyOptions: {
          name: 'Dinar',
          plural: 'Dinars',
          symbol: '',
          fractionalUnit: {
            name: 'Millime',
            plural: 'Millimes',
            symbol: '',
          },
        },
      },
    });

    const convertedWords = toWords.convert(formattedNumber, { currency: true });
    setWords(convertedWords);
  }, []); // Empty dependency array means this effect will run once after the initial render

  return (
    <div>
      <h2>Number in Words:</h2>
      <p>{words}</p>
    </div>
  );
};

export default NumberToWordsComponent;
