// funcoes de operacao
let termo1 = null;
let termo2 = null;
let operador = null;

const somar = (a, b) => a + b;
const subtrair = (a, b) => a - b;
const multiplicar = (a, b) => a * b;
const dividir = (a, b) => a / b;
const porcento = (a) => a / 100;
const potencia = (a, b) => a ** b;
const raiz = (a) => a ** 0.5;

// botoes de numero
const btnsNumeros = {};
btnsNumeros["0"] = document.getElementById("zero");
btnsNumeros["1"] = document.getElementById("um");
btnsNumeros["2"] = document.getElementById("dois");
btnsNumeros["3"] = document.getElementById("tres");
btnsNumeros["4"] = document.getElementById("quatro");
btnsNumeros["5"] = document.getElementById("cinco");
btnsNumeros["6"] = document.getElementById("seis");
btnsNumeros["7"] = document.getElementById("sete");
btnsNumeros["8"] = document.getElementById("oito");
btnsNumeros["9"] = document.getElementById("nove");
btnsNumeros["ponto"] = document.getElementById("ponto");

// botoes de operacao
const btnsOperacoes = {};
btnsOperacoes.soma = document.getElementById("mais");
btnsOperacoes.subtracao = document.getElementById("menos");
btnsOperacoes.multiplicacao = document.getElementById("vezes");
btnsOperacoes.divisao = document.getElementById("dividir");
btnsOperacoes.porcentagem = document.getElementById("porcento");
btnsOperacoes.potenciacao = document.getElementById("potencia");
btnsOperacoes.radiciacao = document.getElementById("raiz");

// display das operações
const display = document.getElementById("display");

// funcao para pegar conteudo do display
const getDisplay = () => parseFloat(display.innerText);

// funcao para definir conteudo do display
const setDisplay = (text) => (display.innerText = `${text}`);

// adiciona listener para mostrar numeros apertados no display
for (numero in btnsNumeros) {
  btnsNumeros[numero].addEventListener("click", (e) => {
    if (getDisplay() === 0) {
      display.innerText = `${e.originalTarget.innerText}`;
    } else {
      display.innerText = `${display.innerText}${e.originalTarget.innerText}`;
    }
  });
}

// funcao para realizar operacao
function calcular(a, b, operador) {
  switch (operador) {
    case "mais":
      return a + b;
    case "menos":
      return a - b;
    case "vezes":
      return a * b;
    case "dividir":
      return b === 0 ? "ERROR" : a / b;
    case "porcento":
      return a / 100;
    case "potencia":
      return a ** b;
    case "raiz":
      return a ** 0.5;
  }
}

// adiciona listener de click aos botoes de operacao
for (key in btnsOperacoes) {
  btnsOperacoes[key].addEventListener("click", (e) => {
    termo1 === null ? (termo1 = getDisplay()) : (termo2 = getDisplay());
    operador = e.currentTarget.id;
    setDisplay("0");
    if (operador === "porcento" || operador === "raiz") {
      // chamar operacao de igualdade
    }
  });
}
