/* Operador lógico que retorna com dados salvos, ou string 
vazia, utilizando localStorage.getItem, modificando o valor de `string` com JSON.parse()*/
const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

// Uso do forEach para que todos os itens já escritos na lista sejam mantidos ao atualizar a página 
itens.forEach((element) => {
 criaElemento(element);
});

// Refatoração do addEventListener para receber as funções extras da função criaElemento
form.addEventListener('submit', (event) =>{
    event.preventDefault();

    const nome = event.target.elements['nome'];
    const quantidade = event.target.elements['quantidade'];
    
    //Const para conferir elemento no array itens
    const existe = itens.find(element => element.nome === nome.value); 
    

    const itemAtual = {
        'nome': nome.value,
        'quantidade': quantidade.value

    }

    //Condicional para confererir se o elemento existe
    if (existe) {
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);
        //fatoração da condicional if/else, atualizando um id para cada item
        itens[itens.findIndex(element => element.id === existe.id)] = itemAtual;

    }else{
        itemAtual.id = itens[itens.length -1] ? (itens[itens.length -1]).id +1 : 0;

        criaElemento(itemAtual);

        itens.push(itemAtual);
    }
    

    localStorage.setItem('itens', JSON.stringify(itens));

    nome.value = '';
    quantidade.value = '';
})

// Refatoração da função `criaElemento` para que possua apenas a função que faça sentido ao nome. 
function criaElemento(item) {
    const novoItem = document.createElement('li');
    novoItem.classList.add('item');

    const numeroItem = document.createElement('strong');
    numeroItem.innerHTML = item.quantidade;
    numeroItem.dataset.id = item.id;
    novoItem.appendChild(numeroItem);

    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    lista.appendChild(novoItem); 
}

function atualizaElemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade;
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement('button');
    elementoBotao.innerText = 'x';

    elementoBotao.addEventListener('click', function(){
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function deletaElemento(tag, id) {
    tag.remove();

    itens.splice(itens.findIndex(element => element.id === id), 1);

    localStorage.setItem('itens', JSON.stringify(itens));

    console.log(itens);
}

