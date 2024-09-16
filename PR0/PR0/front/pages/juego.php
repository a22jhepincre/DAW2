<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <style>
        .center-screen {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
        }

        body {
            background-color: #71CBF0;
        }

        .img-question {
            height: auto;
            width: 150px;
        }

        .question-text {
            font-size: 1.5rem;
            font-weight: bold;
            color: white;
            padding-left: 5px;
            padding-right: 5px;
        }

        .py-10 {
            padding-top: 20px;
            padding-bottom: 20px;
        }

        @media (min-width: 768px) {
            .img-question {
                width: 240px;
            }

            .question-text {
                font-size: 2rem;
            }
        }
    </style>
</head>

<body>
    <?php
    // Decodificamos el archivo JSON
    $datas = json_decode(file_get_contents("data.json"), true);

    ?>

    <div class="center-screen w-100 text-center">
        <div class="row w-100">
            <div class="col-lg-12 col-12" id="containerProgressbar">
                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: 0%"></div>
                </div>
            </div>
        </div>
        <div class="w-100 d-lg-flex justify-content-center align-items-center">
            <!-- Ajustamos la imagen con la clase 'img-question' -->
            <div>
                <img src="../img/question.png" class="img-question" />
            </div>
            <p id="question-text" class="question-text"><?= $datas['preguntes'][0]['pregunta'] ?></p>
        </div>
        <div id="answers" class="w-100 row justify-content-center text-center">
            <?php foreach ($datas['preguntes'][0]['respostes'] as $resposta) { ?>
                <div class="col-lg-5 col-12 mb-lg-4 mb-2">
                    <button class="btn btn-primary btn-lg w-75 py-10 btnOpcion" data-option-id="<?= $resposta['id'] ?>"><?= $resposta['resposta'] ?></button>
                </div>
            <?php } ?>
        </div>
    </div>
    <script src="../bootstrap/js/bootstrap.min.js"></script>
    <script src="../js/juego.js"></script>
    <script>
        let preguntas = <?= json_encode($datas['preguntes']); ?>; // Convertimos el array de preguntas de PHP a JS
        let posicion = 0; // Posición inicial de la pregunta

        function cargarPregunta(pos) {
            document.getElementById('question-text').textContent = preguntas[pos]['pregunta'];

            const answersDiv = document.getElementById('answers');
            answersDiv.innerHTML = '';

            preguntas[pos]['respostes'].forEach((respuesta) => {
                let answerBtn = document.createElement('button');
                answerBtn.className = 'btn btn-primary btn-lg w-75 py-10 mb-2';
                answerBtn.textContent = respuesta['resposta'];
                answerBtn.setAttribute('data-option-id', respuesta['id']);
                answerBtn.addEventListener('click', function() {
                    const correctAnswer = preguntas[posicion].respostes.find((resposta) => resposta.correcta == true);
                    console.log(correctAnswer)
                    siguientePregunta();
                });
                let colDiv = document.createElement('div');
                colDiv.className = 'col-lg-5 col-12 mb-lg-4 mb-2';
                colDiv.appendChild(answerBtn);
                answersDiv.appendChild(colDiv);
            });
        }

        function siguientePregunta() {
            // Pasamos a la siguiente pregunta, si hay más
            if (posicion < preguntas.length - 1) {
                posicion++;
                let containerProgressbar = document.querySelector('#containerProgressbar');
                containerProgressbar.innerHTML = `
                <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="${posicion*10}" aria-valuemin="0" aria-valuemax="100">
                    <div class="progress-bar" style="width: ${posicion*10}%"></div>
                </div>
                `;
                cargarPregunta(posicion);
            } else {
                alert("Has terminado el cuestionario");
            }
        }

        document.addEventListener('DOMContentLoaded', function() {
            cargarPregunta(posicion); // Cargamos la primera pregunta al cargar la página
        });
    </script>
</body>

</html>