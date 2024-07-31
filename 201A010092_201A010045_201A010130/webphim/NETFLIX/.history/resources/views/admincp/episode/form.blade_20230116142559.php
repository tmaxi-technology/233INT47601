@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <div class="card">
                <a href="{{route('movie.index')}}" class="btn btn-primary">Liệt Kê Danh Sách Tập Phim
                </a>
                <div class="card-header">Quản Lý Tập Phim</div>
                <div class="card-body">
                    @if (session('status'))
                        <div class="alert alert-success" role="alert">
                            {{ session('status') }}
                        </div>
                    @endif
                    @if(!isset($movie))
                        {!! Form::open(['route'=>'movie.store','method'=>'POST','enctype'=>'multipart/form-data']) !!}
                    @else
                        {!! Form::open(['route'=>['movie.update',$movie->id],'method'=>'PUT','enctype'=>'multipart/form-data']) !!}
                    @endif
                        
                        <div class="form-group">
                            {!! Form::label('Hot', 'Phim hot', []) !!}
                            {!! Form::select('phim_hot', ['1'=>'Có','0'=>'Không'], isset($movie) ? $movie->phim_hot : '', ['class'=>'form-control']) !!}
                        </div>
                            @if(!isset($movie))
                                {!! Form::submit('Thêm Tập Phim', ['class'=>'btn btn-success']) !!}
                            @else
                                {!! Form::submit('Cập Nhật Tập Phim', ['class'=>'btn btn-success']) !!}
                            @endif
                        {!! Form::close() !!}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection