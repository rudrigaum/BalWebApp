// js/calendario.js

import { escudos } from "./dados.js";

export function preencherCalendario(jogos) {
  const calendario = document.getElementById("calendario-body");
  calendario.innerHTML = "";

  const porRodada = {};
  jogos.forEach(jogo => {
    const chave = `Rodada ${jogo.rodada}`;
    if (!porRodada[chave]) porRodada[chave] = [];
    porRodada[chave].push(jogo);
  });

  Object.entries(porRodada).forEach(([rodada, partidas]) => {
    const secao = document.createElement("div");
    secao.innerHTML = `
      <h2 class="text-lg font-semibold mt-4">${rodada} - ${partidas[0].data}</h2>
      <div class="bg-white shadow rounded p-3 divide-y">
        ${partidas.map(jogo => `
          <div class="flex justify-between items-center py-2">
            <div class="flex items-center gap-2">
              <img src="${escudos[jogo.casa]}" alt="${jogo.casa}" class="w-6 h-6">
              <span>${jogo.casa}</span>
            </div>
            <span class="text-sm text-gray-500">vs</span>
            <div class="flex items-center gap-2">
              <span>${jogo.fora}</span>
              <img src="${escudos[jogo.fora]}" alt="${jogo.fora}" class="w-6 h-6">
            </div>
          </div>
        `).join("")}
      </div>
    `;
    calendario.appendChild(secao);
  });
}