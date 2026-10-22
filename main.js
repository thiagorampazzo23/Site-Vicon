(function () {
  'use strict';

  var WHATSAPP = '5547991818758';
  var FUNDACAO = 2015;
  var OBRAS_INICIAIS = 9;

  function esc(texto) {
    return String(texto == null ? '' : texto).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- Anos de mercado e ano atual ---------- */
  var anoAtual = new Date().getFullYear();
  document.querySelectorAll('.js-anos').forEach(function (el) { el.textContent = anoAtual - FUNDACAO; });
  document.querySelectorAll('.js-ano-atual').forEach(function (el) { el.textContent = anoAtual; });

  /* ---------- Topo ---------- */
  var topo = document.getElementById('topo');
  function aoRolar() { topo.classList.toggle('topo--solido', window.scrollY > 24); }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  /* ---------- Menu mobile ---------- */
  var botaoMenu = document.querySelector('.menu-botao');
  var menu = document.getElementById('menu');

  function definirMenu(aberto) {
    document.body.classList.toggle('menu-aberto', aberto);
    botaoMenu.setAttribute('aria-expanded', String(aberto));
    botaoMenu.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  }
  botaoMenu.addEventListener('click', function () {
    definirMenu(!document.body.classList.contains('menu-aberto'));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) definirMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('menu-aberto')) definirMenu(false);
  });

  /* ---------- Link ativo no menu ---------- */
  var linksMenu = menu.querySelectorAll('a[href^="#"]:not(.btn)');
  if ('IntersectionObserver' in window) {
    var obsSecoes = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        linksMenu.forEach(function (link) {
          link.classList.toggle('ativo', link.getAttribute('href') === '#' + entrada.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    document.querySelectorAll('main section[id]').forEach(function (s) { obsSecoes.observe(s); });
  }

  /* ---------- Animação de entrada ---------- */
  var obsRevelar = 'IntersectionObserver' in window && new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (!entrada.isIntersecting) return;
      var el = entrada.target;
      // pequeno atraso em cascata para itens lado a lado
      var irmaos = Array.prototype.filter.call(el.parentElement.children, function (c) {
        return c.hasAttribute('data-revelar') && !c.hidden;
      });
      el.style.transitionDelay = Math.min(Math.max(irmaos.indexOf(el), 0), 5) * 70 + 'ms';
      el.classList.add('visivel');
      obsRevelar.unobserve(el);
    });
  }, { rootMargin: '0px 0px -8% 0px' });

  function observarRevelar() {
    document.querySelectorAll('[data-revelar]:not(.visivel)').forEach(function (el) {
      if (obsRevelar) obsRevelar.observe(el);
      else el.classList.add('visivel');
    });
  }

  /* ---------- Portfólio ---------- */
  var obras = (window.OBRAS || []).filter(function (o) { return o && o.fotos && o.fotos.length; });
  var grade = document.getElementById('obras');
  var filtros = document.getElementById('filtros');
  var botaoMais = document.getElementById('obras-mais');
  var categoriaAtual = '';
  var mostrarTodas = false;
  var JANELA_SVG = '<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="8" y="6" width="32" height="36"/><path d="M24 6v36M8 30c5.3-2 10.7-2 16 0s10.7 2 16 0"/></svg>';

  function temFicha(obra) {
    return Boolean(obra.titulo || obra.local || obra.descricao || obra.construtora || obra.arquitetura);
  }

  // Todas as fotos em sequência: a galeria passa de uma obra para a próxima.
  var slides = [];
  var inicioDaObra = [];
  obras.forEach(function (obra, i) {
    inicioDaObra[i] = slides.length;
    obra.fotos.forEach(function (foto, n) { slides.push({ obra: obra, indice: i, foto: foto, n: n }); });
  });

  function cartaoObra(obra, i) {
    var ficha = temFicha(obra);
    var botao = document.createElement('button');
    botao.type = 'button';
    botao.className = 'obra' + (ficha ? ' obra--info' : '');
    botao.dataset.categoria = obra.categoria || '';
    botao.setAttribute('data-revelar', '');
    botao.setAttribute('aria-label', obra.titulo ? 'Ver fotos da obra ' + obra.titulo : 'Ampliar foto da obra ' + (i + 1));
    var tamanho = obra.tamanho ? ' width="' + obra.tamanho[0] + '" height="' + obra.tamanho[1] + '"' : '';
    var legenda = [obra.categoria, obra.ano].filter(Boolean).join(' · ');
    botao.innerHTML =
      '<img src="' + esc(obra.capa || obra.fotos[0]) + '" alt=""' + tamanho + ' loading="lazy">' +
      (ficha ? '<span class="obra__info">' +
        (legenda ? '<span class="obra__cat">' + esc(legenda) + '</span>' : '') +
        (obra.titulo ? '<span class="obra__titulo">' + esc(obra.titulo) + '</span>' : '') +
        (obra.local ? '<span class="obra__local">' + esc(obra.local) + '</span>' : '') +
      '</span>' : '') +
      '<span class="obra__lupa" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 6v12M6 12h12"/></svg></span>';
    botao.addEventListener('click', function () { abrirGaleria(inicioDaObra[i]); });
    return botao;
  }

  function cartaoVago() {
    var el = document.createElement('div');
    el.className = 'obra obra--vaga';
    el.setAttribute('data-revelar', '');
    el.innerHTML = JANELA_SVG;
    return el;
  }

  function atualizarGrade() {
    var total = 0;
    grade.querySelectorAll('.obra:not(.obra--vaga)').forEach(function (card) {
      var combina = !categoriaAtual || card.dataset.categoria === categoriaAtual;
      card.hidden = !combina || (!mostrarTodas && total >= OBRAS_INICIAIS);
      if (combina) total++;
    });
    botaoMais.hidden = mostrarTodas || total <= OBRAS_INICIAIS;
    botaoMais.querySelector('span').textContent = 'Ver todas as obras (' + total + ')';
  }

  if (obras.length) {
    obras.forEach(function (obra, i) { grade.appendChild(cartaoObra(obra, i)); });
    atualizarGrade();
  } else {
    for (var v = 0; v < 6; v++) grade.appendChild(cartaoVago());
  }

  botaoMais.addEventListener('click', function () {
    mostrarTodas = true;
    atualizarGrade();
  });

  var categorias = obras.map(function (o) { return o.categoria; }).filter(function (c, i, lista) {
    return c && lista.indexOf(c) === i;
  });
  if (categorias.length > 1) {
    ['Todas'].concat(categorias).forEach(function (cat, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'filtro';
      b.textContent = cat;
      b.setAttribute('aria-pressed', String(i === 0));
      b.addEventListener('click', function () {
        filtros.querySelectorAll('.filtro').forEach(function (f) { f.setAttribute('aria-pressed', String(f === b)); });
        categoriaAtual = i === 0 ? '' : cat;
        atualizarGrade();
      });
      filtros.appendChild(b);
    });
    filtros.hidden = false;
  }

  /* ---------- Galeria ---------- */
  var modal = document.getElementById('modal-obra');
  var modalImg = document.getElementById('modal-img');
  var miniaturas = document.getElementById('modal-miniaturas');
  var contador = document.getElementById('modal-contador');
  var slideAtual = 0;
  var obraNaTela = null;

  function preencherObra(obra, indice) {
    obraNaTela = obra;
    modal.classList.toggle('modal--so-foto', !temFicha(obra));
    document.getElementById('modal-categoria').textContent = [obra.categoria, obra.ano].filter(Boolean).join(' · ');
    document.getElementById('modal-titulo').textContent = obra.titulo || '';
    document.getElementById('modal-local').textContent = obra.local || '';
    document.getElementById('modal-descricao').textContent = obra.descricao || '';

    var ficha = [
      ['Construtora', obra.construtora],
      ['Arquitetura', obra.arquitetura],
      ['Produtos', (obra.produtos || []).join(', ')]
    ].filter(function (linha) { return linha[1]; });
    document.getElementById('modal-ficha').innerHTML = ficha.map(function (linha) {
      return '<dt>' + esc(linha[0]) + '</dt><dd>' + esc(linha[1]) + '</dd>';
    }).join('');

    miniaturas.innerHTML = obra.fotos.length > 1 ? obra.fotos.map(function (src, n) {
      return '<button type="button" aria-label="Ver foto ' + (n + 1) + '"><img src="' + esc(src) + '" alt="" loading="lazy"></button>';
    }).join('') : '';
    miniaturas.querySelectorAll('button').forEach(function (b, n) {
      b.addEventListener('click', function () { mostrarSlide(inicioDaObra[indice] + n); });
    });
  }

  function mostrarSlide(k) {
    slideAtual = (k + slides.length) % slides.length;
    var s = slides[slideAtual];
    if (s.obra !== obraNaTela) preencherObra(s.obra, s.indice);
    modalImg.classList.add('carregando');
    modalImg.src = s.foto;
    modalImg.alt = (s.obra.titulo || 'Obra entregue pela Vicon Esquadrias') + (s.obra.fotos.length > 1 ? ' — foto ' + (s.n + 1) : '');
    contador.textContent = (slideAtual + 1) + ' / ' + slides.length;
    miniaturas.querySelectorAll('button').forEach(function (b, n) { b.setAttribute('aria-current', String(n === s.n)); });
    // pré-carrega as vizinhas para a navegação ficar instantânea
    [slideAtual + 1, slideAtual - 1].forEach(function (j) {
      new Image().src = slides[(j + slides.length) % slides.length].foto;
    });
  }

  function abrirGaleria(k) {
    var varias = slides.length > 1;
    modal.querySelectorAll('.modal__nav').forEach(function (b) { b.hidden = !varias; });
    contador.hidden = !varias;
    obraNaTela = null;
    mostrarSlide(k);
    document.body.classList.add('modal-aberto');
    modal.showModal();
  }

  modalImg.addEventListener('load', function () { modalImg.classList.remove('carregando'); });
  modal.querySelector('.modal__nav--ant').addEventListener('click', function () { mostrarSlide(slideAtual - 1); });
  modal.querySelector('.modal__nav--prox').addEventListener('click', function () { mostrarSlide(slideAtual + 1); });
  modal.querySelector('.modal__fechar').addEventListener('click', function () { modal.close(); });
  // clicar fora da foto fecha a galeria
  modal.addEventListener('click', function (e) {
    if (e.target === modal || e.target.matches('.modal--so-foto .modal__corpo, .modal--so-foto .modal__galeria')) modal.close();
  });
  modal.addEventListener('close', function () { document.body.classList.remove('modal-aberto'); });
  modal.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') mostrarSlide(slideAtual - 1);
    if (e.key === 'ArrowRight') mostrarSlide(slideAtual + 1);
  });

  // deslizar o dedo para trocar de foto no celular
  var toqueX = null;
  modal.addEventListener('touchstart', function (e) { toqueX = e.touches[0].clientX; }, { passive: true });
  modal.addEventListener('touchend', function (e) {
    if (toqueX === null) return;
    var dx = e.changedTouches[0].clientX - toqueX;
    if (Math.abs(dx) > 50 && slides.length > 1) mostrarSlide(slideAtual + (dx < 0 ? 1 : -1));
    toqueX = null;
  });

  /* ---------- Clientes ---------- */
  var clientes = (window.CLIENTES || []).filter(function (c) { return c && c.logo; });
  var listaClientes = document.getElementById('clientes-lista');

  if (clientes.length) {
    clientes.forEach(function (c) {
      var li = document.createElement('li');
      li.className = 'cliente';
      li.setAttribute('data-revelar', '');
      if (c.fundo) li.style.setProperty('--fundo', c.fundo);
      if (c.nome) li.title = c.nome;
      var img = '<img src="' + esc(c.logo) + '" alt="' + esc(c.nome || 'Cliente da Vicon Esquadrias') + '" loading="lazy">';
      li.innerHTML = c.site ? '<a href="' + esc(c.site) + '" target="_blank" rel="noopener">' + img + '</a>' : img;
      listaClientes.appendChild(li);
    });
  } else {
    for (var k = 0; k < 6; k++) {
      var vaga = document.createElement('li');
      vaga.className = 'cliente cliente--vaga';
      vaga.setAttribute('data-revelar', '');
      vaga.innerHTML = '<span>Logo</span>';
      listaClientes.appendChild(vaga);
    }
  }

  observarRevelar();

  /* ---------- Horário de atendimento (fuso de Brasília) ---------- */
  var status = document.getElementById('status-atendimento');
  try {
    var partes = {};
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo', weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date()).forEach(function (p) { partes[p.type] = p.value; });
    var minutos = parseInt(partes.hour, 10) * 60 + parseInt(partes.minute, 10);
    var semana = [[420, 720], [795, 1080]];
    var expediente = { Mon: semana, Tue: semana, Wed: semana, Thu: semana, Fri: [[420, 1080]] }[partes.weekday] || [];
    var aberto = expediente.some(function (j) { return minutos >= j[0] && minutos < j[1]; });
    status.textContent = aberto ? 'Atendimento aberto agora' : 'Fora do horário — deixe sua mensagem';
    status.classList.toggle('status--aberto', aberto);
    status.hidden = false;
  } catch (e) { /* navegador sem suporte a fuso horário: mantém oculto */ }

  /* ---------- Formulário de orçamento → WhatsApp ---------- */
  var form = document.getElementById('form-orcamento');
  var nota = document.getElementById('form-nota');

  function validar(campo) {
    var vazio = !campo.value.trim();
    campo.setAttribute('aria-invalid', String(vazio));
    campo.closest('.campo').classList.toggle('campo--erro', vazio);
    return !vazio;
  }

  form.querySelectorAll('[required]').forEach(function (campo) {
    campo.addEventListener('input', function () {
      if (campo.getAttribute('aria-invalid') === 'true') validar(campo);
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var obrigatorios = Array.prototype.slice.call(form.querySelectorAll('[required]'));
    var invalidos = obrigatorios.filter(function (campo) { return !validar(campo); });
    if (invalidos.length) {
      invalidos[0].focus();
      return;
    }

    var dados = new FormData(form);
    var linhas = ['Olá, Vicon! Gostaria de solicitar um orçamento.', ''];
    function adicionar(rotulo, valor) {
      valor = (valor || '').toString().trim();
      if (valor) linhas.push('*' + rotulo + ':* ' + valor);
    }
    adicionar('Nome', dados.get('nome'));
    adicionar('Empresa', dados.get('empresa'));
    adicionar('Perfil', dados.get('perfil'));
    adicionar('Cidade da obra', dados.get('cidade'));
    adicionar('Tipo de empreendimento', dados.get('tipo'));
    adicionar('Produtos de interesse', dados.getAll('produtos').join(', '));
    linhas.push('', '*Sobre o projeto:*', dados.get('mensagem').trim());

    window.open('https://wa.me/' + WHATSAPP + '?text=' + encodeURIComponent(linhas.join('\n')), '_blank', 'noopener');
    nota.textContent = 'Pronto! Confira a mensagem no WhatsApp e toque em enviar.';
    nota.classList.add('form__nota--ok');
  });
})();
