import { useState } from 'react';
import numberToWords from 'number-to-words';



    
    const NumberToWordsComponent = () => {
      const [number, setNumber] = useState(123); // Replace with your state or input value
    
      const convertToWords = () => {
        const words = numberToWords.toWords(number, { language: 'fr' });
        console.log(words); // Output: "cent vingt-trois"
        // You can set the words in state or display it in your component
      };
    
      return (
        <div>
          <input
            type="number"
            value={number}
            onChange={(e) => setNumber(parseInt(e.target.value))}
          />
          <button onClick={convertToWords}>Convert to Words</button>
        </div>
      );
    };
    

    


export default NumberToWordsComponent
