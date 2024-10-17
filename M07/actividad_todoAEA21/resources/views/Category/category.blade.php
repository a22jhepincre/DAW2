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
                            <li><a class="dropdown-item" href="{{ route('plans.index') }}">Plans</a></li>
                            <li><a class="dropdown-item" href="{{ route('logout') }}">Log out</a></li>

                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </nav>


    <div class="p-4">
        <div class="row" id="container-card-categories">
            <button id="btn-open-modal-add-category"
                    class="card col-lg-3 col-12 me-lg-4 me-2"
                    style="height: 400px;width: 350px; background-color: #d5d5d5">
                <div class="card-body d-flex justify-content-center align-items-center w-100">
                    <i class="bi bi-plus-circle fs-3" style="color: #9b9b9b"></i>
                </div>
            </button>
                @forelse($categories as $category)
                    <a href="javascript:;" class="card col-lg-3 col-12 me-lg-4 me-2 text-decoration-none p-0" style="height: 400px; width: 350px;" id="card-category-{{$category->id}}">
                        <div class="card-header bg-white d-flex justify-content-between">
                            <h4 class="card-title m-0 w-50" id="category-name-{{$category->id}}">
                                {{$category->name}}
                            </h4>
{{--                            <form id="delete-category-form-{{$category->id}}" method="POST" action="{{ route('category.delete', ['id' => $category->id]) }}" class="d-none">--}}
{{--                                @csrf--}}
{{--                                @method('DELETE')--}}
{{--                            </form>--}}
                            <div>
                                <button class="btn gradient-custom-2 btn-sm btn-add-note" data-id-category="{{$category->id}}">
                                    <i class="bi bi-plus text-white"></i>
                                </button>
                                <button class="btn gradient-custom-2 btn-sm btn-edit-category"
                                        data-id-category="{{$category->id}}"
                                        data-name-category="{{$category->name}}">
                                    <i class="bi bi-pencil-square text-white"></i>
                                </button>
                                <button class="btn gradient-custom-2 btn-sm btn-delete-category"
                                        data-id-category="{{$category->id}}">
                                    <i class="bi bi-trash text-white"></i>
                                </button>
                            </div>

                        </div>
                        <div class="card-body" style="height: calc(100% - 56px); overflow-y: auto;">
                            @forelse($category->notes as $note)
                                <div class="card mb-2" id="note-{{$note->id}}">
                                    <div class="card-body d-flex justify-content-between">
                                        <div>
                                            <p class="fs-6 fw-bold m-0">{{$note->title}}</p>
                                            <p class="fs-8 m-0">{{$note->description}}</p>
                                        </div>

                                        <div>
                                            <button class="btn btn-sm btn-secondary btn-edit-note"
                                                    data-id-category="{{$category->id}}"
                                                    data-id-note="{{$note->id}}"
                                                    data-title-note="{{$note->title}}"
                                                    data-description-note="{{$note->description}}"
                                            ><i class="bi bi-pencil-square"></i></button>

                                            <form id="delete-note-form-{{$note->id}}" method="POST" action="{{ route('note.delete', ['id' => $note->id]) }}" class="d-none">
                                                @csrf
                                                @method('DELETE')
                                            </form>
                                            <button class="btn btn-sm btn-danger btn-delete-note"
                                                    data-id-category="{{$category->id}}"
                                                    data-id-note="{{$note->id}}"
                                            ><i class="bi bi-trash"></i></button>
                                        </div>
                                    </div>
                                </div>
                            @empty
                                <div class="card-body d-flex justify-content-center align-items-center">
                                    <p>No hay notas registradas.</p>
                                </div>
                            @endforelse
                        </div>
                    </a>
                @empty
                @endforelse
        </div>
    </div>
@endsection

@section('page-modal')
    <div class="modal fade" id="modal-category" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Nueva Categoria</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="form-category"
{{--                          action="{{route('category.store')}}"--}}
{{--                          method="POST"--}}
                    >
                        @csrf
                        <input value="" id="id-category" name="id" hidden/>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-book"></i></span>
                            <input type="text" class="form-control" name="name" id="name" aria-label="Username" aria-describedby="basic-addon1">
                        </div>

                        <button type="button" id="btn-add-category" class="btn btn-primary">Save</button>
                        <button type="button" id="btn-update-category" class="btn btn-primary d-none">Update</button>
                    </form>
                </div>

            </div>
        </div>
    </div>

    <div class="modal fade" id="modal-note" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">New Note</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form id="form-note"
                        action="{{route('note.store')}}"
                        method="POST">
                        @csrf

                        <input value="" id="idCategory" name="idCategory" hidden/>
                        <input value="" id="idNote" name="id" hidden/>
                        <div class="input-group mb-3">
                            <span class="input-group-text" id="basic-addon1"><i class="bi bi-book"></i></span>
                            <input type="text" class="form-control" name="title" id="title" aria-label="Username" aria-describedby="basic-addon1">
                        </div>

                        <div class="input-group mb-3">
                            <textarea class="form-control" name="description" id="description" aria-label="Description" rows="3"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Save</button>
                    </form>
                </div>

            </div>
        </div>
    </div>
@endsection

@section('page-script')
    <script>
        window.authToken = '{{ session('auth_token') }}';
    </script>
    <script src="{{asset('cate/index.js')}}"></script>
@endsection
