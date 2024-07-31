@extends('layouts.app')

@section('content')
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <div class="card">
        <div class="card-header">Quản lý danh mục</div>

        <div class="card-body">
          @if (session('status'))
          <div class="alert alert-success" role="alert">
            {{ session('status') }}
          </div>
          @endif

          {!! Form::open(['route' => 'category.store', 'method' => 'POST']) !!}
          <div class="form-group">
            {!! Form::label('title', 'Title', []) !!}
            {!! Form::text('title', null, ['class'=>'form-control', 'placeholder'=>'Nhập dữ liệu...', 'id'=>'title']) !!}
          </div>
          <div class="form-group">
            {!! Form::label('description', 'Description', []) !!}
            {!! Form::textarea('description', null, ['style'=>'resize:none','class'=>'form-control', 'placeholder'=>'Nhập dữ liệu...', 'id'=>'description']) !!}
          </div>
          <div class="form-group">
            {!! Form::label('Active', 'Active', []) !!}
            {!! Form::select('status', ['1'=>'Hiện thị', '0'=>'Không'], null, ['class'=>'form-control']) !!}
          </div>
          {!! Form::submit('Thêm dữ liệu', ['class'=>'btn btn-success']) !!}
          {!! Form::close() !!}
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
@endsection