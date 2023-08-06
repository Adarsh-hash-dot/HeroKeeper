const heroData = JSON.parse(localStorage.getItem("heroInfo"))
const heroHtml = getHeroHtml(heroData)
document.getElementById('heroInfo').innerHTML = heroHtml



function getHeroHtml(data) {
  const url =  data.thumbnail.path + "/portrait_medium." + data.thumbnail.extension;

  return `<section class="section">
    <div class="container">
      <div class="columns">
        <!-- Product Image Column -->
        <div class="column is-one-third">
          <img src="${url}" width="100%" alt="Product Image">
        </div>

        <!-- Product Description Column -->
        <div class="column is-two-thirds">
          <div class="buttons is-flex is-justify-content-flex-end">
          <button id="fav-${data.id}" class="button is-danger" onclick="handleFav()">	&hearts;</button>
          </div>
          <h1 class="title">${data.name}</h1>
          <p class="subtitle">@${data.name}</p>
          <p> ${data.description == "" ? "A Mystery Hero. Information is not available. " : data.description }</p>
          <p>${getList(data.events.items, "Events")}</p>
          <p>${getList(data.series.items, "Series")}</p>
          <p>${getList(data.comics.items, "Comics")}</p>
        </div>
      </div>
    </div>
</section>`}

function getList(data, type) {
  let listHtml = ``
  data.forEach(element => {
    listHtml += `<li>${element.name}</li>`
  });
  return `
    <div class="mt-4 content">
      <span class="subtitle">${data.length == 0 ? "" : type}</span>
      <ul>
        ${listHtml}
      </ul>
    </div>
  `
}

function handleFav() {
  localStorage.setItem(heroData.id,JSON.stringify(heroData))
  alert("Hero is added to Favorite!")
}