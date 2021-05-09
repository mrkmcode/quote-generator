const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    // Check quote length to determine styling
    (quote.text.length > 120) ? quoteText.classList.add('long-quote') : quoteText.classList.remove('long-quote');
    quoteText.textContent = quote.text;
    // Check if author is present, and if not, assign it as `Anonymous`
    authorText.textContent = quote.author || 'Anonymous';
    // Hide loader
    complete();   
}

// Get Quotes From API
async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Catch Error Here 
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank')
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
Particles.init({
    selector: '.background',
    color: ['#a8ddb5', '#7bccc4', '#4eb3d3'],
    connectParticles: true
});
getQuotes();
