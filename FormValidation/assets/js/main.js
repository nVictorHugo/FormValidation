// Validando um formulário utilziando classes =)

class ValidaFormulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.eventos();
    };

    eventos() {
        this.formulario.addEventListener('submit', e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const everyValid = this.isValid();
        const senhasValidas = this.senhasSaoValidas();

        if (everyValid && senhasValidas) {
            alert("Formulário enviado!");
            this.formulario.submit();
        }
    }

    senhasSaoValidas() {
        let valid = true;
        const senha = this.formulario.querySelector('.senha');
        const confirmarSenha = this.formulario.querySelector('.repetir-senha');
        if (senha.value !== confirmarSenha.value) {
            valid = false;
            this.criaErro(senha, '*As senhas estão diferentes!');
            this.criaErro(confirmarSenha, '*As senhas estão diferentes!');
        }
        if (senha.value.length < 6 || senha.value.length > 12) {
            valid = false;
            const msgErroSenha = '*As senha precisa conter entre 6 e 12 caracteres!'
            this.criaErro(senha, msgErroSenha);
        }
        return valid;
    }

    isValid() {
        let valid = true;
        for (let errorText of this.formulario.querySelectorAll('.error-text')) {
            errorText.remove();
        }
        // Percorrendo todos os campos com as classes "validar"
        for (let campo of this.formulario.querySelectorAll('.validar')) {
            // previousElementSibling = elemento irmão anterior
            const label = campo.previousElementSibling.innerText;
            if (!campo.value) {
                this.criaErro(campo, `*O campo "${label.replace(':', '')}" não pode ficar em branco!`);
                valid = false;
            }
            // checando o campoq que contem cpf na classe
            if (campo.classList.contains('cpf')) {
                if (!this.validaCPF(campo)) valid = false;
            }

            // checando a quantia de caracteres em usuário
            if (campo.classList.contains('usuario')) {
                if (!this.validaUsuario(campo)) valid = false;
            }
        }
        return valid;
    }

    validaUsuario(campo) {
        const usuario = campo.value;
        let valid = true;

        if (usuario.length < 3 || usuario.length > 12) {
            this.criaErro(campo, '*O usuário deve conter entre 3 e 12 caracteres!');
            valid = false;
        }

        // Expressão regular que nega tudo que e´ "Alfanumérico"
        if (!usuario.match(/^[a-zA-Z0-9]+$/g)) {
            this.criaErro(campo, '*O usuário precisa conter apenas letras e/ou números!');
            valid = false;
        }

        return valid;
    }

    validaCPF(campo) {
        const cpf = new ValidaCPF(campo.value);

        if (!cpf.valida()) {
            this.criaErro(campo, '*CPF inválido');
            return false;
        }
        return true;
    }

    criaErro(campo, msg) {
        // Criando um elemento HTML (tag: div)
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        // Inserindo depois do campo (after end ou afterend)
        campo.insertAdjacentElement('afterend', div);
    }
}
const valida = new ValidaFormulario();
