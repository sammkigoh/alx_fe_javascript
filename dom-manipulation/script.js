document.addEventListener ('DOMContentLoaded', function(){

//declaring the variables
const quotesKey = 'quotes';
let quotes = JSON.parse(localStorage.getItem(quotesKey)) || [
    {text: "The only limite to our realization of tomorrow is our doubts of today.", category: "Motivation"},
    {text: "Life is 10% what heppens to us and 90% how we react to it.", category: "Life"},
    {text: "Your time is limited, don't wast it living someone else's life.", category: "Inspiration."}
];
const lastFilterKey = 'lastFilter';

//referencing the DOM elements 
const quoteDisplay = document.getElementById ('quoteDisplay');
const newQuoteButton = document.getElementById('newQuote');
const newQuoteText = document.getElementById ('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const addQuoteButton = document.getElementById ('addQuoteButton');
const importFile = document.getElementById('importFile');
const exportButton = document.getElementById('exportButton');
const categoryFilter = document.getElementById('categoryFilter');

//populate the category filter dropdown 
function populateCategories() {
    const categories = ['all', ...new Set(quotes.map(q => q.category))];
    categoryFilter.innerHTML = categories.map(category => `<option value="${category}">${category}</option>`).join('');
    const lastFilter = localStorage.getItem(lastFilterKey) || 'all';
    categoryFilter.value = lastFilter;
    filterQuotes();
}

// filter the quotes based on the selected category 
function filterQuotes() {
    const selectedCategory = categoryFilter.value;
    localStorage.setItem(lastFilterKey, selectedCategory);
    quoteDisplay.innerHTML = '';
    const filteredQuotes = selectedCategory === 'all' ? quotes :
    quotes.filter(q => q.category === selectedCategory);
    filteredQuotes. forEach (q => {
        const quoteElement = document.createElement('div');
        quoteElement.innerHTML = `"${q.text}" - ${q.category}`;
        quoteDisplay.appendChild(quoteElement);
    });
}
categoryFilter.addEventListener('change', filterQuotes);

//displaying random quotes 
function showRandomQuote(){
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    quoteDisplay.innerHTML = `"${randomIndex.text}" - ${randomQuote.category}`;
    sessionStorage.setItem('lastQuote', JSON.stringify(randomQuote));
}

if (newQuoteButton) {
    newQuoteButton.addEventListener('click', showRandomQuote);
}

// //saving quotes to local storage

// //adding the event listener for the new quote button 
// newQuoteButton.addEventListener('click', showRandomQuote);

// //the first quote display
//     showRandomQuote();

// //save quotes to local storage
function saveQuotes() {
    localStorage.setItem(quotesKey, JSON.stringify(quotes));
    populateCategories();
}

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
//adding event listner to the add quote button
addQuoteButton.addEventListener('click', createAddQuoteForm);

//export quotes to JSON

function exportToJsonFile() {
    const jsonString = JSON.stringify(quotes);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
exportButton.addEventListener('click', exportToJsonFile);

//import quotes from JSON file 
function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result);
        quotes = quotes.concat(importedQuotes);
        saveQuotes();
        alert('Quotes imported successfully!');
    };
    fileReader.readAsText(event.target.files[0]);
}
if (importFile) {
    importFile.addEventListener('change', importFromJsonFile);
}
//initializing the category filter and display the quotes 
populateCategories();
});