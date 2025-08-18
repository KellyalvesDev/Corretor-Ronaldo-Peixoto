// Inicia o carrossel Swiper (somente se existir na página)
if (document.querySelector('.swiper')) {
  const swiper = new Swiper('.swiper', {
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false
    }
  });
}

// Lista de imóveis
const imoveis = [
  { id: 1, bairro: 'Imóvel a venda no Centro', valor: 350000, metragem: 85, quartos: 3, vagas: 1, imagem: 'imovel 01.jpg', descricao: 'Apartamento 3 quartos no Centro, com ótima iluminação natural e fácil acesso a comércios e serviços.' },
  { id: 2, bairro: 'Casa excelente no Jardins', valor: 450000, metragem: 120, quartos: 4, vagas: 2, imagem: 'imovel 02.jpg', descricao: 'Casa com quintal espaçoso nos Jardins, ideal para famílias que gostam de receber visitas e aproveitar áreas externas.' },
  { id: 3, bairro: 'Imóvel a venda no Centro', valor: 250000, metragem: 45, quartos: 1, vagas: 0, imagem: 'imovel 03.jpg', descricao: 'Kitnet compacta e moderna, perfeita para estudantes ou profissionais que buscam praticidade.' },
  { id: 4, bairro: 'Descubra o Charme da Vila Nova', valor: 300000, metragem: 65, quartos: 2, vagas: 1, imagem: 'imovel 04.jpg', descricao: 'Sobrado aconchegante com garagem e fácil acesso a escolas e mercados.' },
  { id: 5, bairro: 'Viva no Jardim Europa', valor: 520000, metragem: 140, quartos: 3, vagas: 2, imagem: 'CP 6.jpg', descricao: 'Casa ampla com área gourmet e churrasqueira, perfeita para momentos em família no Jardim Europa.' },
  { id: 6, bairro: 'Seu Novo Lar no Boa Vista', valor: 280000, metragem: 70, quartos: 2, vagas: 1, imagem: 'cp 7.jpg', descricao: 'Apartamento reformado, bem localizado e com excelente custo-benefício.' },
  { id: 7, bairro: 'Residências Exclusivas no Alto da Glória', valor: 750000, metragem: 200, quartos: 4, vagas: 3, imagem: 'cp 8.jpg', descricao: 'Sobrado de alto padrão com acabamento premium e vista privilegiada.' },
  { id: 8, bairro: 'Viva no Setor Oeste, Viva Melhor', valor: 330000, metragem: 90, quartos: 3, vagas: 2, imagem: 'cp 9.jpg', descricao: 'Apartamento próximo ao centro comercial, com varanda e área de lazer completa.' },
  { id: 9, bairro: 'Morada Nova: Onde a Tranquilidade Mora', valor: 195000, metragem: 60, quartos: 2, vagas: 1, imagem: 'cp 10.jpg', descricao: 'Casa simples e funcional, ideal para primeira moradia.' },
  { id: 10, bairro:'Residencial Park: Seu Refúgio Urbano', valor: 410000, metragem: 110, quartos: 3, vagas: 2, imagem: 'cp 11.jpg', descricao: 'Casa nova em condomínio fechado com segurança 24h e área de lazer completa.' }
];

// Função para exibir lista de imóveis
function exibirImoveis(lista, limite = null) {
  const container = document.getElementById('lista-imoveis');
  if (!container) return;
  container.innerHTML = '';

  const listaExibir = limite ? lista.slice(0, limite) : lista;

  listaExibir.forEach(imovel => {
    const card = document.createElement('div');
    card.className = 'card-imovel';
    card.innerHTML = `
      <img src="${imovel.imagem}" alt="Imagem do imóvel">
      <h3>${imovel.bairro}</h3>
      <p>${imovel.descricao}</p>
      <p><strong>${imovel.metragem} m²</strong> | ${imovel.quartos} quartos | ${imovel.vagas} vagas</p>
      <strong>R$ ${imovel.valor.toLocaleString()}</strong>
      <a href="pagina-imovel.html?id=${imovel.id}" class="botao-ver-mais">Ver mais →</a>
    `;
    container.appendChild(card);
  });
}

// Função para filtrar imóveis
function filtrarImoveis() {
  const bairro = document.getElementById('bairro')?.value.toLowerCase() || '';
  const valorMax = parseFloat(document.getElementById('valor')?.value) || NaN;
  const metragemMin = parseFloat(document.getElementById('metragem')?.value) || NaN;

  const filtrados = imoveis.filter(imovel => {
    const bairroOk = bairro === '' || imovel.bairro.toLowerCase().includes(bairro);
    const valorOk = isNaN(valorMax) || imovel.valor <= valorMax;
    const metragemOk = isNaN(metragemMin) || imovel.metragem >= metragemMin;
    return bairroOk && valorOk && metragemOk;
  });

  exibirImoveis(filtrados);
}

// Carregar detalhes do imóvel
function carregarDetalhesImovel() {
  const container = document.getElementById('detalhes-imovel');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const imovel = imoveis.find(item => item.id === id);

  if (imovel) {
    container.innerHTML = `
      <h2>${imovel.bairro}</h2>
      <img src="${imovel.imagem}" alt="Imagem do imóvel" style="width:100%; max-width:600px; border-radius:8px;">
      <p><strong>Descrição:</strong> ${imovel.descricao}</p>
      <p><strong>Metragem:</strong> ${imovel.metragem} m²</p>
      <p><strong>Quartos:</strong> ${imovel.quartos}</p>
      <p><strong>Vagas:</strong> ${imovel.vagas}</p>
      <p><strong>Valor:</strong> R$ ${imovel.valor.toLocaleString()}</p>
      <p><strong>Código do Imóvel:</strong> ${imovel.id}</p>
      <a href="https://wa.me/5562999373877?text=Olá, tenho interesse no imóvel código ${imovel.id}" target="_blank" class="botao-ver-mais">Falar no WhatsApp</a>
    `;
  } else {
    container.innerHTML = `<p>Imóvel não encontrado.</p>`;
  }
}

// Envio WhatsApp
function enviarParaWhatsapp(event) {
  event.preventDefault();
  const nome = document.getElementById('nome')?.value;
  const telefone = document.getElementById('telefone')?.value;
  const mensagem = document.getElementById('mensagem')?.value;

  const texto = `Olá, meu nome é ${nome} e gostaria de saber mais informações sobre os imóveis disponíveis.`;
  const numeroCorretor = '5562999373877';

  const url = `https://wa.me/${numeroCorretor}?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
}

// Botão modo noturno (apenas UM trecho!)
const toggleBtn = document.getElementById('modo-noturno-toggle');
if (toggleBtn) {
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });
}

// ---- Execução automática ----
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById('lista-imoveis')) {
    // Se for a página inicial: mostra só 6
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
      exibirImoveis(imoveis, 6);
    } else {
      // Na página "imoveis": mostra todos
      exibirImoveis(imoveis);
    }
  }

  if (document.getElementById('detalhes-imovel')) {
    carregarDetalhesImovel();
  }
});
