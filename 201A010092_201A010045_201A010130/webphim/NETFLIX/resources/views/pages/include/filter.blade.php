<!-- <form action="{{ route('locphim') }}" method="GET">
  <style type="text/css">
    .stylish_filter {
      border: 0;
      color: #d0d0d0;
      background: #1a1a1a;
    }

    .btn-filter {
      color: #d0d0d0;
      border-radius: 5px;
      padding: 6px;
      moz-transition: all .4s ease-in-out !important;
      -o-transition: all .4s ease-in-out !important;
      -webkit-transition: all .4s ease-in-out !important;
      transition: all .4s cubic-bezier(.165, .84, .44, 1) !important;
      background-image: linear-gradient(to right top, #6a5af9, #d66efd) !important;
      box-shadow: 0 4px 15px 0 rgb(229 66 10 / 75%) !important;
    }

    .btn-filter:hover {
      color: #d0d0d0;
      border-radius: 5px;
      padding: 6px;
      moz-transition: all .4s ease-in-out !important;
      -o-transition: all .4s ease-in-out !important;
      -webkit-transition: all .4s ease-in-out !important;
      transition: all .4s cubic-bezier(.165, .84, .44, 1) !important;
      background-image: linear-gradient(to right top, rgb(252, 108, 143, 0.8), rgb(255, 184, 108, 0.8)) !important;
      box-shadow: 0 4px 15px 0 rgb(229 66 10 / 75%) !important;
    }
  </style>
  <div class="col-md-3">
    <div class="form-group">
      <select class="form-control stylish_filter" name="order"
        id="exampleFormControlSelect1">
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
      <select class="form-control stylish_filter" name="genre"
        id="exampleFormControlSelect1">
        <option value="">Thể loại</option>
        @foreach ($genre_home as $key => $gen_filter)
          <option
            {{ isset($_GET['genre']) && $_GET['genre'] == $gen_filter->id ? 'selected' : '' }}
            value="{{ $gen_filter->id }}">{{ $gen_filter->title }}</option>
        @endforeach
      </select>
    </div>
  </div>
  <div class="col-md-3">
    <div class="form-group">
      <select class="form-control stylish_filter" name="country"
        id="exampleFormControlSelect1">
        <option value="">Quốc gia</option>
        @foreach ($country_home as $key => $cou_filter)
          <option
            {{ isset($_GET['country']) && $_GET['country'] == $cou_filter->id ? 'selected' : '' }}
            value="{{ $cou_filter->id }}">{{ $cou_filter->title }}</option>
        @endforeach
      </select>
    </div>
  </div>
  <div class="col-md-2">
    <div class="form-group">
      @php
        if (isset($_GET['year'])) {
            $year = $_GET['year'];
        } else {
            $year = null;
        }
      @endphp
      {!! Form::selectYear('year', 1980, 2023, $year, [
          'class' => 'form-control stylish_filter',
          'placeholder' => 'Năm phim',
      ]) !!}
    </div>
  </div>
  <div class="col-md-1">
    <input type="submit" value="Lọc phim" class="btn btn-sm btn-filter"
      style="outline: none;
    color: #fff;">
  </div>
</form> -->
