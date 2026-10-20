export interface Sponsor {
  name: string;
  src: string;
  w: number;   // tamanho real do arquivo
  h: number;
  show: number; // altura exibida na faixa (px), equilibra o peso visual de cada logo
}

export const SPONSORS: Sponsor[] = [
  { name: "S/M Creative",    src: "/img/patrocinadores/sm-creative.png",    w: 640, h: 688, show: 66 },
  { name: "Viviane Silva",   src: "/img/patrocinadores/viviane-silva.png",   w: 700, h: 178, show: 40 },
  { name: "O Boticário",     src: "/img/patrocinadores/oboticario.png",     w: 900, h: 116, show: 28 },
  { name: "Maria Festeira",  src: "/img/patrocinadores/maria-festeira.png", w: 520, h: 520, show: 64 },
  { name: "Edineide Souza",  src: "/img/patrocinadores/edineide-souza.png", w: 520, h: 397, show: 60 },
  { name: "Play Sonora",     src: "/img/patrocinadores/play-sonora.png",    w: 520, h: 520, show: 64 },
  { name: "Avatim",          src: "/img/patrocinadores/avatim.png",         w: 479, h: 421, show: 58 },
];
