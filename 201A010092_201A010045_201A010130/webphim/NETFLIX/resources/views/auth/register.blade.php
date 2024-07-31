@extends('layouts.layout_register')
@section('content_register')
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">{{ __('Register') }}</div>

        <div class="card-body">
          <form method="POST" action="{{ route('register') }}">
            @csrf

            <div class="row mb-3">
              <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Name') }}</label>

              <div class="col-md-6">
                <input id="name" type="text" class="form-control @error('name') is-invalid @enderror" name="name"
                  value="{{ old('name') }}" required autocomplete="name" autofocus>

                @error('name')
                <span class="invalid-feedback" role="alert">
                  <strong>{{ $message }}</strong>
                </span>
                @enderror
              </div>
            </div>

            <div class="row mb-3">
              <label for="email" class="col-md-4 col-form-label text-md-end">{{ __('Email Address') }}</label>

              <div class="col-md-6">
                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email"
                  value="{{ old('email') }}" required autocomplete="email">

                @error('email')
                <span class="invalid-feedback" role="alert">
                  <strong>{{ $message }}</strong>
                </span>
                @enderror
              </div>
            </div>

            <div class="row mb-3">
              <label for="password" class="col-md-4 col-form-label text-md-end">{{ __('Password') }}</label>

              <div class="col-md-6">
                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror"
                  name="password" required autocomplete="new-password">

                @error('password')
                <span class="invalid-feedback" role="alert">
                  <strong>{{ $message }}</strong>
                </span>
                @enderror
              </div>
            </div>

            <div class="row mb-3">
              <label for="password-confirm"
                class="col-md-4 col-form-label text-md-end">{{ __('Confirm Password') }}</label>

              <div class="col-md-6">
                <input id="password-confirm" type="password" class="form-control" name="password_confirmation" required
                  autocomplete="new-password">
              </div>
            </div>

            <div class="row mb-0">
              <div class="col-md-6 offset-md-4">
                <button type="submit" class="btn btn-primary">
                  {{ __('Register') }}
                </button>
              </div>
            </div>
          </form>
          {{-- <form method="POST" action="{{ route('register') }}">
            @csrf
            <div class="section">
                <div class="container">
                    <div class="row full-height justify-content-center">
                        <div class="col-12 text-center align-self-center py-5">
                            <div class="section pb-5 pt-5 pt-sm-2 text-center">
                                <h6 class="mb-0 pb-3">
                                    <span>Log In </span>
                                    <span>Sign Up</span>
                                </h6>
                                <input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                                <label for="reg-log"></label>
                                <div class="card-3d-wrap mx-auto">
                                    <div class="card-3d-wrapper">
                                        <div class="card-back">
                                          <div class="center-wrap">
                                              <div class="section text-center">
                                                  <h4 class="mb-4 pb-3">Sign Up</h4>
                                                  <div class="form-group mt-2">
                                                    <label for="name" class="col-md-4 col-form-label text-md-end">{{ __('Name') }}</label>
                                      
                                                    <div class="col-md-12">
                                                      <input id="name" type="text" class="form-style @error('name') is-invalid @enderror" name="name"
                                                        value="{{ old('name') }}" required autocomplete="off" autocomplete="name" autofocus placeholder="Your Full Name" >
                                                        <i class="input-icon uil uil-at"></i>
                                      
                                                      @error('name')
                                                      <span class="invalid-feedback" role="alert">
                                                        <strong>{{ 'Vui lòng điền tên' }}</strong>
                                                      </span>
                                                      @enderror
                                                    </div>
                                                  </div>
                                      
                                                  <div class="form-group mt-2">
                                                    <label for="email" class="col-md-4 col-form-label text-md-end">{{ __('Email Address') }}</label>
                                      
                                                    <div class="col-md-12">
                                                      <input id="email" type="email" class="form-style @error('email') is-invalid @enderror" name="email"
                                                        value="{{ old('email') }}" required autocomplete="off" autocomplete="email" placeholder="Your Email">
                                                      <i class="input-icon uil uil-user"></i>
                                      
                                                      @error('email')
                                                      <span class="invalid-feedback" role="alert">
                                                        <strong>{{ 'Vui lòng nhập Email' }}</strong>
                                                      </span>
                                                      @enderror
                                                    </div>
                                                  </div>
                                      
                                                  <div class="form-group mt-2">
                                                    <label for="password" class="col-md-4 col-form-label text-md-end">{{ __('Password') }}</label>
                                      
                                                    <div class="col-md-12">
                                                      <input id="password" type="password" class="form-style @error('password') is-invalid @enderror"
                                                        name="password" required autocomplete="off" autocomplete="new-password" placeholder="Your Password">
                                                      <i class="input-icon uil uil-lock-alt"></i>
                                      
                                                      @error('password')
                                                      <span class="invalid-feedback" role="alert">
                                                        <strong>{{ 'Vui lòng nhập mật khẩu' }}</strong>
                                                      </span>
                                                      @enderror
                                                    </div>
                                                  </div>
                                                  <button type="submit" class="btn mt-4">
                                                    {{ __('Register') }}
                                                  </button>
                                              </div>
                                          </div>
                                      </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </form> --}}
        </div>
      </div>
    </div>
  </div>
</div>
@endsection