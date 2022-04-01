import React, {useEffect, useLayoutEffect, useState} from 'react';
import './App.scss';
import COLORS_ARRAY  from './colorsArray.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBug, faTwitter } from '@fortawesome/free-solid-svg-icons'


let quoteDBUrl= "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("You become what you believe.");
  const [author, setAuthor] = useState("Oprah Winfrey");
  const [randomNumber, setRandomNumber] = useState(0);
  const [quotesArray, setquotesArray] = useState(null)
  const [accentColor, setAccentColor] = useState('#282c34')
   
  const fetchQuotes = async(url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setquotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

useEffect(() => {

  fetchQuotes(quoteDBUrl)
   },[quoteDBUrl])
  
  const getRandomQuote = () =>{
       let randomInteger = Math.floor(quotesArray.length*Math.random())
       setRandomNumber(randomInteger)
       setAccentColor(COLORS_ARRAY[randomInteger])
       setQuote(quotesArray[randomInteger].quote)
         setAuthor(quotesArray[randomInteger].author)

  }



 

 
 
  return (
    <div className="App">
      <header className="App-header" style= {{backgroundColor: accentColor }}>
        <div id="quote-box" style= {{color: accentColor}}> 
         
         
          <p id="text">"{quote}" </p>
          <p id="author">- {author} </p>
          <div className="button">
            <a id="tweet-quote" style= {{backgroundColor: accentColor }} href={encodeURI(`https://www.twitter.com/intent/tweet?text=${quote} -${author}`)}>
              <FontAwesomeIcon icon={faBug} /></a>
              <button id="new-quote" onClick= {() => getRandomQuote()} style= {{backgroundColor: accentColor }}>Generate a random quote</button>
            </div>         
             
         

        </div>
      
  
     
      
      </header>
    </div>
  );
}

export default App;
