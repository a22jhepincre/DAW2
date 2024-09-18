<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="../bootstrap/css/bootstrap.min.css">
    <!-- <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous"> -->
    <style>
        .btn-shadow {
            box-shadow: 15px 15px 15px rgba(113, 154, 174, 1);
        }

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

        .w-btn-play {
            width: 60%;
        }

        /* Si quieres mantener proporciones entre texto e imagen en todos los tamaños */
        @media (min-width: 768px) {
            .w-btn-play {
                width: 30% !important;
            }
            .w-lg-25{
                width: 25% !important;
            }
        }
    </style>
</head>

<body>
    <div class="center-screen w-100 text-center">
        <div class="row w-100">
            <div class="col-lg-12 col-12">
                <img src="../img/question.png" class="img-fluid"/>
            </div>
        </div>
        <div class="row w-100 mt-3">
            <div class="col-lg-12 col-12">
                <div class="d-flex justify-content-center align-items-center">
                    <div class="w-50 w-lg-25">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" id="name" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default">
                        </div>
                        <button class="btn btn-primary btn-lg fs-2 fw-bold btn-shadow w-100" id="btnPlay">JUGAR</a>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-12 col-12">
                <a class="btn btn-sm btn-primary" href="ranking.php">RANKING</a>
            </div>
        </div>
    </div>

    <script src="../bootstrap/js/bootstrap.min.js"></script>
    <script src="../js/home.js"></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script> -->
</body>

</html>