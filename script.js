const bancoProdutos = [{
    imgScr: "imagens/jaqueta.png",
    imgAlt: "Jaqueta Preta",
    categ: "Camisetas",
    nome: "Lightweight Jacket",
    descr: "Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...",
    preço: 200.00,
},{
    imgScr: "imagens/gorro.png",
    imgAlt: "Gorro Preto",
    categ: "Acessórios",
    nome: "Black Hat",
    descr: "O gorro Next.js chegou! Esta beldade bordada tem um ajuste confortável que garante que...",
    preço: 80.00,
},{
    imgScr: "imagens/mascara.png",
    imgAlt: "Mascara Preta",
    categ: "Acessórios",
    nome: "Mask",
    descr: "Esta máscara facial durável é feita de duas camadas de tecido tratado e possui presilhas...",
    preço: 20.00,
},{
    imgScr: "imagens/camisetapt.png",
    imgAlt: "Camiseta Preta",
    categ: "Camisetas",
    nome: "T-Shirt",
    descr: "Esta t-shirt é imprescindível no seu guarda-roupa, combinando o caimento intemporal de...",
    preço: 100.00,
},{
    imgScr: "imagens/camisetabr.png",
    imgAlt: "Camiseta Branca",
    categ: "Camisetas",
    nome: "Short-Sleeve T-Shirt",
    descr: "Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...",
    preço: 100.00,
},{
    imgScr: "imagens/moletom.png",
    imgAlt: "Moletom Preto",
    categ: "Camisetas",
    nome: "Champion Packable Jacket",
    descr: "Proteja-se dos elementos com esta jaqueta embalável Champion. Esta jaqueta de poliést...",
    preço: 250.00,
},
]

let vitrine = document.getElementById('vitrine')

function createProd(imgScr,imgAlt,categ,nome,descr,preço) {
    let novoProd = document.createElement('div')
    novoProd.classList.add('cardProd')
    novoProd.innerHTML = `<div class="imgProd">
    <img src=${imgScr} alt=${imgAlt}>
</div>
<div class="infosProd">
    <div>${categ}</div>
    <h4>${nome}</h4>
    <p>${descr}</p>
    <p class="valor">R$ ${preço}</p>
    <button class="btAdicionar">Adicionar ao carrinho
    </button>
</div>`;

vitrine.appendChild(novoProd)

}

function atualizarVitrine (){
    bancoProdutos.forEach(function (item){
        createProd(item.imgScr,item.imgAlt,item.categ,item.nome,item.descr,item.preço)
    })
}

atualizarVitrine ()