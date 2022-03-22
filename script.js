const bancoProdutos = [{
    imgSrc: "imagens/jaqueta.png",
    imgAlt: "Jaqueta Preta",
    categ: "Camisetas",
    nome: "Lightweight Jacket",
    descr: "Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...",
    preço: 200.00,
},{
    imgSrc: "imagens/gorro.png",
    imgAlt: "Gorro Preto",
    categ: "Acessórios",
    nome: "Black Hat",
    descr: "O gorro Next.js chegou! Esta beldade bordada tem um ajuste confortável que garante que...",
    preço: 80.00,
},{
    imgSrc: "imagens/mascara.png",
    imgAlt: "Mascara Preta",
    categ: "Acessórios",
    nome: "Mask",
    descr: "Esta máscara facial durável é feita de duas camadas de tecido tratado e possui presilhas...",
    preço: 20.00,
},{
    imgSrc: "imagens/camisetapt.png",
    imgAlt: "Camiseta Preta",
    categ: "Camisetas",
    nome: "T-Shirt",
    descr: "Esta t-shirt é imprescindível no seu guarda-roupa, combinando o caimento intemporal de...",
    preço: 100.00,
},{
    imgSrc: "imagens/camisetabr.png",
    imgAlt: "Camiseta Branca",
    categ: "Camisetas",
    nome: "Short-Sleeve T-Shirt",
    descr: "Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...",
    preço: 100.00,
},{
    imgSrc: "imagens/moletom.png",
    imgAlt: "Moletom Preto",
    categ: "Camisetas",
    nome: "Champion Packable Jacket",
    descr: "Proteja-se dos elementos com esta jaqueta embalável Champion. Esta jaqueta de poliést...",
    preço: 250.00,
},
]

// ATUALIZACAO AUTOMATICA VITRINE COM BANCO DE DADOS FAKE - FINALIZADO

let vitrine = document.getElementById('vitrine')

function createProd(imgSrc,imgAlt,categ,nome,descr,preço) {
    let novoProd = document.createElement('div')
    novoProd.classList.add('cardProd')
    novoProd.innerHTML = `<div class="imgProd"><img src=${imgSrc} alt=${imgAlt}>
</div>
<div class="infosProd">
    <div class="categoria">${categ}</div>
    <h4>${nome}</h4>
    <p>${descr}</p>
    <p class="valor">R$ ${preço}</p>
    <button class="btAdicionar">Adicionar ao carrinho
    </button>
</div>`;

vitrine.appendChild(novoProd)

habilitandoBtsAdicionar()


}


function atualizarVitrine (){
    bancoProdutos.forEach(function (item){
        createProd(item.imgSrc,item.imgAlt,item.categ,item.nome,item.descr,item.preço)
    })
}

atualizarVitrine ()

//FIM ATUALIZACAO AUTOMATICA VITRINE - FINALIZADO

//FILTRAR VITRINE COM BASE NO ITEM DA LISTA DE NAVEGACAO CLICADO - FINALIZADO

let itensNav = document.querySelectorAll('li')
let itemNavTodos = document.getElementById('todos')
let itemNavacessorios = document.getElementById('acessorios')
let itemNavcalcados = document.getElementById('calcados')
let itemNavcamisetas = document.getElementById('camisetas')


itemNavTodos.addEventListener('click',filtroVitrine)
itemNavacessorios.addEventListener('click',filtroVitrine)
itemNavcalcados.addEventListener('click',filtroVitrine)
itemNavcamisetas.addEventListener('click',filtroVitrine)


function filtroVitrine(event){

    let categClicada = event.target

    for( let i = 0; i < itensNav.length; i++){
        itensNav[i].classList.remove('categoriaClick')
    }
    categClicada.classList.add('categoriaClick')
    vitrine.innerHTML = ""

for (let i = 0; i < bancoProdutos.length; i++){
    if (bancoProdutos[i].categ === categClicada.innerText){
        createProd(bancoProdutos[i].imgSrc,bancoProdutos[i].imgAlt,bancoProdutos[i].categ,bancoProdutos[i].nome,bancoProdutos[i].descr,bancoProdutos[i].preço)

    }else if (categClicada.innerText == "Todos"){
        vitrine.innerHTML = ""
        atualizarVitrine ()
    }  
} if (vitrine.innerHTML === ""){
        let msgNenhumProd = document.createElement('h2')
        msgNenhumProd.innerText = "Desculpe, no momento não temos nenhum produto nesta categoria"
        vitrine.appendChild(msgNenhumProd)
    }
    habilitandoBtsAdicionar()
}

// FIM FILTRAR VITRINE COM BASE NO ITEM DA LISTA DE NAVEGACAO CLICADO - FINALIZADO

//FILTRAR VITRINE COM BASE PESQUISA - FINALIZADO

