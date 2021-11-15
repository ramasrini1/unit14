const MISSING_IMAGE_URL = "http://tinyurl.com/missing-tv";

/** Given a query string, return array of matching shows:
 *     { id, name, summary, episodesUrl }
 */


/** Search Shows
 *    - given a search term, search for tv shows that
 *      match that query.  The function is async show it
 *       will be returning a promise.
 *
 *   - Returns an array of objects. Each object should include
 *     following show information:
 *    {
        id: <show id>,
        name: <show name>,
        summary: <show summary>,
        image: <an image from the show data, or a default imege if no image exists, (image isn't needed until later)>
      }
 */
async function searchShows(query) {
  // TODO: Make an ajax request to the searchShows api.  Remove
  // hard coded data.
  let baseURL = "https://api.tvmaze.com/search/shows?";
 
  let res = await axios.get(`${baseURL}`, { 
    params: { 
      q: query
    } 
  });
  
  //console.log(`id: ${id} name: ${name} summary: ${summary} url: ${url}`);
  let content = res.data;
  let shows = [];
  for (let i =0; i<content.length; i++){
    shows[i]= { id:      content[i].show.id, 
                name:    content[i].show.name,
                summary: content[i].show.summary,
                image: content[i].show.image ? content[i].show.image.medium : MISSING_IMAGE_URL,
              }
  }
  return shows;  
}



/** Populate shows list:
 *     - given list of shows, add shows to DOM
 */

function populateShows(shows) {
  const $showsList = $("#shows-list");
  $showsList.empty();

  for (let show of shows) {
    let $item = $(
      `<div class="col-md-6 col-lg-3 Show" data-show-id="${show.id}">
         <div class="card" data-show-id="${show.id}">
         <img class="card-img-top" src="${show.image}">
           <div class="card-body">
             <h5 class="card-title">${show.name}</h5>
             <p class="card-text">${show.summary}</p>
           </div>
           <button class="btn btn-primary get-episodes">Episodes</button>
         </div>
       </div>
      `);

    $showsList.append($item);
  }
}


/** Handle search form submission:
 *    - hide episodes area
 *    - get list of matching shows and show in shows list
 */

$("#search-form").on("submit", async function handleSearch (evt) {
  evt.preventDefault();

  let query = $("#search-query").val();
  if (!query) return;

  $("#episodes-area").hide();

  let shows = await searchShows(query);

  populateShows(shows);
});


/** Given a show ID, return list of episodes:
 *      { id, name, season, number }
 */

async function getEpisodes(id) {
  // TODO: get episodes from tvmaze
  //       you can get this by making GET request to
  //       http://api.tvmaze.com/shows/SHOW-ID-HERE/episodes

  // TODO: return array-of-episode-info, as described in docstring above
  let baseURL = `https://api.tvmaze.com/shows/${id}/episodes`;
 
  let res = await axios.get(`${baseURL}`);
  let content = res.data;
  //console.log(res.data);
  
  /** 
  let episodes = [];
  for (let i =0; i<content.length; i++){
    episodes[i] = {
      name: content[i].name,
      season: content[i].season,
      number: content[i].number
    }
  }
  **/
  //using arrow functions
  let episodes = res.data.map(episode => ({
    id: episode.id,
    name: episode.name,
    season: episode.season,
    number: episode.number,
  }));
  return episodes;  
}

function populateEpisodes(episodes) {
  const $episodeList = $("#episodes-list");
  $episodeList.empty();
  $("#episodes-area").show();
  for (let episode of episodes){
    let $item = $(
      `<li>${episode.name}
           ${episode.season}
           ${episode.number}
        </li>`
    );
    $episodeList.append($item);
  }
  $("#episodes-area").show();

}

/** Handle click on show name. */
$("#shows-list").on("click", ".get-episodes", async function handleEpisodes (evt) {
  evt.preventDefault();
  //alert("handle btn");
  let showId = $(evt.target).closest(".Show").data("show-id");
  let episodes = await getEpisodes(showId);
  populateEpisodes(episodes);

});
