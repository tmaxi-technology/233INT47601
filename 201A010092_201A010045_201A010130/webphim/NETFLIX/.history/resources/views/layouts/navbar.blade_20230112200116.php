<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="{{route('home')}}">Dashboard</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="{{route('category.create')}}">Danh Mục</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{route('genre.create')}}">Thể Loại</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{route('country.create')}}">Quốc Gia</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{route('movie.create')}}">Phim</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="{{route('episode.create')}}">Tập Phim</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Tìm phim" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Tìm Phim</button>
    </form>
  </div>
</nav>