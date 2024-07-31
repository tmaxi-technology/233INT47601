@extends('layouts.layout_login')
@section('content_login')
<form method="POST" action="{{ route('login') }}">
@csrf
<div class="section">
  <div class="container">
      <div class="row full-height justify-content-center">
          <div class="col-12 text-center align-self-center py-5">
              <div class="section pb-5 pt-5 pt-sm-2 text-center">
                  <input class="checkbox" type="checkbox" id="reg-log" name="reg-log"/>
                  <div class="card-3d-wrap mx-auto">
                      <div class="card-3d-wrapper">
                          <div class="card-front">
                              <div class="center-wrap">
                                  <div class="section text-center">
                                      <h4 class="mb-4 pb-3">Đăng Nhập Tài Khoản</h4>
                                      <div class="form-group">
                                        <div class="col-md-12 text-field">
                                        <label for="email">Email</label>
                                          <input id="email" type="email" class=" @error('email') is-invalid @enderror" name="email"
                                            value="{{ old('email') }}" required autocomplete="off" autofocus placeholder="Nhập email" >
                                          @error('email')
                                          <span class="invalid-feedback" role="alert">
                                            <strong>{{ 'Email Hoặc Mật Khẩu Không Chính Xác' }}</strong>
                                          </span>
                                          @enderror
                                        </div>
                                      </div>
                          
                                      <div class="form-group mt-2">
                                        <div class="col-md-12 text-field">
                                          <label for="password">Mật Khẩu</label>
                                          <input id="password" type="password" class=" @error('password') is-invalid @enderror"
                                            name="password" autocomplete="off" placeholder="Nhập mật khẩu" required>
                                          @error('password')
                                          <span class="invalid-feedback" role="alert">
                                            <strong>{{ 'Email Hoặc Mật Khẩu Không Chính Xác' }}</strong>
                                          </span>
                                          @enderror
                                        </div>
                                      </div>
                                      <button class="btn mt-4" type="submit">
                                        {{ __('ĐĂNG NHẬP') }}
                                      </button>
                                      <p class="mb-0 mt-4 text-center">
                                          <a href="#0" class="link">Quên mật khẩu?</a>
                                      </p>
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
</form>
@endsection