@extends('Layouts.master')

@section('page-style')
    <style>
        .gradient-custom-2 {
            /* fallback for old browsers */
            background: #fccb90;

            /* Chrome 10-25, Safari 5.1-6 */
            background: -webkit-linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);

            /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
            background: linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593);
        }
    </style>
@endsection

@section('content')
    <nav class="navbar navbar-expand-lg bg-body-tertiary gradient-custom-2">
        <div class="container-fluid">

            <a class="navbar-brand" href="#">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                                  style="width: 80px;" alt="logo">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav w-100" >
                    <li class="nav-item w-100 text-center" >
                        <a class="nav-link text-white fw-bold fs-3" href="javascript:;">
                            ¡Hola {{\Illuminate\Support\Facades\Auth::user()->name}}!
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-white" href="javascript:;" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-person-fill fs-3 text-white"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="javascript:;">Action</a></li>
                            <li><a class="dropdown-item" href="javascript:;">Another action</a></li>
                            <li><a class="dropdown-item" href="javascript:;">Something else here</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>


    <div class="p-4">
        <div class="row">
            <a class="card col-lg-3 col-12 me-lg-4 me-2" style="height: 400px;width: 350px; background-color: #d5d5d5">
                <div class="card-body d-flex justify-content-center align-items-center">
                    <i class="bi bi-plus-circle fs-3" style="color: #9b9b9b"></i>
                </div>
            </a>

            <a class="card col-lg-3 col-12 me-lg-4 me-2" style="height: 400px;width: 350px;">
                <div class="card-header">
                    <div class="card-title">
                        Lista de la compra
                    </div>
                </div>
                <div class="card-body d-flex justify-content-center align-items-center">

                </div>
            </a>
        </div>
    </div>

@endsection

@section('page-script')
@endsection
