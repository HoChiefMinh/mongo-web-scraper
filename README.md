# mongo-web-scraper

Mongo Web Scraper is a application that allows users to scrape news articles directly from one of the most highly rated news sources, "The Wall Street Journal". Once the newly scraped articles are rendered to the screen the user has the option to select and save articles of their choosin, and if they want they can add a comment as well. Once they're satisfied and finished reading their article they also have the option to delete the saved article.

## How Does it Work?

Thanks to the implementation of Cheerio a Node.js library it helps developers interpret and analyze web pages using a jQuery-like syntax due to it being a jQuery based API. Using Cheerio we download the source code from the webpage and load it into a Cheerio instance. Then we use the Cheerio API to filter out the HTML element containing the URLs.

## Preview

### Prerequisites 

```
Node.js
```

#### Installing

```
npm install
axios
cheerio
express
express-handlebars
mogoose
```

## Author

Minh Pham
