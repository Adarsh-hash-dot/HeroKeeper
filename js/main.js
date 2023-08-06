const md5 = CryptoJS.MD5;
console.log(md5("text to hash").toString());

const privateKey = "56f7f7254c59e7e91bb57b345758adef03c0f259";
const publicKey = "bb4ec812a6a11d282abf49e2fbb84daa";
const domain = "developer.marvel.com";
const dashboardUrl = "https://developer.marvel.com/account";
const hash = md5("1" + privateKey + publicKey).toString();

const herosContainer = document.getElementById("heros");
const inputElement = document.getElementById("heroInput");

async function getHeros() {
    const query = document.getElementById("heroInput").value
    if (query == "") {
      herosContainer.innerHTML = `<div class="is-size-1 has-text-danger-light m-auto">Search For Heros</div>`;
      return 
    }
    herosContainer.innerHTML = `<div class="lds-ellipsis m-auto"><div></div><div></div><div></div><div></div></div>`
    const response = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${query}&apikey=${publicKey}&hash=${hash}&ts=1`
    ).then(async (res) => await res.json());
    const dataArray = response.data.results;
    let allCards = "";
    if (dataArray.length == 0) {
      herosContainer.innerHTML = `<div class="is-size-1 has-text-danger m-auto">No heroes found for the given input</div>`;
      return 
    }

    dataArray.forEach((data) => {
        const url =
            data.thumbnail.path +
            "/portrait_medium." +
            data.thumbnail.extension;
        allCards += getHtmlCard(url, data.name, data.description, data.id);
    });
    console.log(dataArray)
    console.log(query)

    herosContainer.innerHTML = allCards;

    dataArray.forEach((data)=>{
      const favButton = document.getElementById(`fav-${data.id}`)
      const infoButton = document.getElementById(`info-${data.id}`)
      favButton.addEventListener('click', () => {handleFav(data)})
      infoButton.addEventListener('click', ()=>{handleInfo(data)})
    })
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
            <button id="fav-${id}" class="button is-danger">	&hearts;</button>
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

function handleFav(data) {
  localStorage.setItem(data.id,JSON.stringify(data))
  alert("Hero is added to Favorite!")
}

function handleInfo(data) {
  localStorage.setItem('heroInfo', JSON.stringify(data));
  window.location.href = './hero.html'
}


//this method calls fetches heros every thime user inputs
inputElement.oninput = getHeros


