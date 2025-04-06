import { jogos } from "./dados.js";
import { calcularClassificacao } from "./classificacao.js";
import { preencherResultados } from "./resultados.js";
import { preencherArtilheiros } from "./artilheiros.js";

document.addEventListener("DOMContentLoaded", () => {
  preencherClassificacao();
  preencherResultados(jogos);
  preencherArtilheiros(jogos);
  ativarAbas();
});

function preencherClassificacao() {
  const tabela = document.getElementById("tabela-body");
  tabela.innerHTML = "";

  calcularClassificacao(jogos).forEach((time, i) => {
    const row = document.createElement("tr");
    row.className = "hover:bg-gray-50";
    row.innerHTML = `
      <td class="px-3 py-2 font-bold">${i + 1}</td>
      <td class="px-3 py-2">${time.nome}</td>
      <td class="px-3 py-2">${time.pj}</td>
      <td class="px-3 py-2">${time.v}</td>
      <td class="px-3 py-2">${time.e}</td>
      <td class="px-3 py-2">${time.d}</td>
      <td class="px-3 py-2">${time.gp}</td>
      <td class="px-3 py-2">${time.gc}</td>
      <td class="px-3 py-2">${time.sg}</td>
      <td class="px-3 py-2 font-semibold">${time.pts}</td>
    `;
    tabela.appendChild(row);
  });
}

function ativarAbas() {
  const botoes = document.querySelectorAll(".tab-button");
  const conteudos = document.querySelectorAll(".tab-content");

  botoes.forEach(btn =>
    btn.addEventListener("click", () => {
      conteudos.forEach(c => c.classList.add("hidden"));
      document.getElementById(btn.dataset.tab).classList.remove("hidden");

      botoes.forEach(b => b.classList.remove("border-b-2", "border-blue-500", "font-semibold"));
      btn.classList.add("border-b-2", "border-blue-500", "font-semibold");
    })
  );

  botoes[0].click();
}
