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

          {!! Form::open(['url' => 'category.store', 'method' => 'POST']) !!}
          <div class="form-group">
            {!! Form::label('title', 'Title', []) !!}
            {!! Form::text('title', null, ['class']) !!}
          </div>
          {!! Form::close() !!}
        </div>
      </div>
    </div>
  </div>
</div>
@endsection