export interface Sponsor {
  name: string;
  src: string;
  w: number;   // tamanho real do arquivo
  h: number;
  show: number; // altura exibida na faixa (px), equilibra o peso visual de cada logo
}

export const SPONSORS: Sponsor[] = [
  { name: "S/M Creative",   src: "/img/patrocinadores/sm-creative.png",    w: 640, h: 688, show: 84 },
  { name: "O Boticário",    src: "/img/patrocinadores/oboticario.png",     w: 900, h: 116, show: 30 },
  { name: "Maria Festeira", src: "/img/patrocinadores/maria-festeira-v2.png", w: 633, h: 403, show: 70 },
  { name: "Play Sonora",    src: "/img/patrocinadores/play-sonora-v2.png",    w: 809, h: 159, show: 46 },
  { name: "Avatim",         src: "/img/patrocinadores/avatim.png",         w: 479, h: 421, show: 74 },
];
