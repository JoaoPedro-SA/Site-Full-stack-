const nome = document.querySelector('#name');
const email = document.querySelector('#email');
const senha = document.querySelector('#password');
const CPF_CNPJ = document.querySelector('#cpf_cnpj');
const dateN = document.querySelector('#birthday');
const termo = document.querySelector('#terms');
let button_salva = document.querySelector('.button');




button_salva.addEventListener('click', async () => {
    
if (!termo.checked){
    alert('VC TEM QUE ACEITA OS TERMOS PARA CONTINUA');
    throw new Error("Encerrando o código forçadamente");
}



    let ok = await confirm(
        `
       NOME: ${nome.value}
       EMAIL: ${email.value}
       SENHA: ${senha.value}
       CPF OU CNPJ: ${CPF_CNPJ.value}
       DATA DE NACIMENTO: ${dateN.value}
       TERMO: ${termo.value}
        `       

    );

    
const url = 'https://go-wash-api.onrender.com/api/user';
console.log(url);

async function cadastro() {

    try {
        let api = await fetch(url, {
            method: "POST", // Verifique se o método correto é POST ou PUT
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'gowash_session=0hGqRHf0q38ETNgEcJGce30LcPtuPKo48uKtb7Oj'
            },
            body: JSON.stringify({
                "name": `${nome.value}`,
                "email": `${email.value} `,
                "user_type_id": 1,
                "password": `${senha.value}`,
                "cpf_cnpj": `${CPF_CNPJ.value}`,
                "terms": 1,
                "birthday": `${dateN.value}`
            })
        });

        if (api.ok) {
            let response = await api.json();
            console.log(response);
            alert(JSON.stringify(response.data));
            alert('Confirmou email do cadastro?');    
            window.open('login.html');
            
        } else {
            let responseError = await api.json();
            console.log(responseError.data.Erros.cpf_cnpj[0]);
            alert(responseError.data.Erros.cpf_cnpj[0]);
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
    }
}

let ok3 = await cadastro();

});

function changeBackgroundColor() {
    const body2 = document.querySelector('.body2');
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    body2.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

setInterval(changeBackgroundColor, 3000); 





