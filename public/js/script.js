function fetchImage() {
  fetch(
    `https://api.unsplash.com/search/photos?page=1&query=coding&client_id=80tj7tX42Kl46DGHbJddmhVHFB4dHvlQpKUR34E-lh8`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayImage(data)
    });
}
fetchImage()
function displayImage(data) {
  document.getElementById("im3").src = data.results[0].urls.small
  document.getElementById("im2").src = data.results[2].urls.small
}