@extends('layout')
@section('content')
<div class="row container" id="wrapper">
    <div class="halim-panel-filter">
      <div class="panel-heading">
          <div class="row">
            <div class="col-xs-6">
                <div class="yoast_breadcrumb hidden-xs">
                  <span>
                      <span>
                        <a href="">Lọc phim</a> » 
                        <span class="breadcrumb_last" aria-current="page">2022</span>
                      </span>
                      </span>
                  </div>
            </div>
          </div>
      </div>
      <div id="ajax-filter" class="panel-collapse collapse" aria-expanded="true" role="menu">
          <div class="ajax"></div>
      </div>
    </div>
    <main id="main-contents" class="col-xs-12 col-sm-12 col-md-8">
      <section>
          <div class="section-bar clearfix">
            <h1 class="section-title">
                <span>Lọc phim</span>
            </h1>
          </div>
          <div class="section-bar clearfix">
            <div class="row">
              @include('pages.include.filter')
            </div>
          </div>
          <div class="halim_box">
            @foreach($movie as $key => $mov)
            <article class="col-md-3 col-sm-3 col-xs-6 thumb grid-item post-37606">
                <div class="halim-item">
                  <a class="halim-thumb" href="{{route('movie',$mov->slug)}}">
                      <figure>
                        <img class="lazy img-responsive" src="{{asset('uploads/movie/'.$mov->image)}}" alt="BẠN CÙNG PHÒNG CỦA TÔI LÀ GUMIHO" title="{{$mov->title}}">
                      </figure>
                      <span class="status" style="background: #478413;
                      color: #fff;
                      padding: 3px 5px 1px;
                      z-index: 9;
                      border-radius: 2px;
                      background-size: 200% 100%;
                      background-image: linear-gradient(to right,#C02425 0%,#F0CB35 51%,#C02425 100%);
                      transition: .7s;
                      text-transform: capitalize;">
                        @if($mov->resolution==0)
                            HD
                        @elseif($mov->resolution==1)
                            SD
                        @elseif($mov->resolution==2)
                            HDCam
                        @elseif($mov->resolution==3)
                            Cam
                        @elseif($mov->resolution==4)
                            FullHD
                        @else
                            Trailer
                        @endif
                      </span>
                      <span class="episode" style="background: #a94442;
                      z-index: 1;
                      background-size: 200% 100%;
                      background-image: linear-gradient(to right,#ff00cc 0%,#333399 51%,#ff00cc 100%);
                      border-top-left-radius: 3px;
                      border-top-right-radius: 3px;
                      border-bottom-right-radius: 3px;
                      transition: .7s;">
                        <i class="fa fa-play" aria-hidden="true"></i>
                        {{$mov->episode_count}}/{{$mov->sotap}} |
                        @if($mov->phude==0)
                            Phụ đề
                            {{-- @if($mov->season!=0)
                              - Season {{$mov->season}}
                            @endif --}}
                        @else
                            Thuyết minh
                            {{-- @if($mov->season!=0)
                              - Season {{$mov->season}}
                            @endif --}}
                        @endif
                      </span> 
                      <div class="icon_overlay"></div>
                      <div class="halim-post-title-box">
                        <div class="halim-post-title ">
                            <p class="entry-title">{{$mov->title}}</p>
                            <p class="original_title">{{$mov->name_eng}}</p>
                        </div>
                      </div>
                  </a>
                </div>
            </article>
            @endforeach
          </div>
          <div class="clearfix"></div>
          <div class="text-center">
            {!! $movie->links("pagination::bootstrap-4") !!}
          </div>
      </section>
    </main>
    @include('pages.include.sidebar')
</div>
@endsection