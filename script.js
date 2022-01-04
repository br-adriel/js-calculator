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

// botoes de operacao
const btnsOperacoes = {};
btnsOperacoes.soma = document.getElementById("mais");
btnsOperacoes.subtracao = document.getElementById("menos");
btnsOperacoes.multiplicacao = document.getElementById("vezes");
btnsOperacoes.divisao = document.getElementById("dividir");
btnsOperacoes.porcentagem = document.getElementById("porcento");
btnsOperacoes.potenciacao = document.getElementById("potencia");
btnsOperacoes.radiciacao = document.getElementById("raiz");

// display do input do usuario
const display = document.getElementById("display");

// funcoes para pegar conteudo do display de input
const getDisplay = () => display.innerText;
const getDisplayFloat = () => parseFloat(display.innerText);

// funcao para definir conteudo do display do input
const setDisplay = (text) => (display.innerText = `${text}`);

// mini-display para mostrar operacoes
const miniDisplay = document.getElementById("mini-display");

// funcao para pegar conteudo do display de  operacoes
const getMiniDisplay = () => parseFloat(miniDisplay.innerText);

// funcao para definir conteudo do display de operacoes
const setMiniDisplay = (text) => (miniDisplay.innerText = `${text}`);

let desconsiderarDisplay = true; // controla se o display deve ser considerado
let ultimoFoiNum = true; // controla se a ultima acao foi numero digitado
let podeUsarPonto = true; // controla o uso do ponto;

function botaoPonto() {
  if (podeUsarPonto) {
    setDisplay(`${getDisplay()}.`);
    desconsiderarDisplay = false;
  }
  podeUsarPonto = false;
}

const btnPonto = document.getElementById("ponto");
btnPonto.addEventListener("click", botaoPonto);

// adiciona listener para mostrar numeros apertados no display
function numListener(numero) {
  if (desconsiderarDisplay || getDisplay() === "0") {
    setDisplay(`${numero}`);
  } else {
    setDisplay(`${getDisplay()}${numero}`);
  }
  desconsiderarDisplay = false;
  ultimoFoiNum = true;
}

for (numero in btnsNumeros) {
  btnsNumeros[numero].addEventListener("click", (e) => {
    numListener(e.currentTarget.innerText);
  });
}

// botao apagar
function botaoApagar() {
  const arrDisplay = getDisplay().split("");
  const itemApagado = arrDisplay.pop();
  itemApagado === "." ? (podeUsarPonto = true) : null;
  arrDisplay.length === 0 ? setDisplay("0") : setDisplay(arrDisplay.join(""));
}

document.getElementById("del").addEventListener("click", botaoApagar);

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

// retorna simbolo do operador
function getSimbolo(operador) {
  switch (operador) {
    case "mais":
      return "+";
    case "menos":
      return "-";
    case "vezes":
      return "*";
    case "dividir":
      return "/";
    case "porcento":
      return "%";
    case "potencia":
      return "^";
    case "raiz":
      return "^ 1/2";
  }
}

// funcoes de limpeza
function limparVariaveis() {
  termo1 = null;
  termo2 = null;
  operador = null;
}

function limparDisplays() {
  setDisplay("0");
  setMiniDisplay("");
}

// botao limpar
function botaoLimpar() {
  limparVariaveis();
  limparDisplays();
  podeUsarPonto = true;
  ultimoFoiNum = true;
}

document.getElementById("limpar").addEventListener("click", () => {
  botaoLimpar();
});

// implementa o resultado da operacao
function resultado() {
  // exibe resultado no display
  if (termo2 == null) {
    setMiniDisplay(`${termo1} ${getSimbolo(operador)} =`);
  } else {
    setMiniDisplay(`${termo1} ${getSimbolo(operador)} ${termo2} =`);
  }
  const resultado = calcular(termo1, termo2, operador);

  setDisplay(resultado);
  desconsiderarDisplay = true;
  ultimoFoiNum = true;

  // verifica se pode usar ponto no resultado
  let arrResultado = getDisplay().split(".");
  if (arrResultado.length === 1) {
    podeUsarPonto = true;
  } else {
    podeUsarPonto = false;
  }

  limparVariaveis();
}

// botao igual
function botaoIgual() {
  if (termo1 !== null) {
    termo2 = getDisplayFloat();
    resultado();
  }
}

document.getElementById("igual").addEventListener("click", botaoIgual);

// adiciona listener de click aos botoes de operacao
function operadorListener(nomeOperador) {
  if (!ultimoFoiNum) {
    operador = nomeOperador;
    setMiniDisplay(`${termo1} ${getSimbolo(operador)}`);
  } else {
    if (termo1 !== null) {
      termo2 = getDisplayFloat();
      resultado();
    }

    operador = nomeOperador;

    termo1 = getDisplayFloat();
    setMiniDisplay(`${termo1} ${getSimbolo(operador)}`);
    setDisplay("0");
    if (operador === "porcento" || operador === "raiz") {
      resultado();
      ultimoFoiNum = true;
      return;
    }
  }
  ultimoFoiNum = false;
  podeUsarPonto = true;
}

for (key in btnsOperacoes) {
  btnsOperacoes[key].addEventListener("click", (e) =>
    operadorListener(e.currentTarget.id)
  );
}

// adiciona listener ao teclado
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    // numeros
    case "0":
    case "1":
    case "2":
    case "3":
    case "4":
    case "5":
    case "6":
    case "7":
    case "8":
    case "9":
      numListener(e.key);
      break;
    // botao igual
    case "=":
    case "Enter":
      botaoIgual();
      break;
    // botao limpar
    case "C":
    case "c":
      botaoLimpar();
      break;
    // botao apagar
    case "Backspace":
      botaoApagar();
      break;
    // ponto
    case ".":
    case ",":
      botaoPonto();
      break;
    // operadores
    case "+":
      operadorListener("mais");
      break;
    case "-":
      operadorListener("menos");
      break;
    case "*":
      operadorListener("vezes");
      break;
    case "/":
      operadorListener("dividir");
      break;
    case "%":
      operadorListener("porcento");
      break;
    case "v":
    case "V":
      operadorListener("raiz");
      break;
    case "^":
      operadorListener("potencia");
      break;
  }
});

// define texto do footer dinamicamente
document.querySelector(
  "footer p"
).innerText = `Adriel Faria, ${new Date().getFullYear()}`;
