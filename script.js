/* API */

const apiKey = ""
const blogContainer = document.getElementById("blog-container")

async function fetchRandomNews(){
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=16&apikey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;
    } catch (error) {
        console.log("Error fetching random news", error)
        return []
    }
}

function displayBlog(articles){
    blogContainer.innerHTML = ""
    articles.forEach(articles => {
        const blogCard = document.createElement("div")
        blogCard.classList.add("blog-card")
        const img = document.createElement("img")
        img.src = articles.urlToImage
        img.alt = articles.title
        const title = document.createElement("h2")
        const truncatedTitle = articles.title.length > 30 
        ? articles.title.slice(0, 30) + "...." 
        : articles.title;
        title.textContent = truncatedTitle;
        const description = document.createElement("p")
        const truncatedDescription = articles.title.length > 100 
        ? articles.description.slice(0, 100) + "...." 
        : articles.description;
        description.textContent = truncatedDescription

        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener('click', () => {
            window.open(articles.url, "_blank")
        })
        blogContainer.appendChild(blogCard)
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews()
        displayBlog(articles);
    } catch (error) {
        console.log("Error fetching random news", error)
    }
})();

/* Search field */

const searchField = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")

searchButton.addEventListener("click", async () => {
    const query = searchField.value.trim()
    if(query != ""){
        try {
            const articles = await fetchNewsQuery(query)
            displayBlog(articles)
        } catch (error) {
            console.log("Error fetching news by query", error);
        }
    }
})

async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=16&apikey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json()
        return data.articles;
    } catch (error) {
        console.log("Error fetching random news", error)
        return []
    }
}

/* Dark/Light Theme */

let icon = document.getElementById("icon")

icon.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme")
    if(document.body.classList.contains("dark-theme")){
        icon.src = "img/sun.png"
    }
    else{
        icon.src = "img/moon.png"
    }
});
