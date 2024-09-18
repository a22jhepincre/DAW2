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
        }
    </style>
</head>

<body>
    <div class="center-screen w-100 text-center">
        <div class="row w-100">
            <div class="col-lg-12 col-12">
                <img src="../img/question.png" />
            </div>
        </div>
        <div class="row w-100 mt-3">
            <div class="col-lg-12 col-12">
                <a class="btn btn-primary btn-lg fs-2 fw-bold btn-shadow w-btn-play" href="juego.php">JUGAR SIN REGISTRARME</a>
            </div>
        </div>
        <div class="row w-100 mt-3">
            <div class="col-lg-12 col-12">
                <button class="btn btn-primary btn-lg fs-2 fw-bold btn-shadow w-btn-play"
                    data-bs-toggle="modal"
                    data-bs-target="#registroModal">JUGAR REGISTRANDOME</button>
            </div>
        </div>
    </div>

    <!-- MODALS -->

    <!-- Modal -->
    <div class="modal fade" id="registroModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="form">
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                                </svg>
                            </span>
                            <input type="text" class="form-control" id="name" placeholder="Nombre" aria-label="name" aria-describedby="basic-addon1">
                        </div>
                    </div>
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button class="btn btn-primary" id="btnRegister">Registrame</button>
                </div>
            </div>
        </div>
    </div>

    <script src="../bootstrap/js/bootstrap.min.js"></script>
    <script src="../js/home.js"></script>
    <!-- <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script> -->
</body>

</html>