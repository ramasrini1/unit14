console.log("Let's get this party started!");
let apiKey = "60P7tOS8X4991rkYVEGqQHBl51i3NLxM";
let gifArea = document.querySelector("#gif-area");

function addGif(content){
  
  let div = document.createElement("div");
  div.classList.add("col-md-4");
  div.classList.add("col-12");
  //div.classList.add("mb-2");
  //div.classList.add("m-2");
  
  let fig = document.createElement('figure');
  let img = document.createElement('img');
  let fc  = document.createElement('figcaption');
  img.src = content.data[0].images.original.url;
  img.alt = content.data[0].title;
  img.width = "500";
  img.height = "500";
  fc.textContent = content.data[0].title;
  fig.appendChild(img);
  fig.appendChild(fc);
 
  div.appendChild(fig);
  gifArea.appendChild(div);

}

/* handle form submission: clear search box & make ajax call */
let btn = document.querySelector("#searchBtn");
btn.addEventListener('click', async function(e){
  e.preventDefault();
  let searchKey = document.querySelector("#search").value.trim();
  document.querySelector("#search").value = "";
  
  let res = await axios.get(`https://api.giphy.com/v1/gifs/search`, { 
    params: { 
      api_key: apiKey, 
      q: searchKey
    } 
  });
  addGif(res.data);

});

let delBtn = document.querySelector("#removeBtn");
delBtn.addEventListener('click', function(e){
  e.preventDefault();
  //alert("remove btn");
  gifArea.innerHTML = "";
});
