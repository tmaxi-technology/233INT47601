@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Quản Lý Thông Tin Website</div>
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    @if(!isset($info))
                        {!! Form::open(['route'=>'info.store','method'=>'POST']) !!}
                    @else
                        {!! Form::open(['route'=>['info.update',$info->id],'method'=>'PUT']) !!}
                    @endif
                        <div class="form-group">
                            {!! Form::label('title', 'Tiêu đề website', []) !!}
                            {!! Form::text('title', isset($info) ? $info->title : '', ['class'=>'form-control','placeholder'=>'']) !!}
                        </div>
                        <div class="form-group">
                            {!! Form::label('description', 'Mô tả website', []) !!}
                            {!! Form::textarea('description', isset($info) ? $info->description : '', ['style'=>'resize:none', 'class'=>'form-control','placeholder'=>'','id'=>'description','required'=>'required']) !!}
                        </div>
                        <div class="form-group">
                          {!! Form::label('Image', 'Hình ảnh', []) !!}
                          {!! Form::file('image', ['class'=>'form-control-file']) !!}
                          @if(isset($movie))
                          <img width="150" src="{{asset('uploads/movie/'.$movie->image)}}">
                          @endif
                      </div>
                        @if(!isset($info))
                            {!! Form::submit('Thêm Danh Mục', ['class'=>'btn btn-success']) !!}
                        @else
                            {!! Form::submit('Cập Nhật Danh Mục', ['class'=>'btn btn-success']) !!}
                        @endif
                    {!! Form::close() !!}
                </div>
            </div>
            <table class="table" id="tablephim">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên danh mục</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Đường dẫn</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Quản lý</th>
                </tr>
            </thead>
            <tbody class="order_position">
                @foreach($list as $key => $cate)
                <tr id="{{$cate->id}}">
                    <th scope="row">{{$key}}</th>
                    <td>{{$cate->title}}</td>
                    <td>{{$cate->description}}</td>
                    <td>{{$cate->slug}}</td>
                <td>
                    @if($cate->status)
                        Hiển thị
                    @else
                        Không hiển thị
                    @endif
                </td>
                <td>
                    {!! Form::open(['method'=>'DELETE','route'=>['info.destroy',$cate->id],'onsubmit'=>'return confirm("Bạn có chắc muốn xóa?")']) !!}
                        {!! Form::submit('Xóa', ['class'=>'btn btn-danger']) !!}
                    {!! Form::close() !!}
                    <a href="{{route('info.edit',$cate->id)}}" class="btn btn-success">Sửa</a>
                </td>
                </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
