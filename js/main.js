var nome = recebeNome("nome");
let chatOpen = undefined

// FUNÇÃO DE LOGIN VIA TECLA ENTER.
function login_enter(){
    const inputEle = document.getElementById('chave');
    inputEle.addEventListener('keyup', function(e){
        let key = e.which || e.keyCode;
        if (key == 13) { 
            login();
        }
    });
}

// FUNÇÃO DE LOGIN.
function login(){
    let chave = document.getElementById('chave').value;
    window.location.href = `pgs/chat.html?nome=${ chave }`;
}

// ATRIBUI O NOME AO USUÁRIO.
function recebeNome(parameter) {  
    var loc = location.search.substring(1, location.search.length);   
    var param_value = false;   
    var params = loc.split("&"); 

    for (i=0; i<params.length;i++) {   
        param_name = params[i].substring(0,params[i].indexOf('='));   
        if (param_name == parameter) {                                          
            param_value = params[i].substring(params[i].indexOf('=')+1)   
        }   
    }   

    if (param_value) {   
        return param_value;   
    } else {   
        return undefined;   
    }   
}

// FUNÇÃO PARA ENVIAR A MENSAGEM NO CHAT VIA TECLA "ENTER".
function enviar_enter(){
    const inputEle = document.getElementById('mensagem');
    inputEle.addEventListener('keyup', function(e){
        let key = e.which || e.keyCode;
        if (key == 13) { 
            enviar();
            adicionar_chat();
        }
    });
}

// FUNÇÃO PARA ENVIAR A MENSAGEM NO CHAT.
function enviar() {
	if (document.getElementById('mensagem').value == "") return

    let msg = document.getElementById('mensagem').value;
    let chat = document.getElementById(`Content${ chatOpen }`);

    let x = document.getElementById('bloco_mensagens');

    // cria um elemento "div" que suportará a mensagem.
    let div = document.createElement('div');
    div.setAttribute('class', 'msg');
    div.setAttribute('name', 'msg');

    // cria um elemento "p" que conterá a mensagem.
    let p = document.createElement('p');
    p.setAttribute('class', 'texto');
    p.setAttribute('name', 'texto');
    p.setAttribute('id', 'texto');

    // adiciona a mensagem dentro do novo "p".
    p.innerHTML = nome + ": " + msg;

    // Adiciona a nova "div" e o novo "p" ao HTML.
    div.appendChild(p);   
    chat.appendChild(div);

    document.getElementById('mensagem').value = "";
}

// FUNÇÃO PARA CARREGAR OS CHATS DO USUÁRIO.
function carregar_chats() {
    let x = document.getElementById('bloco_mensagens');
    
    //cria um elemento "div".
    let div = document.createElement('div');
    div.setAttribute('class', 'chat');
    div.setAttribute('name', 'chat');
    div.setAttribute('id', 'chat');

    //adiciona o valor dentro do novo "p".
    p.innerHTML = nome + ": " + msg;

    //Adiciona a nova "div" e o novo "p" ao HTML.
    x.appendChild(div);
}

// FUNÇÃO PARA ATUALIZAR MENSAGENS ESPECÍFICAS DO CHAT.
function atualiza_mensagens(chave_chat) {


}

function troca_chat(key) {
    if(chatOpen !== undefined) {
        document.getElementById(`Content${ chatOpen }`).style.display = 'none'
        document.getElementById(`Tab${ chatOpen }`).classList.remove('active')
    }
    chatOpen = key
    document.getElementById(`Content${ key }`).style.display = 'block'
    document.getElementById(`Tab${ key }`).setAttribute('class', 'active')
}

// FUNÇÃO PARA ADICIONAR NOVO CHAT
function adicionar_chat() {
    if (document.getElementById('novo_chat').value == "") return
    
    let key = document.getElementById('novo_chat').value;
    
    // create a new section for the chat
    let x = document.getElementById('chats');

    let div = document.createElement('div');
    div.setAttribute('class', 'labelChat');

    let p = document.createElement('p');
    p.setAttribute('name', 'texto');
    p.setAttribute('id', 'texto');

    p.innerHTML = "<h5>Chat: </h5>" + key;

    x.appendChild(div)
    div.appendChild(p)

    // create a new tab in main chat
    let tabsChat = document.getElementById('bologna-list');
    
    let li = document.createElement('li')
    li.setAttribute('class', 'nav-item')
    li.setAttribute('id', `Tab${ key }`)

    let a = document.createElement('a')
    a.setAttribute('class', 'nav-link')
    a.setAttribute('href', `#${ key }`)
    a.setAttribute('role', 'tab')
    a.setAttribute('aria-controls', key)
    a.setAttribute('aria-selected', 'false')
    a.innerHTML = key

    a.onclick = () => troca_chat(key)

    li.appendChild(a)
    tabsChat.appendChild(li)

    // create the content
    let chatsContent = document.getElementById('chatsContent')
    let divChat = document.createElement('div')
    divChat.setAttribute('class', 'tab-pane')
    divChat.setAttribute('id', key)
    divChat.setAttribute('role', 'tabpanel')
    divChat.setAttribute('aria-labelledby', key)
    divChat.setAttribute('id', `Content${ key }`)

    let divBlockMessage = document.createElement('div')
    divBlockMessage.setAttribute('name', 'bloco_mensagens')
    divBlockMessage.setAttribute('id', key)
    divChat.appendChild(divBlockMessage)
    chatsContent.appendChild(divChat)

    // display all messages in the new section

    document.getElementById('novo_chat').value = '';
    $('#addNewChat').modal('toggle');
}