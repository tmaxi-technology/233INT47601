@extends('layouts.app')
@section('content')
<div class="container-fluid">
    <div class="row justify-content-center">
        <div class="col-md-12">
            <a href="{{route('movie.create')}}" class="btn btn-primary">Thêm Phim</a>
            <table class="table table-responsive" id="tablephim">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Tên phim</th>
                  <th scope="col">Tập phim</th>
                  <th scope="col">Số tập</th>
                  <th scope="col">Từ khóa</th>
                  <th scope="col">Thời lượng phim</th>
                  <th scope="col">Hình ảnh</th>
                  <th scope="col">Phim hot</th>
                  <th scope="col">Định dạng</th>
                  <th scope="col">Phụ đề</th>
                  <!-- <th scope="col">Mô tả</th> -->
                  <th scope="col">Đường dẫn</th>
                  <th scope="col">Trạng thái</th>
                  <th scope="col">Danh mục</th>
                  <th scope="col">Thể loại</th>
                  <th scope="col">Quốc gia</th>
                  <th scope="col">Thuộc phim</th>
                  <th scope="col">Ngày tạo</th>
                  <th scope="col">Ngày cập nhật</th>
                  <th scope="col">Năm</th>
                  <th scope="col">View theo</th>
                  <th scope="col">Season</th>
                  <th scope="col">Quản lý</th>
                </tr>
              </thead>
              <tbody>
                @foreach($list as $key => $cate)
                <tr>
                  <th scope="row">{{$key}}</th>
                  <td>{{$cate->title}}</td>
                  <td>
                    <a href="{{route('add-episode',[$cate->id])}}" class="btn btn-danger btn-sm">Thêm tập phim</a>
                  </td>
                  <td>{{$cate->episode_count}}/{{$cate->sotap}} Tập</td>
                  <td>
                    @if($cate->tags!=NULL)
                      {{substr($cate->tags,0,50)}}...
                      @else
                        Chưa có từ khóa cho phim
                      @endif
                  </td>
                  <td>{{$cate->thoiluong}}</td>
                  <td>
                    <img width="100" src="{{asset('uploads/movie/'.$cate->image)}}">
                    <input type="file" id="file-{{$cate->id}}" data-movie_id="{{$cate->id}}" class="form-control-file file_image" accept="image/*">
                    <span id="error_gallery"></span>
                  </td>
                  <td>
                    {{-- @if($cate->phim_hot==0)
                        Không
                    @else
                        Có
                    @endif --}}
                    <select id="{{$cate->id}}" class="phimhot_choose">
                      @if($cate->phimhot==0)
                        <option value="1">Hot</option>
                        <option selected value="0">Không</option>
                      @else
                        <option selected value="1">Hot</option>
                        <option value="0">Không</option>
                      @endif
                    </select>
                  </td>
                  <td>
                    {{-- @if($cate->resolution==0)
                        HD
                    @elseif($cate->resolution==1)
                        SD
                    @elseif($cate->resolution==2)
                        HDCam
                    @elseif($cate->resolution==3)
                        Cam
                    @elseif($cate->resolution==4)
                        FullHD
                    @else
                      Trailer
                    @endif --}}
                    @php
                        $options = array('0'=>'HD', '1'=>'SD', '2'=>'HDCam','3'=>'Cam', '4'=>'FullHD', '5'=>'Trailer');
                    @endphp
                    <select id="{{$cate->id}}" class="resolution_choose">
                      @foreach($options as $key => $resolution)
                      <option {{$cate->resolution==$key ? 'selected' : ''}} value="{{$key}}">{{$resolution}}</option>
                      @endforeach
                    </select>
                  </td>
                  <td>
                    {{-- @if($cate->phude==0)
                        Phụ đề
                    @else
                        Thuyết minh
                    @endif --}}
                    <select id="{{$cate->id}}" class="phude_choose">
                      @if($cate->phude==0)
                        <option value="1">Thuyết minh</option>
                        <option selected value="0">Phụ đề</option>
                      @else
                        <option selected value="1">Thuyết minh</option>
                        <option value="0">Phụ đề</option>
                      @endif
                    </select>
                  </td>
                  <!-- <td>{{$cate->description}}</td> -->
                  <td>{{$cate->slug}}</td>
                  <td>
                    {{-- @if($cate->status)
                        Hiển thị
                    @else
                        Không hiển thị
                    @endif --}}
                    <select id="{{$cate->id}}" class="trangthai_choose">
                      @if($cate->status==0)
                        <option value="1">Hiện thị</option>
                        <option selected value="0">Không</option>
                      @else
                        <option selected value="1">Hiện thị</option>
                        <option value="0">Không</option>
                      @endif
                    </select>
                  </td>
                  <td>
                    {{-- {{$cate->category->title}} --}}
                    {!! Form::select('category_id', $category, isset($cate) ? $cate->category->id : '', ['class'=>'category_choose','id'=>$cate->id]) !!}
                  </td>
                  <td>
                    @foreach($cate->movie_genre as $gen)
                    <span class="badge badge-pill badge-dark">{{$gen->title}}</span>
                    @endforeach
                  </td>

                  <td>
                    {{-- {{$cate->country->title}} --}}
                    {!! Form::select('country_id', $country, isset($cate) ? $cate->country->id : '', ['class'=>'country_choose','id'=>$cate->id]) !!}
                  </td>

                  <td>
                    {{-- @if ($cate->thuocphim=='phimle')
                      Phim lẻ
                    @else
                      Phim bộ
                    @endif --}}
                    <select id="{{$cate->id}}" class="thuocphim_choose">
                      @if($cate->thuocphim=='phimbo')
                        <option value="phimle">Phim lẻ</option>
                        <option selected value="phimbo">Phim bộ</option>
                      @else
                      <option selected value="phimle">Phim lẻ</option>
                      <option value="phimbo">Phim bộ</option>
                      @endif
                    </select>
                  </td>
                  <td>{{$cate->ngaytao}}</td>
                  <td>{{$cate->ngaycapnhat}}</td>
                  <td>
                    {!! Form::selectYear('year', 1980, 2023, isset($cate->year) ? $cate->year : '',['class' => 'select-year','id'=>$cate->id,'placeholder' =>'--Năm phim--'])!!}
                  </td>
                  <td>
                    {!! Form::select('topview', ['0'=>'Ngày','1'=>'Tuần','2'=>'Tháng'], isset($cate->topview) ? $cate->topview : '', ['class'=>'select-topview','id'=>$cate->id,'placeholder' =>'--Views--']) !!}
                  </td>
                  <td>
                    <form action="POST">
                      @csrf
                      {!! Form::selectRange('season', 0, 20, isset($cate->season) ? $cate->season : '0',['class' => 'select-season','id'=>$cate->id])!!}
                    </form>
                  </td>
                  <td>
                      {!! Form::open(['method'=>'DELETE','route'=>['movie.destroy',$cate->id],'onsubmit'=>'return confirm("Bạn có chắc muốn xóa?")']) !!}
                        {!! Form::submit('Xóa', ['class'=>'btn btn-danger']) !!}
                      {!! Form::close() !!}
                    <a href="{{route('movie.edit',$cate->id)}}" class="btn btn-success">Sửa</a>
                  </td>
                </tr>
                @endforeach
              </tbody>
            </table>
        </div>
    </div>
</div>
@endsection

