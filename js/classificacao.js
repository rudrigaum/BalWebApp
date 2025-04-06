export function calcularClassificacao(jogos) {
    const times = {};
  
    jogos.forEach(({ casa, fora, golsCasa, golsFora }) => {
      if (!times[casa]) times[casa] = novaLinha(casa);
      if (!times[fora]) times[fora] = novaLinha(fora);
  
      times[casa].pj++;
      times[fora].pj++;
  
      times[casa].gp += golsCasa;
      times[casa].gc += golsFora;
      times[fora].gp += golsFora;
      times[fora].gc += golsCasa;
  
      if (golsCasa > golsFora) {
        times[casa].v++;
        times[fora].d++;
      } else if (golsCasa < golsFora) {
        times[fora].v++;
        times[casa].d++;
      } else {
        times[casa].e++;
        times[fora].e++;
      }
    });
  
    return Object.values(times).map(t => ({
      ...t,
      sg: t.gp - t.gc,
      pts: t.v * 3 + t.e
    })).sort((a, b) => b.pts - a.pts || b.sg - a.sg);
  }
  
  function novaLinha(nome) {
    return { nome, pj: 0, v: 0, e: 0, d: 0, gp: 0, gc: 0 };
  }
  