let areaPesquisa = document.getElementById('areaPesquisa')
let btPesquisar = document.getElementById('btPesquisar')

btPesquisar.addEventListener('click', prodsPesquisados)

function prodsPesquisados(event){

    event.preventDefault();

    let txtPesquisa = areaPesquisa.value.toLowerCase()

    vitrine.innerHTML = ''

    for (let i = 0; i < bancoProdutos.length; i++){
        if (bancoProdutos[i].nome.toLowerCase().includes(txtPesquisa)){
            createProd(bancoProdutos[i].imgSrc,bancoProdutos[i].imgAlt,bancoProdutos[i].categ,bancoProdutos[i].nome,bancoProdutos[i].descr,bancoProdutos[i].preço)

        }
    }
}

//FIM FILTRAR VITRINE COM BASE PESQUISA - FINALIZADO


//ADICIONANDO PRODUTOS NO CARRINHO - FINALIZADO

let carrinho = document.getElementById('prodsCarrinho')

const arrayCarrinho = []
function createItemCarrinho(imgSrc,imgAlt,nome,preço){

    let itemCarrinho = document.createElement('div')
    itemCarrinho.classList.add('itemCarrinho')

    itemCarrinho.innerHTML = `<div class="imgProdCarrinho">
    <img src=${imgSrc} alt=${imgAlt}>
    </div>
    <div class="infoProdCarrinho">
    <h4>${nome}</h4><p>${preço}</p>
    <button class="btRemover">Remover produto</button>
    </div>`

    arrayCarrinho.push(preço)
    displayMensagemCarrinhoVazio()
    carrinho.appendChild(itemCarrinho)
}

function habilitandoBtsAdicionar(){

let botoesAdicionar = document.getElementsByClassName('btAdicionar')

for( let i = 0; i < botoesAdicionar.length; i++){
    botoesAdicionar[i].addEventListener("click", addCarrinho)
}   
}

function addCarrinho(event){

    let produto = event.target.closest(".cardProd")
    let produtoInfos = event.target.parentElement

    let imgSrc = produto.firstChild.firstChild.getAttribute("src")
    let imgAlt = produto.firstChild.firstChild.getAttribute("alt")
    let nome = produtoInfos.childNodes[3].innerText
    let preço = produtoInfos.childNodes[7].innerText

    createItemCarrinho(imgSrc,imgAlt,nome,preço)
    infosCarrinho()
    habilitandoBtsRemover()
}

// FIM ADICIONANDO PRODUTOS NO CARRINHO - FINALIZADO

//REMOVENDO PRODUTOS DO CARRINHO - FINALIZADO

let botoesRemover = document.getElementsByClassName('btRemover')

function habilitandoBtsRemover(){
    for( let j = 0; j < botoesRemover.length; j++){
        botoesRemover[j].addEventListener("click", removerDoCarrinho)
    }   

}

function removerDoCarrinho(event){

    let atualItemCarrinho = event.target.closest(".itemCarrinho")

   let indexItemRemovido = arrayCarrinho.findIndex( element => element === atualItemCarrinho.childNodes[2].childNodes[2].innerText)
   arrayCarrinho.splice(indexItemRemovido,1)

   carrinho.removeChild(atualItemCarrinho)


    displayMensagemCarrinhoVazio()
    infosCarrinho()
}
//FIM REMOVENDO PRODUTOS DO CARRINHO - FINALIZADO

// CONSTRUINDO AREA COM INFOS DO CARRINHO - FINALIZADO

let resumoCarrinho = document.getElementById('contaCarrinho')
let quantidadeCarrinho = document.getElementById('quantItens')
let totalValorCarrinho = document.getElementById('totalValor')


function infosCarrinho(){
    let total = 0

if(arrayCarrinho.length > 0){
    resumoCarrinho.classList.remove('escondido')
    quantidadeCarrinho.innerText = arrayCarrinho.length;

    for( let z = 0; z < arrayCarrinho.length; z++){

        total += Number(arrayCarrinho[z].slice(3))
    }
    totalValorCarrinho.innerText = `R$ ${total}`
} else{
    quantidadeCarrinho.innerText = arrayCarrinho.length;
    totalValorCarrinho.innerText = `R$ ${total}`
    resumoCarrinho.classList.add('escondido')
}
}

// FIM CONSTRUINDO AREA COM INFOS DO CARRINHO - FINALIZADO

// MOSTRANDO AVISO DE CARRINHO VAZIO - FINALIZADO

function displayMensagemCarrinhoVazio(){
    
    let mensagemCarrinhoVazio = document.getElementById('txCarrinhoVazio')

if(arrayCarrinho.length != 0){

    mensagemCarrinhoVazio.classList.add('escondido')
} else{
    mensagemCarrinhoVazio.classList.remove('escondido')
}
}

// FIM MOSTRANDO AVISO DE CARRINHO VAZIO - FINALIZADO
