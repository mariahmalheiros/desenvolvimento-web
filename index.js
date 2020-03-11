var reader = new FileReader();
var ctx = document.getElementById("myChart").getContext("2d");
let texto;
var dados;
reader.addEventListener("loadstart", function() {
  console.log("Lendo arquivo");
});

// file reading finished successfully
reader.addEventListener("load", function(e) {
  texto = e.target.result;
  carregarDados();
});

// file reading failed
reader.addEventListener("error", function() {
  alert("Error : Falha ao ler");
});

// file read progress
reader.addEventListener("progress", function(e) {
  if (e.lengthComputable == true) {
    var percent_read = Math.floor((e.loaded / e.total) * 100);
    console.log(percent_read + "% lido");
  }
});

let file;

document.querySelector("#file-input").addEventListener("change", function() {
  var all_files = this.files;
  file = all_files[0];

  reader.readAsText(file);
});

function carregarDados() {
  var arrayPalavras = separarPalavras(texto);
  var arrayRepetidas = mapearRepetidas(arrayPalavras);
  var arrayOrdenado = ordenarPorQuantidade(arrayRepetidas);
  dados = arrayOrdenado;

  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: [
        dados[0].name,
        dados[1].name,
        dados[2].name,
        dados[3].name,
        dados[4].name,
        dados[5].name,
        dados[6].name,
        dados[7].name,
        dados[8].name,
        dados[9].name
      ],
      datasets: [
        {
          label: "Número de vezes",
          data: [
            dados[0].total,
            dados[1].total,
            dados[2].total,
            dados[3].total,
            dados[4].total,
            dados[5].total,
            dados[6].total,
            dados[7].total,
            dados[8].total,
            dados[9].total
          ],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)"
          ],
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true
            }
          }
        ]
      }
    }
  });
}

function separarPalavras(text) {
  // split string by spaces (including spaces, tabs, and newlines)
  text = text.replace(".", "");
  text = text.toUpperCase();
  var wordsArray = text.split(/\s+/);
  return wordsArray;
}

function mapearRepetidas(wordsArray) {
  // create map for word counts
  var wordsMap = {};
  wordsArray.forEach(function(key) {
    if (key.length >= 3) {
      if (wordsMap.hasOwnProperty(key)) {
        wordsMap[key]++;
      } else {
        wordsMap[key] = 1;
      }
    }
  });

  return wordsMap;
}

function ordenarPorQuantidade(wordsMap) {
  // sort by count in descending order
  var finalWordsArray = [];
  finalWordsArray = Object.keys(wordsMap).map(function(key) {
    return {
      name: key,
      total: wordsMap[key]
    };
  });

  finalWordsArray.sort(function(a, b) {
    return b.total - a.total;
  });
  return finalWordsArray;
}