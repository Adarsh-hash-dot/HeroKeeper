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
        allCards += getHtmlCard(url, data.name, data.description);
    });
    console.log(query)

    herosContainer.innerHTML = allCards;
}

function getHtmlCard(url, name, description) {
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
        <div class="media-content">
          <p class="title is-4">${name}</p>
          <p class="subtitle is-6">@${name}</p>
        </div>
      </div>

      <div class="content mt-3">
        ${description == "" ? "No discription available" : discription }
      </div>
    </div>
    </div>
    </div>`;

    return card;
}

inputElement.oninput = getHeros


