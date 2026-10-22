/*
  PORTFÓLIO — obras entregues
  ----------------------------------------------------------------
  Cada linha { ... } é uma obra. As 9 primeiras aparecem direto na página;
  as demais ficam no botão "Ver todas as obras".

  Campos:
    fotos    lista de fotos; a primeira é a principal          (obrigatório)
    capa     versão menor da primeira foto, usada na grade     (opcional)
    tamanho  largura e altura da capa em pixels                (opcional)
    titulo, local, categoria, ano, construtora, arquitetura,
    produtos, descricao                                        (opcionais)

  Quando a obra tem título ou descrição, a galeria mostra uma ficha ao lado da foto.
  Exemplo com todos os campos:

  {
    titulo: "Nome do empreendimento",
    local: "Balneário Camboriú – SC",
    categoria: "Residencial",
    ano: 2025,
    construtora: "Nome da construtora",
    produtos: ["Esquadrias", "Fachada Unitizada"],
    descricao: "Texto curto sobre a obra.",
    fotos: ["assets/obras/nome-da-obra-01.jpg", "assets/obras/nome-da-obra-02.jpg"]
  },
*/
window.OBRAS = [
  { fotos: ["assets/obras/obra-01.jpg"], capa: "assets/obras/obra-01-p.jpg", tamanho: [760, 427] },
  { fotos: ["assets/obras/obra-02.jpg"], capa: "assets/obras/obra-02-p.jpg", tamanho: [760, 760] },
  { fotos: ["assets/obras/obra-03.jpg"], capa: "assets/obras/obra-03-p.jpg", tamanho: [760, 950] },
  { fotos: ["assets/obras/obra-04.jpg"], capa: "assets/obras/obra-04-p.jpg", tamanho: [760, 1140] },
  { fotos: ["assets/obras/obra-05.jpg"], capa: "assets/obras/obra-05-p.jpg", tamanho: [760, 1085] },
  { fotos: ["assets/obras/obra-06.jpg"], capa: "assets/obras/obra-06-p.jpg", tamanho: [760, 1013] },
  { fotos: ["assets/obras/obra-07.jpg"], capa: "assets/obras/obra-07-p.jpg", tamanho: [760, 760] },
  { fotos: ["assets/obras/obra-08.jpg"], capa: "assets/obras/obra-08-p.jpg", tamanho: [760, 989] },
  { fotos: ["assets/obras/obra-09.jpg"], capa: "assets/obras/obra-09-p.jpg", tamanho: [760, 939] },
  { fotos: ["assets/obras/obra-10.jpg"], capa: "assets/obras/obra-10-p.jpg", tamanho: [760, 580] },
  { fotos: ["assets/obras/obra-11.jpg"], capa: "assets/obras/obra-11-p.jpg", tamanho: [760, 760] },
  { fotos: ["assets/obras/obra-12.jpg"], capa: "assets/obras/obra-12-p.jpg", tamanho: [760, 627] },
  { fotos: ["assets/obras/obra-13.jpg"], capa: "assets/obras/obra-13-p.jpg", tamanho: [750, 1000] },
  { fotos: ["assets/obras/obra-14.jpg"], capa: "assets/obras/obra-14-p.jpg", tamanho: [760, 949] },
  { fotos: ["assets/obras/obra-15.jpg"], capa: "assets/obras/obra-15-p.jpg", tamanho: [650, 800] },
  { fotos: ["assets/obras/obra-16.jpg"], capa: "assets/obras/obra-16-p.jpg", tamanho: [614, 976] },
  { fotos: ["assets/obras/obra-17.jpg"], capa: "assets/obras/obra-17-p.jpg", tamanho: [600, 1000] },
  { fotos: ["assets/obras/obra-18.jpg"], capa: "assets/obras/obra-18-p.jpg", tamanho: [576, 838] },
  { fotos: ["assets/obras/obra-19.jpg"], capa: "assets/obras/obra-19-p.jpg", tamanho: [536, 946] },
  { fotos: ["assets/obras/obra-20.jpg"], capa: "assets/obras/obra-20-p.jpg", tamanho: [450, 800] },
  { fotos: ["assets/obras/obra-21.jpg"], capa: "assets/obras/obra-21-p.jpg", tamanho: [760, 381] },
  { fotos: ["assets/obras/obra-22.jpg"], capa: "assets/obras/obra-22-p.jpg", tamanho: [350, 727] },
  { fotos: ["assets/obras/obra-23.jpg"], capa: "assets/obras/obra-23-p.jpg", tamanho: [342, 600] },
];
