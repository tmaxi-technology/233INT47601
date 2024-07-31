@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">Quản Lý User</div>
                @if($errors->any())
                    <div class="alert alert-danger">
                        <ul>
                            @foreach($errors->all() as $error)
                            <li>{{$error}}</li>
                            @endforeach
                        </ul>
                    </div>
                @endif
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    @if(!isset($visitor))
                        {!! Form::open(['route'=>'visitor.store','method'=>'POST']) !!}
                    @else
                        {!! Form::open(['route'=>['visitor.update',$visitor->id],'method'=>'PUT']) !!}
                    @endif
                        <div class="form-group">
                            {!! Form::label('title', 'Tên danh mục', []) !!}
                            {!! Form::text('title', isset($visitor) ? $visitor->title : '', ['class'=>'form-control','placeholder'=>'','id'=>'slug','onkeyup'=>'ChangeToSlug()']) !!}
                        </div>
                        <div class="form-group">
                            {!! Form::label('slug', 'Đường dẫn', []) !!}
                            {!! Form::text('slug', isset($visitor) ? $visitor->slug : '', ['class'=>'form-control','placeholder'=>'','id'=>'convert_slug']) !!}
                        </div>
                        <div class="form-group">
                            {!! Form::label('description', 'Mô tả danh mục', []) !!}
                            {!! Form::textarea('description', isset($visitor) ? $visitor->description : '', ['style'=>'resize:none', 'class'=>'form-control','placeholder'=>'','id'=>'description']) !!}
                        </div>
                        <div class="form-group">
                            {!! Form::label('status', 'Trạng thái', []) !!}
                            {!! Form::select('status', ['1'=>'Hiển thị','0'=>'Không hiển thị'], isset($visitor) ? $visitor->status : '', ['class'=>'form-control']) !!}
                        </div>
                        @if(!isset($visitor))
                            {!! Form::submit('Thêm Danh Mục', ['class'=>'btn btn-success']) !!}
                        @else
                            {!! Form::submit('Cập Nhật Danh Mục', ['class'=>'btn btn-success']) !!}
                        @endif
                    {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
</div>  
@endsection
