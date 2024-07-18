const baseURL = 'http://localhost:3000';

// Callbacks
function handleClick(ramen) {
  // Add Code
  let detailImg = document.querySelector("#ramen-detail .detail-image");
  let detailName = document.querySelector("#ramen-detail .name");
  let detailRestaurant = document.querySelector("#ramen-detail .restaurant");
  let detailsRating = document.getElementById("rating-display");
  let detailsComment = document.getElementById("comment-display");

  detailImg.src = ramen.image;
  detailName.textContent = ramen.name;
  detailRestaurant.textContent = ramen.restaurant;
  detailsRating.textContent = ramen.rating.toString();
  detailsComment.textContent = ramen.comment;
}

function addSubmitListener() {
  // Add Code
  let ramenForm = document.getElementById('new-ramen');

  ramenForm.onsubmit = function(event) {
    event.preventDefault();

    let newRamen = {
      name: event.target['new-name'].value,
      restaurant: event.target['new-restaurant'].value,
      image: event.target['new-image'].value,
      rating: event.target['new-rating'].value,
      comment: event.target['new-comment'].value,
    };

    let img = document.createElement('img');
    img.src = newRamen.image;
    img.onclick = function() {
      handleClick(newRamen);
    };

    let ramenMenuDiv = document.getElementById('ramen-menu');
    ramenMenuDiv.appendChild(img);

    event.target.reset();
  };
}

async function displayRamens() {
  // Add Code
  let ramenMenuDiv = document.getElementById('ramen-menu');

  const response = await fetch(`${baseURL}/ramens`);
  const ramens = await response.json();

  ramens.forEach(ramen => {
    let img = document.createElement('img');
    img.src = ramen.image;
    img.onclick = function() {
      handleClick(ramen);
    };

    ramenMenuDiv.appendChild(img);
  });

  if (ramens.length > 0) {
    handleClick(ramens[0]);
  }
}

function main() {
  document.addEventListener('DOMContentLoaded', function() {
    displayRamens();
    addSubmitListener();
  });
}

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
