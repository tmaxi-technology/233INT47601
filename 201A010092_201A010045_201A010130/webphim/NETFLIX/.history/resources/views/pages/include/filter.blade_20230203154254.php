<form action="{{route('locphim')}}" method="GET">
<style type="text/css">
  .stylish_filter {
    border: 0;
    color: #d0d0d0;
    background: #12171b;
  }
  .btn-filter {
    color: #d0d0d0;
    background: #224361;
    padding: 6px;
    border: 1px solid #12171b;
    font-size: 14px;
  }
</style>
<div class="col-md-2">
  <div class="form-group">
      <select class="form-control stylish_filter" name="order" id="exampleFormControlSelect1">
        <option value="">Sắp xếp</option>
        <option value="data">Ngày đăng</option>
        <option value="year_release">Năm sản xuất</option>
        <option name="name_a_z">Tên phim</option>
        <option name="watch_views">Lượt xem</option>
      </select>
  </div>
</div>
<div class="col-md-3">
  <div class="form-group">
      <select class="form-control stylish_filter" name="genre" id="exampleFormControlSelect1">
          <option value="">Thể loại</option>
          @foreach($genre_home as $key => $gen_filter)
          <option {{(isset($_GET['genre']) && $_GET['genre']==$gen_filter->id) ? 'selected' : ''}} value="{{$gen_filter->id}}">{{$gen_filter->title}}</option>
          @endforeach
      </select>
  </div>
</div>
<div class="col-md-3">
  <div class="form-group">
      <select class="form-control stylish_filter" name="country" id="exampleFormControlSelect1">
          <option value="">Quốc gia</option>
          @foreach($country_home as $key => $cou_filter)
          <option {{(isset($_GET["country"]) && $_GET["country"]==$cou_filter->id) ? 'selected': ''}}  value="{{$cou_filter->id}}">{{$cou_filter->title}}</option>
          @endforeach
      </select>
  </div>
</div>
<div class="col-md-3">
  <div class="form-group">
    @php
        if(isset($_GET['year'])) {
          $year = $_GET['year'];
        } else {
          $year = null;
        }
    @endphp
      {!! Form::selectYear('year', 1980, 2023, $year,['class' => 'form-control stylish_filter','placeholder' =>'Năm phim'])!!}
  </div>
</div>
<div class="col-md-1">
  <input type="submit" value="Lọc phim" class="btn btn-sm btn_default btn-filter">
</div>
</form>