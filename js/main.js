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
        return;
    }

    if (valor < 0) {
        valorSalida.textContent = 'Por favor, introduce un valor positivo.';
        valorSalida.style.color = '#c62828';
        return;
    }

    if (unidadOrigen === unidadDestino) {
        valorSalida.textContent = `${formatearNumero(valor)} ${nombresUnidades[unidadDestino]}`;
        valorSalida.style.color = '#333';
        return;
    }

    const valorEnMetros = valor * factoresConversion[unidadOrigen];
    const resultado = valorEnMetros / factoresConversion[unidadDestino];

    const resultadoFormateado = formatearNumero(resultado);
    valorSalida.textContent = `${resultadoFormateado} ${nombresUnidades[unidadDestino]}`;
    valorSalida.style.color = '#333';
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

window.addEventListener('DOMContentLoaded', function() {
    valorEntrada.focus();
});
