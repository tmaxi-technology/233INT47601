@extends('layouts.app')
@section('content')
<!-- Button trigger modal -->
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#category">
    Thêm nhanh
    </button>

    <!-- Modal -->
    <div class="modal fade" id="category" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
        <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Thêm danh mục phim</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="modal-body">
            ...
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Save changes</button>
        </div>
        </div>
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
        {!! Form::open(['method'=>'DELETE','route'=>['category.destroy',$cate->id],'onsubmit'=>'return confirm("Bạn có chắc muốn xóa?")']) !!}
            {!! Form::submit('Xóa', ['class'=>'btn btn-danger']) !!}
        {!! Form::close() !!}
        <a href="{{route('category.edit',$cate->id)}}" class="btn btn-success">Sửa</a>
    </td>
    </tr>
    @endforeach
    </tbody>
</table>
@endsection
