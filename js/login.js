const email = document.querySelector('#email');
const senha = document.querySelector('#password');
let button_salva = document.querySelector('.button');

button_salva.addEventListener('click', async () => {
     let ok = await confirm(

        `
        EMAIL: ${email.value}
        SENHA: ${senha.value} 
        `  
 
     );

const url = 'https://go-wash-api.onrender.com/api/login';
console.log(url);

async function login() {


    try {
        let api = await fetch(url, {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json',
                'Cookie': 'gowash_session=0hGqRHf0q38ETNgEcJGce30LcPtuPKo48uKtb7Oj'
            },
            body: JSON.stringify({
                "email": `${email.value}`,
                "password": `${senha.value}`,
                "user_type_id": 1
            })
        });

        if (api.ok) {
            let response = await api.json();
            console.log(response); 
            alert( JSON.stringify(response));
            alert(`
                Bem Vindo ${response.user.name}
                `)   
            window.open('music.html'); 
        } else {
            let responseError = await api.json();
            alert(JSON.stringify(responseError.data));
            if (responseError.data || responseError.data.Erros || responseError.data.Erros.cpf_cnpj) {
                console.log(responseError.data.Erros.cpf_cnpj[0]);
                alert( JSON.stringify(responseError.data.Erros.cpf_cnpj[0]));

            } else {
                console.log('Erro desconhecido na resposta da API.');
            }
        }
    } catch (error) {
        alert(error);
        console.error('Erro na requisição:', error);
    }
}

let ok3 = await login();


});

function changeBackgroundColor() {
    const body2 = document.querySelector('.body2');
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    body2.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
}

setInterval(changeBackgroundColor, 3000); 

