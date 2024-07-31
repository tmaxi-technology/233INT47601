@extends('layouts.app')

@section('content')
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">Quản lý danh mục</div>

        <div class="card-body">
          @if (session('status'))
          <div class="alert alert-success" role="alert">
            {{ session('status') }}
          </div>
          @endif

          @if(!isset($category))
          {!! Form::open(['route' => 'category.store', 'method' => 'POST']) !!}
          @else

          @endif
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
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Active/Inactive</th>
            <th scope="col">Manage</th>
          </tr>
        </thead>
        <tbody>
          @foreach ($list as $key => $cate)
          <tr>
            <th scope="row">{{ $key }}</th>
            <td>{{$cate->title}}</td>
            <td>{{$cate->description}}</td>
            <td>
              @if($cate->status)
              Hiện thị 
              @else
              Không hiện thị
              @endif
            </td>
            <td>
              {!! Form::open(['method'=>'Delete','route'=>['category.destroy',$cate->id],'onsubmit'=>'return confirm("Xóa hay không?")']) !!}
              {!! Form::submit('Xóa', ['class'=>'btn btn-danger']) !!}
              {!! Form::close() !!}
              <a href="{{route('category.edit', $cate->id)}}" class="btn btn-warning">Sửa</a>
            </td>
          </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </div>
</div>
@endsection