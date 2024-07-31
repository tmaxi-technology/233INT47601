<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Category;
use App\Models\Genre;
use App\Models\Country;
use App\Models\Movie;
use App\Models\Episode;
use App\Models\Movie_Genre;
use App\Models\Rating;
use Carbon\Carbon;
use DB;
use App;

class CreateSiteMap extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sitemap:create';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $sitemap = App::make('sitemap');
        $sitemap->add(route('homepage'), Carbon::now('Asia/Ho_Chi_Minh'), '1.0', 'daily');

        $genre = Genre::orderBy('id', 'DESC')->get();

        // Add every post to the sitemap
        foreach ($genre as $gen) {
            $sitemap->add(env('APP_URL') . 'the-loai/{$gen->slug}', Carbon::now('Asia/Ho_Chi_Minh'), '1.0', 'daily');
        }

        $sitemap->store('xml', 'sitemap');
        if (File::exists(base_path() . '/sitemap.xml')) {
            File:
            copy(public_path('sitemap.xml'), base_path('sitemap.xml'));
        }
    }
}
