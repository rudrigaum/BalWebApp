import { escudos } from "./dados.js";

export function preencherResultados(jogos) {
  const resultadosDiv = document.getElementById("resultados-body");
  resultadosDiv.innerHTML = "";

  const porData = agruparPorData(jogos);

  Object.keys(porData).sort().forEach((data, idx) => {
    const rodada = document.createElement("div");
    rodada.className = "mb-4";
    rodada.innerHTML = `<h3 class="font-semibold text-gray-700 mb-2">Rodada ${idx + 1} - ${formatarData(data)}</h3>`;

    porData[data].forEach(jogo => {
      const item = document.createElement("div");
      item.className = "bg-white shadow-sm rounded mb-1 px-3 py-2 text-sm";
      item.innerHTML = `
        <div class="flex justify-between items-center">
          <div class="flex items-center gap-2">
            <img src="${escudos[jogo.casa]}" class="w-6 h-6" />
            <span>${jogo.casa}</span>
          </div>
          <span class="font-bold">${jogo.golsCasa} x ${jogo.golsFora}</span>
          <div class="flex items-center gap-2">
            <span>${jogo.fora}</span>
            <img src="${escudos[jogo.fora]}" class="w-6 h-6" />
          </div>
        </div>
        <div class="text-xs text-gray-600 mt-1">
          ${jogo.casa}: ${jogo.marcadoresCasa.join(", ") || "—"}<br>
          ${jogo.fora}: ${jogo.marcadoresFora.join(", ") || "—"}
        </div>
      `;
      rodada.appendChild(item);
    });

    resultadosDiv.appendChild(rodada);
  });
}

function agruparPorData(jogos) {
  return jogos.reduce((acc, jogo) => {
    (acc[jogo.data] ||= []).push(jogo);
    return acc;
  }, {});
}

function formatarData(dataStr) {
  const [ano, mes, dia] = dataStr.split("-");
  return `${dia}/${mes}/${ano}`;
}
