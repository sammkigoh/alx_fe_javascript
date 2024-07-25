document.addEventListener ('DOMContentLoaded', function(){

//declaring the variables
const quotes = [
    {text: "The only limite to our realization of tomorrow is our doubts of today.", category: "Motivation"},
    {text: "Life is 10% what heppens to us and 90% how we react to it.", category: "Life"},
    {text: "Your time is limited, don't wast it living someone else's life.", category: "Inspiration."}
];
//referencing the DOM elements 
const quoteDisplay = document.getElementById ('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const newQuoteText = document.getElementById ('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
//displaying random quotes 
function displayRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomIndex.text}" - ${randomQuote.category}`;
}

//adding the event listener for the new quote button 
newQuoteButton.addEventListener('click', displayRandomQuote);

//the first quote display
displayRandomQuote();

//adding new quotes on the form 
function addQuote() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (text !== "" && category !== "") {
        const newQuote = {text, category};
        quotes.push(newQuote);
        newQuoteText.value ='';
        newQuoteCategory.value ='';
        alert("Quote added successfully!");
    } else {
        alert("Please enter both a quote and a category.")
    }
}
//document.querySelector('button[onclick="addQuote()"]').addEventListener('click',addQuote);
addQuoteButton.addEventListener('click', addQuote);
});