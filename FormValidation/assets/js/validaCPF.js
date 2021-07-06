class ValidaCPF {
    constructor(cpfEnviado) {
        Object.defineProperty(this, 'cpfLimpo', {
            enumerable: true,
            get: function () {
                return cpfEnviado.replace(/\D+/g, '');
            }
        });
    }

    valida() {
        if (typeof this.cpfLimpo == undefined) return false;
        if (this.cpfLimpo.length !== 11) return false;
        // if (this.isSequencia()) return false;
        this.isSequencia();

        const cpfParcial = this.cpfLimpo.slice(0, -2);//removendo os dois ultimos dígitos
        const digito1 = this.criaDigito(cpfParcial);
        const digito2 = this.criaDigito(cpfParcial + digito1)
        const cpfValidado = cpfParcial + digito1 + digito2;

        return (this.cpfLimpo === cpfValidado); //retorna true ou false (depende do resultado)
    };

    criaDigito(cpfParcial) {
        const cpfArray = Array.from(cpfParcial);
        let regressivo = cpfArray.length + 1;

        const total = cpfArray.reduce((acumulador, valor) => {
            acumulador += regressivo * Number(valor);
            regressivo--;
            return acumulador;
        }, 0);

        const digito = (11 - (total % 11));
        return (digito > 9) ? '0' : String(digito);
    }

    isSequencia() {
        return ((this.cpfLimpo[0].repeat(this.cpfLimpo.length)) == this.cpfLimpo) ? true : false;
    }


};
//const cpf = new ValidaCPF('006.064.471-05');
/*

const cpf = new ValidaCPF('006.064.471-05');
cpf.valida();
*/