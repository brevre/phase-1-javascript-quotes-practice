document.addEventListener("DOMContentLoaded", () => {
    const quoteList = document.getElementById("quote-list");
    const newQuoteForm = document.getElementById("new-quote-form");

    // Fetch and display quotes
    fetch("http://localhost:3000/quotes?_embed=likes")
        .then(response => response.json())
        .then(quotes => {
            quotes.forEach(quote => {
                displayQuote(quote);
            });
        });

    // Event listener for submitting a new quote
    newQuoteForm.addEventListener("submit", event => {
        event.preventDefault();
        const newQuote = document.getElementById("new-quote").value;
        const author = document.getElementById("author").value;

        // Create a new quote in the API
        fetch("http://localhost:3000/quotes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                quote: newQuote,
                author: author,
            }),
        })
            .then(response => response.json())
            .then(quote => {
                displayQuote(quote);
                // Clear the form inputs
                document.getElementById("new-quote").value = "";
                document.getElementById("author").value = "";
            });
    });

    // Function to display a single quote
    function displayQuote(quote) {
        const li = document.createElement("li");
        li.className = "quote-card";
        li.innerHTML = `
            <blockquote class="blockquote">
                <p class="mb-0">${quote.quote}</p>
                <footer class="blockquote-footer">${quote.author}</footer>
                <br>
                <button class="btn-success">Likes: <span>${quote.likes.length}</span></button>
                <button class="btn-danger">Delete</button>
            </blockquote>
        `;

        // Event listener for the like button
        const likeButton = li.querySelector(".btn-success");
        likeButton.addEventListener("click", () => {
            // Implement the logic to like/unlike a quote
        });

        // Event listener for the delete button
        const deleteButton = li.querySelector(".btn-danger");
        deleteButton.addEventListener("click", () => {
            // Implement the logic to delete a quote
        });

        quoteList.appendChild(li);
    }
});
