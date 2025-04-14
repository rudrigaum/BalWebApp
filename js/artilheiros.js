import { escudos } from './dados.js';

export function preencherArtilheiros(jogos) {
  const contagem = {};
  const timesPorJogador = {};

  jogos.forEach(({ marcadoresCasa, marcadoresFora, casa, fora }) => {
    marcadoresCasa.forEach(jogador => {
      contagem[jogador] = (contagem[jogador] || 0) + 1;
      timesPorJogador[jogador] = casa;
    });
    marcadoresFora.forEach(jogador => {
      contagem[jogador] = (contagem[jogador] || 0) + 1;
      timesPorJogador[jogador] = fora;
    });
  });

  const lista = Object.entries(contagem)
    .sort((a, b) => b[1] - a[1])
    .map(([jogador, gols]) => {
      const time = timesPorJogador[jogador];
      const escudo = escudos[time] || "";
      return `
        <li class="flex items-center gap-2 py-1">
          ${escudo ? `<img src="${escudo}" alt="${time}" class="w-5 h-5" />` : ""}
          <span>${jogador} - <strong>${gols}</strong> gol(s)</span>
        </li>
      `;
    })
    .join("");

  document.getElementById("artilheiros").innerHTML = `
    <ul class="text-sm">${lista || "<li>Nenhum gol registrado.</li>"}</ul>
  `;
}