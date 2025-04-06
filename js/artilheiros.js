export function preencherArtilheiros(jogos) {
    const contagem = {};
  
    jogos.forEach(({ marcadoresCasa, marcadoresFora }) => {
      [...marcadoresCasa, ...marcadoresFora].forEach(jogador => {
        contagem[jogador] = (contagem[jogador] || 0) + 1;
      });
    });
  
    const lista = Object.entries(contagem)
      .sort((a, b) => b[1] - a[1])
      .map(([jogador, gols]) => `<li class="py-1">${jogador} - <strong>${gols}</strong> gol(s)</li>`)
      .join("");
  
    document.getElementById("artilheiros").innerHTML = `
      <ul class="text-sm">${lista || "<li>Nenhum gol registrado.</li>"}</ul>
    `;
  }
  