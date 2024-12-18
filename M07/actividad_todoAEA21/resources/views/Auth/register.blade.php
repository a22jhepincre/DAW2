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

        /*.border-succes{*/
        /*    border-color: #2ca02c;*/
        /*}*/

        @media (min-width: 768px) {
            .gradient-form {
                height: 100vh !important;
            }
        }
        @media (min-width: 769px) {
            .gradient-custom-2 {
                border-top-right-radius: .3rem;
                border-bottom-right-radius: .3rem;
            }
        }
    </style>
@endsection

@section('content')
    <section class="h-100 gradient-form">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-xl-10">
                    <div class="card rounded-3 text-black">
                        <div class="row g-0">
                            <div class="col-lg-6">
                                <div class="card-body p-md-5 mx-md-4">

                                    <div class="text-center">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                                             style="width: 185px;" alt="logo">
                                        <h4 class="mt-1 mb-5 pb-1">Lorem lorem lorem</h4>
                                    </div>
                                    @if($errors->has('error'))
                                        <div class="alert alert-danger">
                                            {{ $errors->first('error') }}
                                        </div>
                                    @endif
                                    <form
                                        action="{{route('create.credentials')}}"
                                        method="POST"
                                    >
                                        @csrf
                                        <p>Please register your account</p>

                                        <div class="row">
                                            <div class="col-lg-6 col-12 mb-3">
                                                <div class="form-floating">
                                                    <input type="text" class="form-control" id="username" name="username" placeholder="Juan">
                                                    <label for="floatingInput">Username</label>
                                                </div>
                                                <p class="text-danger fs-7" id="validator-username"></p>
                                            </div>
                                            <div class="col-lg-6 col-12 mb-3">
                                                <div class="form-floating">
                                                    <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com">
                                                    <label for="floatingInput">Email address</label>
                                                </div>
                                                <p class="text-danger fs-7" id="validator-email"></p>
                                            </div>
                                        </div>

                                        <div class="mb-3">
                                            <div class="form-floating d-flex position-relative">
                                                <input type="password" class="form-control" id="password" name="password" placeholder="Password">
                                                <label for="password">Password</label>
                                                <i class="bi bi-eye-slash position-absolute end-0 top-50 translate-middle-y me-3" id="toggle-password" style="cursor: pointer;"></i>
                                            </div>
                                            <p class="text-danger fs-7" id="validator-password"></p>
                                        </div>

                                        <div class="mb-3">
                                            <div class="form-floating d-flex position-relative">
                                                <input type="password" class="form-control" id="password-repeat" placeholder="Password-repeat">
                                                <label for="password-repeat">Password Repeat</label>
                                                <i class="bi bi-eye-slash position-absolute end-0 top-50 translate-middle-y me-3" id="toggle-password-repeat" style="cursor: pointer;"></i>
                                            </div>
                                            <p class="text-danger fs-7" id="validator-password-repeat"></p>
                                        </div>


                                        <div class="text-center pt-1 mb-5 pb-1 d-flex flex-column">
                                            <button class="btn btn-primary fa-lg gradient-custom-2 mb-3" id="btn-submit" type="submit" disabled>Sign
                                                in</button>
                                        </div>

                                        <div class="d-flex align-items-center justify-content-center pb-4">
                                            <p class="mb-0 me-2">Do you have an account?</p>
                                            <a href="{{route('login')}}" class="btn btn-outline-danger">Log in</a>
                                        </div>

                                    </form>

                                </div>
                            </div>
                            <div class="col-lg-6 d-flex align-items-center gradient-custom-2">
                                <div class="text-white px-3 py-4 p-md-5 mx-md-4">
                                    <h4 class="mb-4">We are more than just a company</h4>
                                    <p class="small mb-0">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
                                        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                                        exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
@endsection

@section('page-script')
    <script src="{{asset('auth/register.js')}}"></script>
@endsection
