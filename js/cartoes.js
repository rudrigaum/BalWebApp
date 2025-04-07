export function preencherCartoes(jogos) {
    const contagem = {};
  
    jogos.forEach(jogo => {
      (jogo.cartoes || []).forEach(c => {
        if (!contagem[c.jogador]) {
          contagem[c.jogador] = { amarelo: 0, vermelho: 0, azul: 0 };
        }
        contagem[c.jogador][c.tipo]++;
      });
    });
  
    const container = document.getElementById("lista-cartoes");
    container.innerHTML = "";
  
    const jogadores = Object.entries(contagem)
      .sort(([, a], [, b]) =>
        b.vermelho - a.vermelho || b.amarelo - a.amarelo || b.azul - a.azul
      );
  
    jogadores.forEach(([jogador, tipos]) => {
      const item = document.createElement("div");
      item.className = "p-2 border-b flex justify-between text-sm";
      item.innerHTML = `
        <span class="font-medium">${jogador}</span>
        <span>🟨 ${tipos.amarelo} 🟥 ${tipos.vermelho} 🟦 ${tipos.azul}</span>
      `;
      container.appendChild(item);
    });
  }
  