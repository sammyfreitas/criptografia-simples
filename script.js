function processaPalavra() {
    // recebe a palavra da input 
	const palavraInput = document.getElementById('palavra');
	
	// transforma a palavra em letras minúsculas e remove acentos
    const palavra = palavraInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
    
	// recebe o conteúdo do select para saber se vai criptograr ou descriptografar
	const criptografia = document.getElementById('criptografia').value;

    // Verifica se a palavra contém apenas letras (sem acentos ou caracteres especiais)
    if (!/^[a-zA-Z]+$/.test(palavra)) {
        alert('Digite apenas letras, sem acentos ou caracteres especiais.');
        palavraInput.value = '';  // Limpa o campo de entrada
        return;
    }

    // Verifica se a palavra está vazia ou contém apenas espaços em branco
    if (!palavra.trim()) {
        alert('Digite uma palavra antes de continuar.');
        return;
    }

    // inicializa a variável resultado com o valor vazio pois se já tiver uma informação lá e for decodificar de novo, ele limpa as informações anteriores
    let resultado = '';

	// verifica se o valor da select é criptografar ou descriptografar para enviar para a função correta
    if (criptografia === 'criptografar') {
        resultado = criptografarpalavra(palavra);
    } else {
        resultado = descriptografarpalavra(palavra);
    }
	
	// exibe o resultado na tela
    document.getElementById('resultado').innerText = `Palavra Digitada: ${palavra}\nPalavra ${criptografia === 'criptografar' ? 'Criptografada' : 'Descriptografada'}: ${resultado}`;
}

function ctrl_c() {    
	const palavraDigitada = document.getElementById('palavra');
    
    // Verifica se o campo de entrada está vazio
    if (!palavraDigitada.value.trim()) {
        alert('Digite uma palavra para ser codificada.');
        return;
    }
	
	//funcao regular para copiar somente a palavra encipto/desencripto do label resultado
	//(.+) grupo de captura
	//[2] para pegar a 3 variável do código que exibirá a informação na label (linha 12)
	const criptoDescripto = document.getElementById('resultado').innerText.match(/Palavra (Criptografada|Descriptografada): (.+)/)[2]; 
    const palCopiada = document.createElement('textarea');
    palCopiada.value = criptoDescripto;
    document.body.appendChild(palCopiada);
    palCopiada.select();
    document.execCommand('copy');
    document.body.removeChild(palCopiada);
	alert('Palavra Copiada!');
}

function limpar() {
    //limpar o input
    document.getElementById('palavra').value = '';

    //limpar as informações de resultado
    document.getElementById('resultado').innerText = '';

    //remove a mensagem "Palavra copiada!" (se existir)
    const mensagemElemento = document.querySelector('p.mensagem-copiada');
    if (mensagemElemento) {
        document.body.removeChild(mensagemElemento);
    }
}


function criptografarpalavra(palavra) {
	//cria uma nova palacra para ser a palavra a ser criptografada
	const criptografaredpalavra = palavra	
		//o método replace substitui todas as vezes que encontrar o caracter dentro das barras / / e o g significa que vai substituir todas as vezes que encontrar o caracter dentro da palavra e não apenas na primeira vez
		.replace(/e/g, 'enter')
		.replace(/i/g, 'imes')
		.replace(/a/g, 'ai')
		.replace(/o/g, 'ober')		
		.replace(/u/g, 'ufat');
  return criptografaredpalavra;
}

function descriptografarpalavra(palavra) {
	const descriptografaredpalavra = palavra
		.replace(/enter/g, 'e')
		.replace(/imes/g, 'i')
		.replace(/ai/g, 'a')
		.replace(/ober/g, 'o')
		.replace(/ufat/g, 'u');
	return descriptografaredpalavra;
}