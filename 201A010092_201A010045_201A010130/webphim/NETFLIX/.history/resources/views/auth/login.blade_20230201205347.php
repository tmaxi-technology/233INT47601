@extends('layouts.layout_login')
@section('content_login')
<div id="logreg-forms">
  <form method="POST" action="{{ route('login') }}">
    @csrf
      <h1 class="h3 mb-3 font-weight-normal" style="text-align: center">Đăng nhập webphim</h1>
      <div class="social-login">
          <button class="btn facebook-btn social-btn" type="button"><span><i class="fab fa-facebook-f"></i> Sign in with Facebook</span> </button>
          <button class="btn google-btn social-btn" type="button"><span><i class="fab fa-google-plus-g"></i> Sign in with Google+</span> </button>
      </div>
      <p style="text-align:center"> OR  </p>
      <div class="row mb-3">
              <label for="email" class="col-md-4 col-form-label text-md-end">{{ __('Email Address') }}</label>

              <div class="col-md-8">
                <input id="email" type="email" class="form-control @error('email') is-invalid @enderror" name="email"
                  value="{{ old('email') }}" required autocomplete="email" autofocus>

                @error('email')
                <span class="invalid-feedback" role="alert">
                  <strong>{{ $message }}</strong>
                </span>
                @enderror
              </div>
            </div>

            <div class="row mb-3">
              <label for="password" class="col-md-4 col-form-label text-md-end">{{ __('Password') }}</label>

              <div class="col-md-8">
                <input id="password" type="password" class="form-control @error('password') is-invalid @enderror"
                  name="password" required autocomplete="current-password">

                @error('password')
                <span class="invalid-feedback" role="alert">
                  <strong>{{ $message }}</strong>
                </span>
                @enderror
              </div>
            </div>
      <button class="btn btn-success btn-block" type="submit"><i class="fas fa-sign-in-alt"></i>{{ __('Login') }}</button>
      <a href="#" id="forgot_pswd">Forgot password?</a>
      <hr>
      </form>
      <br>
</div>
@endsection