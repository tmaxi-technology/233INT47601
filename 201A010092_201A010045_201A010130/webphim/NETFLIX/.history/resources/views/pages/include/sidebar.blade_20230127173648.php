<style type="text/css">
  li.nav-item.active a {
    background: #1b2a39;
    border: 1px solid #1b2a3900;
    background-size: 200% 100%;
    background-image: linear-gradient(to right,#f5ce62,#e43603,#fa7199,#e85a19);
    background-image: linear-gradient(to right,#ff00cc 0%,#333399 51%,#ff00cc 100%);
  }
  .nav-pills>li.active>a, .nav-pills>li.active>a:hover,.nav-pills>li.active>a:focus{
    background: #1b2a39;
    border: 1px solid #1b2a3900;
    background-size: 200% 100%;
    background-image: linear-gradient(to right,#f5ce62,#e43603,#fa7199,#e85a19);
    background-image: linear-gradient(to right,#ff00cc 0%,#333399 51%,#ff00cc 100%);
  }
  li.nav-item a {
    color: aliceblue;
  }
  li.nav-item a:hover {
    background: #1b2a39;
    border: 1px solid #1b2a3900;
    background-size: 200% 100%;
    background-image: linear-gradient(to right,#f5ce62,#e43603,#fa7199,#e85a19);
    background-image: linear-gradient(to right,#ff00cc 0%,#333399 51%,#ff00cc 100%);
    border-radius: 0;
  }
</style>

<aside id="sidebar" class="col-xs-12 col-sm-12 col-md-4">
<div id="halim_tab_popular_videos-widget-7" class="widget halim_tab_popular_videos-widget">
<div class="section-bar clearfix">
      <div class="section-title">
          <span >Phim Hot</span>
      </div>
    </div>
    <section class="tab-content">
      <div role="tabpanel" class="tab-pane active halim-ajax-popular-post">
          <div class="halim-ajax-popular-post-loading hidden"></div>
          <div id="halim-ajax-popular-post" class="popular-post">
            @foreach($phimhot_sidebar as $key => $hot_sidebar)
            <div class="item post-37176">
                <a href="{{route('movie',$hot_sidebar->slug)}}" title="{{$hot_sidebar->title}}">
                  <div class="item-link">
                      <img src="{{asset('uploads/movie/'.$hot_sidebar->image)}}" class="lazy post-thumb" alt="{{$hot_sidebar->title}}" title="{{$hot_sidebar->title}}" />
                      <span class="is_trailer">
                        @if($hot_sidebar->resolution==0)
                              HD
                        @elseif($hot_sidebar->resolution==1)
                              SD
                        @elseif($hot_sidebar->resolution==2)
                              HDCam
                        @elseif($hot_sidebar->resolution==3)
                              Cam
                        @elseif($hot_sidebar->resolution==4)
                              FullHD
                        @else
                              Trailer
                        @endif
                      </span>
                  </div>
                  <p class="title">{{$hot_sidebar->title}}</p>
                </a>
                <div class="viewsCount" style="color: #9d9d9d;">
                  @if($hot_sidebar->count_views>0)
                    {{$hot_sidebar->count_views}} lượt quan tâm
                  @else
                    @php
                    echo rand(100,9999); 
                    @endphp
                    lượt quan tâm
                  @endif
                </div>
                <div class="viewsCount" style="color: #9d9d9d;">{{$hot_sidebar->year}}</div>
                <div style="float: left;">
                  <ul class="list-inline rating" title="Average Rating">
                    @for($count=1;$count<=5;$count++)
                      <li title="star_rating" style="font-size:20px;color:#ffcc00;padding:0">&#9733;</li>
                    @endfor
                    <ul class="list-inline rating" title="Average Rating">
                </div>
            </div>
            @endforeach
            </div>
          </div>
    </section>
    <div class="clearfix"></div>
</div>
</aside>

{{-- Phim sắp chiếu --}}
<aside id="sidebar" class="col-xs-12 col-sm-12 col-md-4">
<div id="halim_tab_popular_videos-widget-7" class="widget halim_tab_popular_videos-widget">
    <div class="section-bar clearfix">
      <div class="section-title">
          <span style="color: #a5cbef;
          background: -webkit-gradient(linear,left top,right top,from(#ff8a00),to(#da1b60));
          background: linear-gradient(to right,#ff8a00,#ff2070);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          font-weight: 700;">Phim sắp chiếu</span>
      </div>
    </div>
    <section class="tab-content">
      <div role="tabpanel" class="tab-pane active halim-ajax-popular-post">
          <div class="halim-ajax-popular-post-loading hidden"></div>
          <div id="halim-ajax-popular-post" class="popular-post">
            @foreach($phimhot_trailer as $key => $hot_sidebar)
            <div class="item post-37176">
                <a href="{{route('movie',$hot_sidebar->slug)}}" title="{{$hot_sidebar->title}}">
                  <div class="item-link">
                      <img src="{{asset('uploads/movie/'.$hot_sidebar->image)}}" class="lazy post-thumb" alt="{{$hot_sidebar->title}}" title="{{$hot_sidebar->title}}" />
                      <span class="is_trailer">
                        @if($hot_sidebar->resolution==0)
                              HD
                        @elseif($hot_sidebar->resolution==1)
                              SD
                        @elseif($hot_sidebar->resolution==2)
                              HDCam
                        @elseif($hot_sidebar->resolution==3)
                              Cam
                        @elseif($hot_sidebar->resolution==4)
                              FullHD
                        @else
                              Trailer
                        @endif
                      </span>
                  </div>
                  <p class="title">{{$hot_sidebar->title}}</p>
                </a>
                <div class="viewsCount" style="color: #9d9d9d;">
                  @if($hot_sidebar->count_views>0)
                    {{$hot_sidebar->count_views}} lượt quan tâm
                  @else
                    @php
                    echo rand(100,9999); 
                    @endphp
                    lượt quan tâm
                  @endif
                </div>
                <div class="viewsCount" style="color: #9d9d9d;">{{$hot_sidebar->year}}</div>
                <div style="float: left;">
                  <ul class="list-inline rating" title="Average Rating">
                    @for($count=1;$count<=5;$count++)
                      <li title="star_rating" style="font-size:20px;color:#ffcc00;padding:0">&#9733;</li>
                    @endfor
                  <ul class="list-inline rating" title="Average Rating">
                </div>
            </div>
            @endforeach
            </div>
          </div>
    </section>
    <div class="clearfix"></div>
</div>
</aside>

<aside id="sidebar" class="col-xs-12 col-sm-12 col-md-4">
<div id="halim_tab_popular_videos-widget-7" class="widget halim_tab_popular_videos-widget">
    <div class="section-bar clearfix">
      <div class="section-title">
          <span style="color: #a5cbef;
          background: -webkit-gradient(linear,left top,right top,from(#ff8a00),to(#da1b60));
          background: linear-gradient(to right,#ff8a00,#ff2070);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-box-decoration-break: clone;
          box-decoration-break: clone;
          font-weight: 700;">Top Views</span>
      </div>
    </div>
    <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
      <li class="nav-item active">
        <a class="nav-link filter-sidebar" id="pills-home-tab" data-toggle="pill" href="#ngay" role="tab" aria-controls="pills-home" aria-selected="true">Ngày</a>
      </li>
      <li class="nav-item">
        <a class="nav-link filter-sidebar" id="pills-profile-tab" data-toggle="pill" href="#tuan" role="tab" aria-controls="pills-profile" aria-selected="false">Tuần</a>
      </li>
      <li class="nav-item">
        <a class="nav-link filter-sidebar" id="pills-contact-tab" data-toggle="pill" href="#thang" role="tab" aria-controls="pills-contact" aria-selected="false">Tháng</a>
      </li>
    </ul>
    <div class="tab-content" id="pills-tabContent">
      <div id="halim-ajax-popular-post-default" class="popular-post">
        <span id="show_data_default"></span>
      </div>
      <div class="tab-pane fade show active" id="ngay" role="tabpanel" aria-labelledby="pills-home-tab">
        <div id="halim-ajax-popular-post" class="popular-post">
        <span id="show_data"></span>
        </div>
      </div>
    </div>
    <div class="clearfix"></div>
</div>
</aside>