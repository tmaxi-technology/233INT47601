@extends('layouts.app')

@section('content')
<div class="container">
  <div class="row justify-content-center">
    <div class="col-md-12">
      <div class="card">
        <div class="card-header">Quản lý phim</div>

        <div class="card-body">
          @if (session('status'))
          <div class="alert alert-success" role="alert">
            {{ session('status') }}
          </div>
          @endif

          @if(!isset($movie))
          {!! Form::open(['route' => 'movie.store', 'method' => 'POST', 'enctype'=>'multipart/form-data']) !!}
          @else
          {!! Form::open(['route' => ['movie.update', $movie->id], 'method' => 'PUT']) !!}  
          @endif

          <div class="form-group">
            {!! Form::label('title', 'Title', []) !!}
            {!! Form::text('title', isset($movie) ? $movie->title : '', ['class'=>'form-control', 'placeholder'=>'Nhập dữ liệu...', 'id'=>'slug', 'onkeyup'=>'ChangeToSlug()']) !!}
          </div>

          <div class="form-group">
            {!! Form::label('slug', 'Slug', []) !!}
            {!! Form::text('slug', isset($movie) ? $movie->slug : '', ['class'=>'form-control', 'placeholder'=>'Nhập dữ liệu...', 'id'=>'convert_slug']) !!}
          </div>

          <div class="form-group">
            {!! Form::label('description', 'Description', []) !!}
            {!! Form::textarea('description', isset($movie) ? $movie->description : '', ['style'=>'resize:none','class'=>'form-control', 'placeholder'=>'Nhập dữ liệu...', 'id'=>'description']) !!}
          </div>

          <div class="form-group">
            {!! Form::label('Active', 'Active', []) !!}
            {!! Form::select('status', ['1'=>'Hiện thị', '0'=>'Không'] , isset($movie) ? $movie->status : '', ['class'=>'form-control']) !!}
          </div>

          <div class="form-group">
            {!! Form::label('Category', 'Category', []) !!}
            {!! Form::select('category_id', $category , isset($movie) ? $movie->category_id : '', ['class'=>'form-control']) !!}
          </div>

          <div class="form-group">
            {!! Form::label('Country', 'Country', []) !!}
            {!! Form::select('country_id', $country , isset($movie) ? $movie->country_id : '', ['class'=>'form-control']) !!}
          </div>

          <div class="form-group">
            {!! Form::label('Genre', 'Genre', []) !!}
            {!! Form::select('genre_id', $genre, isset($movie) ? $movie->genre_id : '', ['class'=>'form-control']) !!}
          </div>

          <div class="form-group">
            {!! Form::label('Image', 'Image', []) !!}
            {!! Form::file('image',['class'=>'form-control-file']) !!}
            @if($movie)
              <img width="20%" src="{{asset('uploads/movie/'.$movie->image)}}">
            @endif
          </div>

          @if(!isset($movie))
          {!! Form::submit('Thêm dữ liệu', ['class'=>'btn btn-success']) !!}
          @else
          {!! Form::submit('Cập nhật', ['class'=>'btn btn-success']) !!}
          @endif
          {!! Form::close() !!}
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Title</th>
            <th scope="col">Image</th>
            <th scope="col">Description</th>
            <th scope="col">slug</th>
            <th scope="col">Active/Inactive</th>
            <th scope="col">Category</th>
            <th scope="col">Genre</th>
            <th scope="col">Country</th>
          </tr>
        </thead>
        <tbody>
          @foreach ($list as $key => $cate)
          <tr>
            <th scope="row">{{ $key }}</th>
            <td>{{$cate->title}}</td>
            <td><img width="60%" src="{{asset('uploads/movie/'.$cate->image)}}"></td>
            <td>{{$cate->description}}</td>
            <td>{{$cate->slug}}</td>
            <td>
              @if($cate->status)
              Hiện thị 
              @else
              Không hiện thị
              @endif
            </td>
            <td>
              {!! Form::open(['method'=>'Delete','route'=>['movie.destroy',$cate->id],'onsubmit'=>'return confirm("Xóa hay không?")']) !!}
              {!! Form::submit('Xóa', ['class'=>'btn btn-danger']) !!}
              {!! Form::close() !!}
              <a href="{{route('movie.edit', $cate->id)}}" class="btn btn-success">Sửa</a>
            </td>
          </tr>
          @endforeach
        </tbody>
      </table>
    </div>
  </div>
</div>
@endsection