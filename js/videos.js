// videos.js

let nextPageToken = null;
const maxResults = 10;
const canalId = "UC0btwBPqDLs8r9zFTcLAQiw";
const apiKey = "AIzaSyAawTI-SgkQJv6NwH66J_cyDrMdoR4DUFM"; // substitua por sua API KEY válida do YouTube

export function preencherVideos() {
  const container = document.getElementById("videos-body");
  container.innerHTML = "";
  nextPageToken = null; // zera ao reabrir a aba
  carregarVideos();
}

export function carregarVideos() {
  const container = document.getElementById("videos-body");

  const url = new URL("https://www.googleapis.com/youtube/v3/search");
  url.searchParams.set("part", "snippet");
  url.searchParams.set("channelId", canalId);
  url.searchParams.set("type", "video");
  url.searchParams.set("order", "date");
  url.searchParams.set("maxResults", maxResults);
  url.searchParams.set("key", apiKey);
  if (nextPageToken) url.searchParams.set("pageToken", nextPageToken);

  fetch(url)
    .then(res => res.json())
    .then(data => {
      nextPageToken = data.nextPageToken;

      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const titulo = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.medium.url;

        const video = document.createElement("div");
        video.className = "mb-4";

        video.innerHTML = `
          <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank" class="block">
            <img src="${thumbnail}" alt="${titulo}" class="w-full rounded mb-1" />
            <p class="text-sm">${titulo}</p>
          </a>
        `;
        container.appendChild(video);
      });

      mostrarBotaoCarregarMais();
    })
    .catch(err => {
      console.error("Erro ao carregar vídeos:", err);
      container.innerHTML = `<p class="text-red-500">Erro ao carregar vídeos.</p>`;
    });
}

function mostrarBotaoCarregarMais() {
  let btn = document.getElementById("carregar-mais-videos");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "carregar-mais-videos";
    btn.textContent = "Carregar mais vídeos";
    btn.className = "mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700";
    btn.addEventListener("click", carregarVideos);
    document.getElementById("videos-body").appendChild(btn);
  }

  if (!nextPageToken) {
    btn.style.display = "none";
  } else {
    btn.style.display = "block";
  }
}