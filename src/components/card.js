// TASK 5
// ---------------------
// Implement this function, which should return the markup you see below.
// It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
// The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
// The text inside elements will be set using their `textContent` property (NOT `innerText`).
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// <div class="card">
//   <div class="headline">{ headline }</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={ authorPhoto }>
//     </div>
//     <span>By { authorName }</span>
//   </div>
// </div>
//
import axios from "axios";

const Card = (article) => {
  const card = document.createElement("div");
  card.classList.add("card");

  const headline = document.createElement("div");
  headline.classList.add("headline");
  card.appendChild(headline);
  headline.textContent = article.headline;

  const author = document.createElement("div");
  author.classList.add("author");
  card.appendChild(author);

  const imgContainer = document.createElement("div");
  imgContainer.classList.add("img-container");
  author.appendChild(imgContainer);

  const img = document.createElement("img");
  imgContainer.appendChild(img);
  img.setAttribute("src", `${article.authorPhoto}`);

  const authorName = document.createElement("span");
  author.appendChild(authorName);
  authorName.textContent = `By ${article.name}`;

  card.addEventListener("click", (event) => {
    console.log(headline);
  });

  return card;
};

// TASK 6
// ---------------------
// Implement this function that takes a css selector as its only argument.
// It should obtain articles from this endpoint: `http://localhost:5000/api/articles` (test it in Postman/HTTPie!).
// However, the articles do not come organized in a single, neat array. Inspect the response closely!
// Create a card from each and every article object in the response, using the Card component.
// Append each card to the element in the DOM that matches the selector passed to the function.
//

//FUnction to implement css selector
const cardAppender = (selector) => {
  const array = ["javascript", "bootstrap", "technology", "jquery", "node"];
  axios
    .get(`https://lambda-times-api.herokuapp.com/articles`)
    .then((res) => {
      array.forEach((topic) => {
        res.data.articles[topic].forEach((el) => {
          const newDiv = Card(el);
          document.querySelector(selector).appendChild(newDiv);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
export { Card, cardAppender };
