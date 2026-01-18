const factoresConversion = {
    km: 1000,     
    hm: 100,       
    dam: 10,       
    m: 1,          
    dm: 0.1,      
    cm: 0.01,      
    mm: 0.001      
};

const nombresUnidades = {
    km: 'kilómetros',
    hm: 'hectómetros',
    dam: 'decámetros',
    m: 'metros',
    dm: 'decímetros',
    cm: 'centímetros',
    mm: 'milímetros'
};

const valorEntrada = document.getElementById('inputValue');
const unidadEntrada = document.getElementById('inputUnit');
const unidadSalida = document.getElementById('outputUnit');
const botonConvertir = document.getElementById('convertButton');
const valorSalida = document.getElementById('outputValue');
const botonIncrementar = document.querySelector('.btn-increment');
const botonDecrementar = document.querySelector('.btn-decrement');
const botonIntercambiar = document.querySelector('.btn-swap');
const botonCopiar = document.querySelector('.btn-copy');
const resultadoDiv = document.getElementById('result');

function formatearNumero(numero) {
    if (Math.abs(numero) >= 1e9 || (Math.abs(numero) < 1e-6 && numero !== 0)) {
        return numero.toExponential(4);
    }
    

    const redondeado = Math.round(numero * 1e6) / 1e6;
    return redondeado.toLocaleString('es-ES', {
        maximumFractionDigits: 6,
        useGrouping: true
    });
}

function convertir() {
    const valor = parseFloat(valorEntrada.value);
    const unidadOrigen = unidadEntrada.value;
    const unidadDestino = unidadSalida.value;

    if (isNaN(valor) || valorEntrada.value === '') {
        valorSalida.textContent = 'Ingresa un valor para convertir';
        valorSalida.style.color = '#666';
        resultadoDiv.classList.remove('animate');
        return;
    }

    if (valor < 0) {
        valorSalida.textContent = 'Por favor, introduce un valor positivo.';
        valorSalida.style.color = '#c62828';
        resultadoDiv.classList.remove('animate');
        return;
    }

    if (valor > 1e15) {
        valorSalida.textContent = 'El valor es demasiado grande para convertir.';
        valorSalida.style.color = '#c62828';
        resultadoDiv.classList.remove('animate');
        return;
    }

    if (unidadOrigen === unidadDestino) {
        valorSalida.textContent = `${formatearNumero(valor)} ${nombresUnidades[unidadDestino]}`;
        valorSalida.style.color = '#333';
        animarResultado();
        return;
    }

    const valorEnMetros = valor * factoresConversion[unidadOrigen];
    const resultado = valorEnMetros / factoresConversion[unidadDestino];

    if (!isFinite(resultado)) {
        valorSalida.textContent = 'Error en el cálculo. Verifica el valor.';
        valorSalida.style.color = '#c62828';
        resultadoDiv.classList.remove('animate');
        return;
    }

    const resultadoFormateado = formatearNumero(resultado);
    valorSalida.textContent = `${resultadoFormateado} ${nombresUnidades[unidadDestino]}`;
    valorSalida.style.color = '#333';
    animarResultado();
}

function animarResultado() {
    resultadoDiv.classList.remove('animate');
    setTimeout(() => {
        resultadoDiv.classList.add('animate');
    }, 10);
}

function intercambiarUnidades() {
    const unidadOrigenTemp = unidadEntrada.value;
    unidadEntrada.value = unidadSalida.value;
    unidadSalida.value = unidadOrigenTemp;
    convertir();
}

function copiarResultado() {
    const textoResultado = valorSalida.textContent;
    
    if (textoResultado === 'Ingresa un valor para convertir' || 
        textoResultado.includes('Por favor') || 
        textoResultado.includes('demasiado grande') ||
        textoResultado.includes('Error')) {
        return;
    }

    navigator.clipboard.writeText(textoResultado).then(() => {
        botonCopiar.textContent = '✓';
        botonCopiar.classList.add('copied');
        
        setTimeout(() => {
            botonCopiar.textContent = '📋';
            botonCopiar.classList.remove('copied');
        }, 2000);
    }).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = textoResultado;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        
        botonCopiar.textContent = '✓';
        botonCopiar.classList.add('copied');
        
        setTimeout(() => {
            botonCopiar.textContent = '📋';
            botonCopiar.classList.remove('copied');
        }, 2000);
    });
}

botonConvertir.addEventListener('click', convertir);

valorEntrada.addEventListener('input', convertir);
valorEntrada.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        convertir();
    }
});

unidadEntrada.addEventListener('change', function() {
    if (unidadEntrada.value === unidadSalida.value) {
        const opciones = Array.from(unidadSalida.options);
        const opcionDiferente = opciones.find(opt => opt.value !== unidadEntrada.value);
        if (opcionDiferente) {
            unidadSalida.value = opcionDiferente.value;
        }
    }
    convertir();
});

unidadSalida.addEventListener('change', function() {
    if (unidadSalida.value === unidadEntrada.value) {
        const opciones = Array.from(unidadSalida.options);
        const opcionDiferente = opciones.find(opt => opt.value !== unidadEntrada.value);
        if (opcionDiferente) {
            unidadSalida.value = opcionDiferente.value;
        }
    }
    convertir();
});

botonIncrementar.addEventListener('click', function() {
    const valorActual = parseFloat(valorEntrada.value) || 0;
    valorEntrada.value = valorActual + 1;
    convertir();
});

botonDecrementar.addEventListener('click', function() {
    const valorActual = parseFloat(valorEntrada.value) || 0;
    if (valorActual > 0) {
        valorEntrada.value = valorActual - 1;
        convertir();
    }
});

botonIntercambiar.addEventListener('click', intercambiarUnidades);
botonCopiar.addEventListener('click', copiarResultado);

window.addEventListener('DOMContentLoaded', function() {
    valorEntrada.focus();
});
