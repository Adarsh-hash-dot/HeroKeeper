async function getHeros() {
  const herosContainer = document.getElementById("heroList")
  allCards = ``
   for (let i = 0; i < localStorage.length; i++){
      if (localStorage.key(i) == "heroInfo") {
        continue
      }
      const data = JSON.parse(localStorage.getItem(localStorage.key(i))) 
      const url =
          data.thumbnail.path +
          "/portrait_medium." +
          data.thumbnail.extension;
      allCards += getHtmlCard(url, data.name, data.description, data.id);
  };
  if (allCards == "") {
    herosContainer.innerHTML = `<div class="is-size-4 mt-4 has-text-danger m-auto">No Favorite heroes found. Please Add by searching in home page</div>`;
  } else {
    herosContainer.innerHTML = allCards;
  }
  


  for (let i = 0; i < localStorage.length; i++){
    if (localStorage.key(i) == "heroInfo") {
      continue
    }
    const data = JSON.parse(localStorage.getItem(localStorage.key(i))) 
    const favButton = document.getElementById(`fav-${data.id}`)
    const infoButton = document.getElementById(`info-${data.id}`)
    favButton.addEventListener('click', () => {handleFav(data)})
    infoButton.addEventListener('click', ()=>{handleInfo(data)})
  }
}

function handleFav(data) {
  localStorage.removeItem(data.id)
  alert("Hero is removed from Favorite!")
  getHeros()
}

function handleInfo(data) {
  localStorage.setItem('heroInfo', JSON.stringify(data));
  window.location.href = './hero.html'
}

function getHtmlCard(url, name, description, id) {
  const card = `<div class="column is-one-third"><div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <img src="${url}" alt="Avatar image">
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-left">
        <figure class="image is-48x48">
          <img src="${url}" alt="">
        </figure>
      </div>
      <div class="media-content is-flex is-justify-content-space-between">
        <div>
        <p class="title is-4">${name}</p>
        <p class="subtitle is-6">@${name}</p>
        </div>
        <div>
          <button id="fav-${id}" class="button is-danger is-light">	&#10060;</button>
        </div>
      </div>
    </div>
    <div class="buttons is-flex is-justify-content-flex-end">
        <button id="info-${id}" class="button is-info is-light">More Info</button>
      
    </div>

    <div class="content mt-3">
      ${description == "" ? "A Mystery Hero. Information is not available. " : description }
    </div>
  </div>
  </div>
  </div>`;

  return card;
}


getHeros()