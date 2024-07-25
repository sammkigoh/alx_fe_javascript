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
function showRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomIndex.text}" - ${randomQuote.category}`;
}

//adding the event listener for the new quote button 
newQuoteButton.addEventListener('click', showRandomQuote);

//the first quote display
showandomQuote();

//adding new quotes on the form 
function createAddQuoteForm() {
    const text = newQuoteText.value.trim();
    const category = newQuoteCategory.value.trim();

    if (text !== "" && category !== "") {
        const newQuote = {text, category};
        quotes.push(newQuote);
        //clearing the input fields
        newQuoteText.value ='';
        newQuoteCategory.value ='';

        //creating a new DOM element to display the new quote
        const newQuoteElement = document.createElement('div');
        newQuoteElement.innerHTML = `"${newQuote.text}" - ${newQuote.category}`;
        quoteDisplay.appendChild(newQuoteElement);
         
        alert("Quote added successfully!");
    } else {
        alert("Please enter both a quote and a category.")
    }
}
//document.querySelector('button[onclick="addQuote()"]').addEventListener('click',addQuote);
addQuoteButton.addEventListener('click', createAddQuoteForm);
});