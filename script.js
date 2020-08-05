const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuote = document.getElementById('new-quote');
const twitter = document.getElementById('twitter');
const quoteContainer = document.getElementById('quote-container');
const loader = document.getElementById('spinner');
//Get quote from API
async function getQuote(){
    const proxy = 'https://peaceful-springs-23868.herokuapp.com/'
    const uri = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{

        quoteContainer.hidden = true;
        loader.hidden = false;
        const response = await fetch(proxy + uri);
        const data = await response.json();
        quoteText.innerText = data.quoteText;

        //check the length of the quote
        if(data.quoteText.length > 80){
            quoteText.classList.add('quote-text-long');
        }else{
            quoteText.classList.remove('quote-text-long');
        }

        //check author name is blank or not and replace 
        if(data.quoteAuthor){
            quoteAuthor.innerText = data.quoteAuthor;
        }else{
            quoteAuthor.innerText ='unknown';
        }

        quoteContainer.hidden = false;
        loader.hidden = true;
        
    }catch(error){
        getQuote()
        console.log(error)
    }
}

//on load
getQuote()

//on new-quote button press
newQuote.addEventListener('click',function(){
    getQuote()
})

//on twitter button press
twitter.addEventListener('click',function(){
    const twitterurl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${quoteAuthor.innerText}`
    window.open(twitterurl,'_blank')
})
