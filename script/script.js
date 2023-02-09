import selecionaCotacao from "./imprimeCotacao.js";


const chartDolar = document.getElementById('ChartDolar')

const chartForDolar = new Chart(chartDolar, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Dolar',
            data: [],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});





function geraHorario() {
    let data = new Date();

    let horario = `${data.getHours()}:${data.getMinutes()}:${data.getSeconds()}`;
    
    return horario;

}

function adicionarDados(grafico, legenda, dados) {
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    })
    grafico.update();
}


let workerDolar = new Worker('./script/workers/workerDolar.js');

workerDolar.postMessage('usd');


workerDolar.addEventListener("message", (e)=>{

    let tempo = geraHorario();
    let valor = e.data.ask;
    selecionaCotacao("dolar",valor);
    adicionarDados(chartForDolar,tempo,valor);


})

const chartIene = document.getElementById('ChartIene');

const chartForIene = new Chart(chartIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Iene',
            data: [],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

let workerIene = new Worker("./script/workers/workerIene.js");
workerIene.postMessage("iene");

workerIene.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    adicionarDados(chartForIene, tempo, valor);
    selecionaCotacao("Iene", valor)
});


