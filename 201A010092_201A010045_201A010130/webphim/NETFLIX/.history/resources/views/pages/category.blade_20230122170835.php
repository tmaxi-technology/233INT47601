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
                              <a href="">{{$cate_slug->title}}
                              </a> » 
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
                     <span>{{$cate_slug->title}}</span>
                  </h1>
               </div>
               <div class="section-bar clearfix">
                  <form action="{{route('locphim')}}" method="GET">
                     <div class="col-md-3">
                     <div class="form-group">
                        <select class="form-control" name="order" id="exampleFormControlSelect1">
                           <option value="">--Sắp xếp--</option>
                           <option value="data">Ngày đăng</option>
                           <option value="year_release">Năm sản xuất</option>
                           <option name="name_a_z">Tên phim</option>
                           <option name="watch_views">Lượt xem</option>
                        </select>
                     </div>
                     </div>
                     <div class="col-md-3">
                     <div class="form-group">
                        <select class="form-control" name="genre" id="exampleFormControlSelect1">
                           <option value="">--Thể loại--</option>
                           @foreach($genre as $key => $gen_filter)
                           <option value="{{$gen_filter->id}}">{{$gen_filter->title}}</option>
                           @endforeach
                        </select>
                     </div>
                     </div>
                     <div class="col-md-3">
                     <div class="form-group">
                        <select class="form-control" name="country" id="exampleFormControlSelect1">
                           <option value="">--Quốc gia--</option>
                           @foreach($country as $key => $country_filter)
                           <option value="{{$country_filter->id}}">{{$country_filter->title}}</option>
                           @endforeach
                        </select>
                     </div>
                     </div>
                     <div class="col-md-3">
                     <div class="form-group">
                        {!! Form::selectYear('year', 1980, 2023, '',['class' => 'form-control','placeholder' =>'--Năm phim--'])!!}
                     </div>
                     <input type="submit" value="Lọc phim" class="btn btn-sm btn_default">
                     </div>
                  </form>
               </div>
               <div class="halim_box">
                  @foreach($movie as $key => $mov)
                  <article class="col-md-3 col-sm-3 col-xs-6 thumb grid-item post-37606">
                     <div class="halim-item">
                        <a class="halim-thumb" href="{{route('movie',$mov->slug)}}">
                           <figure>
                              <img class="lazy img-responsive" src="{{asset('uploads/movie/'.$mov->image)}}" alt="BẠN CÙNG PHÒNG CỦA TÔI LÀ GUMIHO" title="{{$mov->title}}">
                           </figure>
                           <span class="status">
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
                           <span class="episode">
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