let nome = document.querySelector("#name");
let email = document.querySelector("#email");
let senha = document.querySelector("#password");
let CPF_CNPJ = document.querySelector("#cpf_cnpj");
let dateN = document.querySelector("#birthday");
const termo = document.querySelector("#terms");
let button_salva = document.querySelector(".button");

valida_valor_nulo = (valor) => {
    if (valor === null || valor === undefined || valor === "") {
        alert(`preencher todos os campos`);
        throw new Error(`preencher todos os campos`);
    }
};

valida_cpf = (cpf) => {
    let novo_cpf = "";
    for (let i = 0; i < cpf.length; i++) {
        if (cpf[i] !== "." && cpf[i] !== "-") {
            novo_cpf += cpf[i];
        }
    }
    return novo_cpf;
};

valida_email = (email) => {
    let e_um_email = false;
    for (let i = 0; i < email.length; i++) {
        if (email[i] === "@") {
            e_um_email = true;
            break;
        }
    }
    if (e_um_email === false) {
        alert(`colocar um email valido`);
        throw new Error(`preencher todos os campos`);
    }
};

const valida_dataN = (data) => {
    let anoNascimento = data.slice(0, 4); // Extrai os primeiros 4 caracteres
    let idade = 2024 - parseInt(anoNascimento); // Converte para número e calcula a idade
    if (idade > 120) {
        alert(
            `Idade inválida, você já estaria morto 💀. Impossível ter ${idade} anos.`
        );
        throw new Error("Idade inválida");
    } else if (idade < 18) {
        alert(
            `Idade inválida, você e muito novo para ter uma conta epere por mais ${idade} anos`
        );
        throw new Error("Idade inválida");
    }
};

const validar_senha = (senha) => {
    if (senha.length < 7) {
        alert(`A senha tem que ter no minimo 7 caracteres`);
        throw new Error("Senha inválida");
    }
};

button_salva.addEventListener("click", async () => {
    valida_valor_nulo(nome.value);
    valida_valor_nulo(email.value);
    valida_valor_nulo(senha.value);
    valida_valor_nulo(CPF_CNPJ.value);
    valida_valor_nulo(dateN.value);

    CPF_CNPJ.value = await valida_cpf(CPF_CNPJ.value);

    valida_email(email.value);
    valida_dataN(dateN.value);
    validar_senha(senha.value);

    if (!termo.checked) {
        alert("VC TEM QUE ACEITA OS TERMOS PARA CONTINUA");
        throw new Error("Encerrando o código forçadamente");
    }

    // let ok = await confirm(
    //     `
    // ||  Confirme seus dados ||
    //    NOME: ${nome.value}
    //    EMAIL: ${email.value}
    //    SENHA: ${senha.value}
    //    CPF OU CNPJ: ${CPF_CNPJ.value}
    //    DATA DE NACIMENTO: ${dateN.value}
    //    TERMO: ${termo.value}
    //     `
    // );

    const url = "https://go-wash-api.onrender.com/api/user";
    console.log(url);

    async function cadastro() {
        try {
            let api = await fetch(url, {
                method: "POST", // Verifique se o método correto é POST ou PUT
                headers: {
                    "Content-Type": "application/json",
                    Cookie: "gowash_session=0hGqRHf0q38ETNgEcJGce30LcPtuPKo48uKtb7Oj",
                },
                body: JSON.stringify({
                    name: `${nome.value}`,
                    email: `${email.value} `,
                    user_type_id: 1,
                    password: `${senha.value}`,
                    cpf_cnpj: `${CPF_CNPJ.value}`,
                    terms: 1,
                    birthday: `${dateN.value}`,
                }),
            });

            if (api.ok) {
                let response = await api.json();
                console.log(response);
                alert(JSON.stringify(response.data));
                alert("Confirmou email do cadastro?");
                window.location.href = "login.html";
            } else {
                let responseError = await api.json();
                alert(JSON.stringify(responseError)); // mostra a resposta de erro da api

                if (
                    responseError.data.errors.email.includes(
                        "The email has already been taken."
                    )
                ) {
                    alert("Esse email já estar cadastrado por uma outra conta");
                }
                if (
                    responseError.data.errors.cpf_cnpj.includes(
                        "The cpf cnpj has already been taken."
                    )
                ) {
                    alert("Esse CPF já estar cadastrado por uma outra conta");
                }

                console.log(responseError.data.Erros.cpf_cnpj[0]);
                alert(responseError.data.Erros.cpf_cnpj[0]);
            }
        } catch (error) {
            console.error("Erro na requisição:", error);
        }
    }

    let ok3 = await cadastro();
});

function changeBackgroundColor() {
    const body2 = document.querySelector(".body2");
    const form = document.querySelector(".form");
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // form.style.backgroundColor = `rgb(${r}, ${g}, ${b})`;
    form.style.boxShadow = `0px 0px 200px 20px rgb(${r}, ${g}, ${b})`;
}

setInterval(changeBackgroundColor, 1000);
