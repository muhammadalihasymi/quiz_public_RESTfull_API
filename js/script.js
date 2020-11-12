const ApiKey = '7a9a7c2883df420fb37e66aebb01af67';
const baseUrl = "https://api.opendota.com/api/";
const Teams = `${baseUrl}teams`;
const Pro = `${baseUrl}proPlayers`;
const Hero = `${baseUrl}heroStats`;

const contents = document.querySelector("#content-list");
const title = document.querySelector(".card-title");

function getListTeams() {
  title.innerHTML = "Dota 2 ESports Team"
  fetch(Teams)
    .then(response => response.json())
    .then(resJson => {
      console.log(resJson);
      let teams = "";
      resJson.forEach(team => {
        teams += `
            <div class="card grey darken-3">
              <table>
                  <tr>
                  <td style="padding-left:20px;"><h4 class="white-text">${team.name}</h4><img src="${team.logo_url}" style="max-width: 40%;" class="grey darken-1"></td>
                  <td>
                  <p class="white-text">
                      Team Tag : ${team.tag}<br>
                      Rating : ${team.rating}<br>
                      Win/Lose : ${team.wins}/${team.losses}
                  </p>
                  </td>
              </tr>
              </table>
            </div>`
      })
      contents.innerHTML = '<div class="row">' + teams + '</div>'
      const detil = document.querySelectorAll('.secondary-content');
      detil.forEach(btn => {
        btn.onclick = (event) => {
          showTeamInfo(event.target.dataset.id);
        }
      })
    }).catch(err => {
      console.error(err);
    })
}

function getListRank() {
  title.innerHTML = "Professional Player DOTA 2"
  fetch(Pro)
    .then(response => response.json())
    .then(resJson => {
      console.log(resJson);
      let proPlayers = "";
      let i = 1;
      resJson.forEach(player => {
        proPlayers += `
          <tr>
              <td style="padding-left:20px;">${i}.</td>
              <td><img src="${player.avatar}" width="30px"></td>
              <td>${player.name}</td>
              <td>${player.steamid}</td>
              <td>${player.loccountrycode}</td>
              <td>${player.team_name}</td>
          </tr>
          `;
        i++;
      });
      contents.innerHTML = `
          <div class="card">
              <table class="stripped responsive-table">
                  <thead>
                      <th></th>
                      <th>Player</th>
                      <th></th>
                      <th>Steam ID</th>
                      <th>Country</th>
                      <th>Team</th>
                  </thead>
                  <tbody>
                      ${proPlayers}
                  </tbody>
              </table>
          </div>
      `;
    }).catch(err => {
      console.error(err);
    })
}

function getListHeroes() {
  title.innerHTML = "Heroes Information"
  fetch(Hero)
    .then(response => response.json())
    .then(resJson => {
      console.log(resJson);
      let proPlayers = "";
      let i = 1;
      resJson.forEach(player => {
        proPlayers += `
          <tr>
              <td style="padding-left:20px;">${i}.</td>
              <td>${player.localized_name}</td>
              <td>${player.primary_attr}</td>
              <td>${player.attack_type}</td>
              <td>${player.roles}</td>
          </tr>
          `;
        i++;
      });
      contents.innerHTML = `
          <div class="card">
              <table class="stripped responsive-table">
                  <thead>
                      <th></th>
                      <th>Heroes</th>
                      <th>Primary Attribut</th>
                      <th>Attack Type</th>
                      <th>Roles</th>
                  </thead>
                  <tbody>
                      ${proPlayers}
                  </tbody>
              </table>
          </div>
      `;
    }).catch(err => {
      console.error(err);
    })
}

function loadPage(page) {
  switch (page) {
    case "teams":
      getListTeams();
      break;
    case "player":
      getListRank();
      break;
    case "hero":
      getListHeroes();
      break;
  }
}

document.addEventListener('DOMContentLoaded', function () {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
  getListTeams();

  document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
    elm.addEventListener("click", evt => {
      let sidenav = document.querySelector(".sidenav");
      M.Sidenav.getInstance(sidenav).close();
      page = evt.target.getAttribute("href").substr(1);
      loadPage(page);
    })
  })
  var page = window.location.hash.substr(1);
  if (page === "" || page === "!") page === "teams";
  loadPage(page);
});