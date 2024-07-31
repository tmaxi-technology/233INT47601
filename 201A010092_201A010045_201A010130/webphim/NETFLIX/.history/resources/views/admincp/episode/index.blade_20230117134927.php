@extends('layouts.app')
@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Tên phim</th>
                    <th scope="col">Tập phim</th>
                    <th scope="col">Link phim</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Quản lý</th>
                </tr>
            </thead>
            <tbody class="order_position">
                @foreach($list_episode as $key => $episode)
                  @foreach($episode->movie as $key => $mov)
                <tr>
                    <th scope="row">{{$key}}</th>
                    <td>{{$mov->title}}</td>
                    {{-- <td>{{$cate->description}}</td>
                    <td>{{$cate->slug}}</td>
                <td>
                    @if($cate->status)
                        Hiển thị
                    @else
                        Không hiển thị
                    @endif
                </td>
                <td>
                    {!! Form::open(['method'=>'DELETE','route'=>['category.destroy',$cate->id],'onsubmit'=>'return confirm("Bạn có chắc muốn xóa?")']) !!}
                        {!! Form::submit('Xóa', ['class'=>'btn btn-danger']) !!}
                    {!! Form::close() !!}
                    <a href="{{route('category.edit',$cate->id)}}" class="btn btn-success">Sửa</a>
                </td> --}}
                </tr>
                  @endforeach
                @endforeach
                </tbody>
            </table>
        </div>
    </div>
</div>
@endsection
