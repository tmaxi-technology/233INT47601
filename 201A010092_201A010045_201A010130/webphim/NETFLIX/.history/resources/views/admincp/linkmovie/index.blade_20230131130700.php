@extends('layouts.app')
@section('content')

<table class="table" id="tablephim">
<thead>
    <tr>
        <th scope="col">#</th>
        <th scope="col">Tên link</th>
        <th scope="col">Mô tả</th>
        <th scope="col">Trạng thái</th>
        <th scope="col">Quản lý</th>
    </tr>
</thead>
<tbody class="order_position">
    @foreach($linkmovie as $key => $movielink)
    <tr>
        <th scope="row">{{$key}}</th>
        <td>{{$movielink->title}}</td>
        <td>{{$movielink->description}}</td>
    <td>
        @if($movielink->status)
            Hiển thị
        @else
            Không hiển thị
        @endif
    </td>
    <td>
        {!! Form::open(['method'=>'DELETE','route'=>['linkmovie.destroy',$movielink->id],'onsubmit'=>'return confirm("Bạn có chắc muốn xóa?")']) !!}
            {!! Form::submit('Xóa', ['class'=>'btn btn-danger']) !!}
        {!! Form::close() !!}
        <a href="{{route('linkmovie.edit',$movielink->id)}}" class="btn btn-success">Sửa</a>
    </td>
    </tr>
    @endforeach
    </tbody>
</table>
@endsection
