@extends('layouts.app')
@section('content')
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#category">
    Thêm nhanh
    </button>

    <!-- Modal -->
<div class="modal fade" id="category" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        {!! Form::open(['route'=>'category.store','method'=>'POST']) !!}
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Thêm thể loại phim</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            {!! Form::submit('Thêm thể loại', ['class'=>'btn btn-primary']) !!}
        </div>
        </div>
        {!! Form::close() !!}
    </div>
</div>
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <table class="table table-responsive" id="tablephim">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên phim</th>
                    <th scope="col">Hình ảnh phim</th>
                    <th scope="col">Tập phim</th>
                    <th scope="col">Link phim</th>
                    {{-- <th scope="col">Trạng thái</th> --}}
                    <th scope="col">Quản lý</th>
                </tr>
            </thead>
            <tbody>
                @foreach($list_episode as $key => $episode)
                <tr>
                    <th scope="row">{{$key}}</th>
                    <td>{{$episode->movie->title}}</td>
                    <td>
                    <img width="100" src="{{asset('uploads/movie/'.$episode->movie->image)}}">
                    </td>
                    <td>{{$episode->episode}}</td>
                    <td style="width: 20%">{{$episode->linkphim}}</td>
                {{-- <td>
                    @if($cate->status)
                        Hiển thị
                    @else
                        Không hiển thị
                    @endif
                </td> --}}
                <td>
                    {!! Form::open(['method'=>'DELETE','route'=>['episode.destroy',$episode->id],'onsubmit'=>'return confirm("Bạn có chắc muốn xóa?")']) !!}
                        {!! Form::submit('Xóa', ['class'=>'btn btn-danger']) !!}
                    {!! Form::close() !!}
                    <a href="{{route('episode.edit',$episode->id)}}" class="btn btn-success">Sửa</a>
                </td>
                </tr>
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
