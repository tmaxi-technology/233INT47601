<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Genre;
use App\Models\Country;
use App\Models\Movie;
use App\Models\Episode;
use App\Models\Movie_Genre;
use App\Models\Rating;
use App\Models\LinkMovie;
use App\Models\Info;
use DB;

class IndexController extends Controller
{
    public function locphim()
    {
        $sapxep = $_GET['order'];
        $genre_get = $_GET['genre'];
        $country_get = $_GET['country'];
        $year_get = $_GET['year'];

        if ($sapxep == '' && $genre_get == '' && $country_get == '' &&  $year_get == '') {
            return redirect()->back();
        } else {
            // Lấy dữ liệu
            $movie = Movie::withCount('episode');
            if ($genre_get) {
                $movie = $movie->Where('genre_id', '=', $genre_get);
            } elseif ($country_get) {
                $movie = $movie->Where('country_id', '=', $country_get);
            } elseif ($year_get) {
                $movie = $movie->Where('year', '=', $year_get);
            } elseif ($order) {
                $movie = $movie->orderBy('title', 'ASC');
            }
            $movie = $movie->orderBy('ngaycapnhat', 'DESC')->paginate(40);
            return view('pages.filter', compact('movie'));
        }
    }
    public function timkiem()
    {
        $info = Info::find(1);
        $meta_title = $info->title;
        $meta_description = $info->description;
        $meta_image = '';

        if (isset($_GET['search'])) {
            $search = $_GET['search'];
            $movie = Movie::withCount('episode')->where('title', 'LIKE', '%' . $search . '%')->orderBy('ngaycapnhat', 'DESC')->paginate(40);

            return view('pages.search', compact('search', 'movie', 'meta_title', 'meta_description', 'meta_image'));
        } else {
            return redirect()->to('/');
        }
    }
    public function home()
    {
        $info = Info::find(1);
        $meta_title = $info->title;
        $meta_description = $info->description;
        $meta_image = '';

        $phimhot = Movie::withCount('episode')->where('phim_hot', 1)->where('status', 1)->orderBy('ngaycapnhat', 'DESC')->get();

        $category_home = Category::with(['movie' => function ($q) {
            $q->withCount('episode')->where('status', 1);
        }])->orderBy('id', 'DESC')->where('status', 1)->get();
        return view('pages.home', compact('category_home', 'phimhot', 'meta_title', 'meta_description', 'meta_image'));
    }
    public function category($slug)
    {
        $cate_slug = Category::where('slug', $slug)->first();
        $meta_title = $cate_slug->title;
        $meta_description = $cate_slug->description;
        $meta_image = '';

        $movie = Movie::withCount('episode')->where('category_id', $cate_slug->id)->orderBy('ngaycapnhat', 'DESC')->paginate(40);
        return view('pages.category', compact('cate_slug', 'movie', 'meta_title', 'meta_description', 'meta_image'));
    }
    public function year($year)
    {
        $meta_title = 'Năm phim: ' . $year;
        $meta_description = 'Tìm phim năm: ' . $year;
        $meta_image = '';
        $year = $year;

        $movie = Movie::withCount('episode')->where('year', $year)->orderBy('ngaycapnhat', 'DESC')->paginate(40);
        return view('pages.year', compact('year', 'movie', 'meta_title', 'meta_description', 'meta_image'));
    }
    public function tag($tag)
    {
        $meta_title = $tag;
        $meta_description = $tag;
        $meta_image = '';
        $tag = $tag;

        $movie = Movie::withCount('episode')->where('tags', 'LIKE', '%' . $tag . '%')->orderBy('ngaycapnhat', 'DESC')->paginate(40);
        return view('pages.tag', compact('tag', 'movie', 'meta_title', 'meta_description', 'meta_image'));
    }
    public function genre($slug)
    {
        $genre_slug = Genre::where('slug', $slug)->first();
        $meta_title = $genre_slug->title;
        $meta_description = $genre_slug->description;
        $meta_image = '';

        // Lấy nhiều phim
        $movie_genre = Movie_Genre::where('genre_id', $genre_slug->id)->get();
        $many_genre = [];
        foreach ($movie_genre as $key => $movi) {
            $many_genre[] =  $movi->movie_id;
        }
        $movie = Movie::withCount('episode')->whereIn('id', $many_genre)->orderBy('ngaycapnhat', 'DESC')->paginate(40);

        return view('pages.genre', compact('genre_slug', 'movie', 'meta_title', 'meta_description', 'meta_image'));
    }
    public function country($slug)
    {
        $country_slug = Country::where('slug', $slug)->first();
        $meta_title = $country_slug->title;
        $meta_description = $country_slug->description;
        $meta_image = '';

        $movie = Movie::withCount('episode')->where('country_id', $country_slug->id)->orderBy('ngaycapnhat', 'DESC')->paginate(40);
        return view('pages.country', compact('country_slug', 'movie', 'meta_title', 'meta_description', 'meta_image'));
    }
    public function movie($slug)
    {
        $movie = Movie::with('category', 'genre', 'country', 'movie_genre')->where('slug', $slug)->where('status', 1)->first();
        $meta_title = $movie->title;
        $meta_description = $movie->description;
        $meta_image = url('uploads/movie/' . $movie->image);

        $related = Movie::with('category', 'genre', 'country')->where('category_id', $movie->category->id)->orderBy(DB::raw('RAND()'))->whereNotIn('slug', [$slug])->get();

        $episode_tapdau = Episode::with('movie')->where('movie_id', $movie->id)->orderBy('episode', 'ASC')->take(1)->first();

        // Lấy 3 tập gần nhất
        $episode = Episode::with('movie')->where('movie_id', $movie->id)->orderBy('episode', 'DESC')->take(3)->get();
        // Lấy tổng số tập đã thêm
        $episode_current_list = Episode::with('movie')->where('movie_id', $movie->id)->get();
        $episode_current_list_count = $episode_current_list->count();

        // Rating movie
        $rating = Rating::where('movie_id', $movie->id)->avg('rating');
        $rating = round($rating);
        $count_total = Rating::where('movie_id', $movie->id)->count();

        $count_views = $movie->count_views;
        $count_views = $count_views + 1;
        $movie->count_views = $count_views;
        $movie->save();

        return view('pages.movie', compact('movie', 'related', 'episode', 'episode_tapdau', 'episode_current_list_count', 'rating', 'count_total', 'meta_title', 'meta_description', 'meta_image'));
    }
    public function add_rating(Request $request)
    {
        $data = $request->all();
        $ip_address = $request->ip();

        $rating_count = Rating::where('movie_id', $data['movie_id'])->where('ip_address', $ip_address)->count();
        if ($rating_count > 0) {
            echo 'exist';
        } else {
            $rating = new Rating();
            $rating->movie_id = $data['movie_id'];
            $rating->rating = $data['index'];
            $rating->ip_address = $ip_address;
            $rating->save();
            echo 'done';
        }
    }
    public function watch($slug, $tap, $server_active)
    {
        $movie = Movie::with('category', 'genre', 'country', 'movie_genre', 'episode')->where('slug', $slug)->where('status', 1)->first();
        $meta_title = 'Xem phim: ' . $movie->title;
        $meta_description = $movie->description;
        $meta_image = url('uploads/movie/' . $movie->image);

        $related = Movie::with('category', 'genre', 'country')->where('category_id', $movie->category->id)->orderBy(DB::raw('RAND()'))->whereNotIn('slug', [$slug])->get();

        // Lấy tập 1
        if (isset($tap)) {
            $tapphim = $tap;
            $tapphim = substr($tap, 4, 1);
            $episode = Episode::where('movie_id', $movie->id)->where('episode', $tapphim)->first();
        } else {
            $tapphim = 1;
            $episode = Episode::where('movie_id', $movie->id)->where('episode', $tapphim)->first();
        }
        $server = LinkMovie::orderBy('id', 'DESC')->get();
        $episode_movie = Episode::where('movie_id', $movie->id)->get()->unique('server');
        $episode_list = Episode::where('movie_id', $movie->id)->orderBy('episode', 'ASC')->get();
        return view('pages.watch', compact('movie', 'episode', 'tapphim', 'related', 'meta_title', 'meta_description', 'meta_image', 'server', 'episode_movie', 'episode_list', 'server_active'));
    }
    public function episode()
    {
        return view('pages.episode');
    }
}
