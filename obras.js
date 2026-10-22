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
    fotos: ["obras/nome-da-obra-01.jpg", "obras/nome-da-obra-02.jpg"]
  },
*/
window.OBRAS = [
  { fotos: ["obras/obra-01.jpg"], capa: "obras/obra-01-p.jpg", tamanho: [760, 427] },
  { fotos: ["obras/obra-02.jpg"], capa: "obras/obra-02-p.jpg", tamanho: [760, 760] },
  { fotos: ["obras/obra-03.jpg"], capa: "obras/obra-03-p.jpg", tamanho: [760, 950] },
  { fotos: ["obras/obra-04.jpg"], capa: "obras/obra-04-p.jpg", tamanho: [760, 1140] },
  { fotos: ["obras/obra-05.jpg"], capa: "obras/obra-05-p.jpg", tamanho: [760, 1085] },
  { fotos: ["obras/obra-06.jpg"], capa: "obras/obra-06-p.jpg", tamanho: [760, 1013] },
  { fotos: ["obras/obra-07.jpg"], capa: "obras/obra-07-p.jpg", tamanho: [760, 760] },
  { fotos: ["obras/obra-08.jpg"], capa: "obras/obra-08-p.jpg", tamanho: [760, 989] },
  { fotos: ["obras/obra-09.jpg"], capa: "obras/obra-09-p.jpg", tamanho: [760, 939] },
  { fotos: ["obras/obra-10.jpg"], capa: "obras/obra-10-p.jpg", tamanho: [760, 580] },
  { fotos: ["obras/obra-11.jpg"], capa: "obras/obra-11-p.jpg", tamanho: [760, 760] },
  { fotos: ["obras/obra-12.jpg"], capa: "obras/obra-12-p.jpg", tamanho: [760, 627] },
  { fotos: ["obras/obra-13.jpg"], capa: "obras/obra-13-p.jpg", tamanho: [750, 1000] },
  { fotos: ["obras/obra-14.jpg"], capa: "obras/obra-14-p.jpg", tamanho: [760, 949] },
  { fotos: ["obras/obra-15.jpg"], capa: "obras/obra-15-p.jpg", tamanho: [650, 800] },
  { fotos: ["obras/obra-16.jpg"], capa: "obras/obra-16-p.jpg", tamanho: [614, 976] },
  { fotos: ["obras/obra-17.jpg"], capa: "obras/obra-17-p.jpg", tamanho: [600, 1000] },
  { fotos: ["obras/obra-18.jpg"], capa: "obras/obra-18-p.jpg", tamanho: [576, 838] },
  { fotos: ["obras/obra-19.jpg"], capa: "obras/obra-19-p.jpg", tamanho: [536, 946] },
  { fotos: ["obras/obra-20.jpg"], capa: "obras/obra-20-p.jpg", tamanho: [450, 800] },
  { fotos: ["obras/obra-21.jpg"], capa: "obras/obra-21-p.jpg", tamanho: [760, 381] },
  { fotos: ["obras/obra-22.jpg"], capa: "obras/obra-22-p.jpg", tamanho: [350, 727] },
  { fotos: ["obras/obra-23.jpg"], capa: "obras/obra-23-p.jpg", tamanho: [342, 600] },
];
