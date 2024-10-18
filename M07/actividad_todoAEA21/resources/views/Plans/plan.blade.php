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

        .card-body {
            height: calc(100% - 56px);
            overflow-y: auto; /* Habilita el scroll vertical */
            scrollbar-width: thin; /* Para navegadores Firefox */
            scrollbar-color: #d3d3d3 #f1f1f1; /* Color del scrollbar */
        }

        .card-body::-webkit-scrollbar {
            width: 8px; /* Ancho del scrollbar */
        }

        .card-body::-webkit-scrollbar-track {
            background: #f1f1f1; /* Color de fondo del track del scrollbar */
            border-radius: 10px; /* Bordes redondeados del track */
        }

        .card-body::-webkit-scrollbar-thumb {
            background: #d3d3d3; /* Color del scrollbar (gris claro) */
            border-radius: 10px; /* Bordes redondeados del thumb */
        }

        .card-body::-webkit-scrollbar-thumb:hover {
            background: #b0b0b0; /* Color del scrollbar al pasar el mouse (gris más oscuro) */
        }


    </style>
@endsection

@section('content')
    <nav class="navbar navbar-expand-lg bg-body-tertiary gradient-custom-2">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">
                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp" style="width: 80px;" alt="logo">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNavDropdown">
                <ul class="navbar-nav w-100">
                    <li class="nav-item w-100 text-center">
                        <a class="nav-link text-white fw-bold fs-3" href="javascript:;">
                            ¡Hello {{ \Illuminate\Support\Facades\Auth::user()->name }}!
                        </a>
                    </li>
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle text-white" href="javascript:;" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-person-fill fs-3 text-white"></i>
                        </a>
                        <ul class="dropdown-menu dropdown-menu-end"> <!-- Aquí se añade dropdown-menu-end -->
                            <li><a class="dropdown-item" href="{{ route('logout') }}">Log out</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="container" style="padding-top: 4rem;">
        <div class="row pt-10">
            @forelse($plans as $key=>$plan)
                <div class="col-lg-3">
                    <div class="card">
                        <div class="card-header bg-primary">
                            <div class="card-title text-white">
                                <label class="fs-5 ">{{$plan->name}}</label>
                                <p class="fs-1 fw-bold">{{number_format($plan->price/2, 2, ',', '.')}}€<span class="fs-6 fw-normal"> /al mes + IVA</span></p>
                                <p>
                                    @php
                                        $priceSave = ($plan->price/2)*3;
                                    @endphp
                                    <del>{{$plan->price}}</del> Ahorra {{number_format($priceSave, 2, ',', '.')}} en 3 meses
                                </p>
                            </div>
                        </div>
                        <div class="card-body d-grid gap-2">
                            <div style="height: 60px">
                                {{$plan->description}}
                            </div>
                            <hr>
                            <div class="fs-6 d-flex justify-content-between">
                                <p class="m-0 fw-semibold">Categorias</p>
                                @if($plan->categories !== null)
                                    <p class="m-0">{{$plan->categories}}</p>
                                @else
                                    <i class="bi bi-infinity"></i>
                                @endif
                            </div>

                            <div class="fs-6 d-flex justify-content-between">
                                <p class="m-0 fw-semibold">Notes</p>
                                @if($plan->note_limit_by_category !== null)
                                    <p class="m-0">{{$plan->note_limit_by_category}}</p>
                                @else
                                    <i class="bi bi-infinity"></i>
                                @endif
                            </div>

                            <div class="fs-6 d-flex justify-content-between">
                                <p class="m-0 fw-semibold">Categorias</p>
                                @if($plan->collaboration)
                                    <i class="bi bi-check-circle-fill text-success"></i>
                                @else
                                    <i class="bi bi-x-circle-fill text-danger"></i>
                                @endif
                            </div>

                            <div class="fs-6 d-flex justify-content-between">
                                <p class="m-0 fw-semibold">File attachments</p>
                                @if($plan->file_attachments)
                                    <i class="bi bi-check-circle-fill text-success"></i>
                                @else
                                    <i class="bi bi-x-circle-fill text-danger"></i>
                                @endif
                            </div>

                            <div class="fs-6 d-flex justify-content-between">
                                <p class="m-0 fw-semibold">Priority support</p>
                                @if($plan->priority_support)
                                    <i class="bi bi-check-circle-fill text-success"></i>
                                @else
                                    <i class="bi bi-x-circle-fill text-danger"></i>
                                @endif
                            </div>

                            <div class="container-button w-100">
                                <button class="w-100 btn btn-primary btn-buy-plan">
                                    Buy now
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            @empty

            @endforelse

        </div>

    </div>
@endsection

@section('page-modal')

@endsection

@section('page-script')
    <script>
        window.authToken = '{{ session('auth_token') }}';
    </script>
@endsection
