<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Country;

class CountryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $list = Country::all();
        return view('admincp.country.index', compact('list'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('admincp.country.form');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // $data = $request->all();
        $data = $request->validate(
            [
                'title' => 'required|unique:categories|max:255',
                'slug' => 'required|unique:categories|max:255',
                'description' => 'required|max:255',
                'status' => 'required',
            ],
            [
                'title.unique' => 'Tên quốc gia này đã có, xin điền tên khác!',
                'slug.unique' => 'Slug quốc gia này đã có, xin điền slug khác!',
                'title.required' => 'Tên quốc gia phải có nhé!',
                'slug.required' => 'Slug phải có nhé!',
                'description.required' => 'Mô tả phải có!',
                'status.required' => 'Kích hoạt thể loại phải có!',
            ]
        );
        $country = new Country();
        $country->title = $data['title'];
        $country->slug = $data['title'];
        $country->description = $data['description'];
        $country->status = $data['status'];
        $country->save();
        toastr()->success('Thành công', 'Thêm quốc gia thành công!');
        return redirect()->back();
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $country = Country::find($id);
        $list = Country::all();
        return view('admincp.country.form', compact('list', 'country'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        // $data = $request->all();
        $data = $request->validate(
            [
                'title' => 'required|unique:categories|max:255',
                'slug' => 'required|unique:categories|max:255',
                'description' => 'required|max:255',
                'status' => 'required',
            ],
            [
                'title.unique' => 'Tên quốc gia này đã có, xin điền tên khác!',
                'slug.unique' => 'Slug quốc gia này đã có, xin điền slug khác!',
                'title.required' => 'Tên quốc gia phải có nhé!',
                'slug.required' => 'Slug phải có nhé!',
                'description.required' => 'Mô tả phải có!',
                'status.required' => 'Kích hoạt thể loại phải có!',
            ]
        );
        $country = Country::find($id);
        $country->title = $data['title'];
        $country->slug = $data['title'];
        $country->description = $data['description'];
        $country->status = $data['status'];
        $country->save();
        toastr()->success('Cập nhật', 'Cập nhật quốc gia thành công!');
        return redirect()->route('country.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        Country::find($id)->delete();
        toastr()->success('Thành công', 'Xóa quốc gia thành công!');
        return redirect()->back();
    }
}
