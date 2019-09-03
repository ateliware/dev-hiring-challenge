<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>{{ config('app.name', 'Ateliware') }}</title>

  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">

  <link href="{{ asset('css/all.min.css') }}" rel="stylesheet">

  <!-- Styles -->
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    html, body {
      background-image: linear-gradient(to right, #ff0844 0%, #ff4852 100%);
      color: #ffffff;
      font-family: 'Nunito', sans-serif;
      font-weight: 200;
      height: 100vh;
      width: 100%;
      margin: 0;
    }

    .full-height {
      height: 100vh;
      width: 100%;
      min-width: 100%;
      min-height: 100%;
      position: relative;
    }

    .full-height::before{
      background-image: url("{{ asset('img/ateliware_symbol_white.png') }}");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 20%;
      content: "";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      /*z-index: -2;*/
      opacity: 0.3;
    }

    .flex-center {
      align-items: center;
      display: flex;
      justify-content: center;
    }

    .position-ref {
      position: relative;
    }

    .top-right {
      position: absolute;
      right: 10px;
      top: 18px;
    }

    .content {
      text-align: center;
    }

    .title {
      font-size: 84px;
    }

    .links {
      position: relative;
      z-index: 500;
    }

    .links > a {
      color: #ffffff;
      padding: 0 25px;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: .1rem;
      text-decoration: none;
      text-transform: uppercase;
    }

    .m-b-md {
      margin-bottom: 30px;
    }
  </style>
</head>
<body>
<div class="flex-center position-ref full-height">
  <div class="content">
    <div class="title m-b-md">
      <span class="" style="border-bottom: 3px solid #ffffff;">At</span>eliware
    </div>

    @if (Route::has('login'))
      <div class="links text-white">
        @auth
          <a href="{{ url('/repositories') }}">
            Repositories <i class="fas fa-code-branch fa-lg"></i>
          </a>
        @else
          <a href="{{ route('login') }}">Login</a>

          @if (Route::has('register'))
            <a href="{{ route('register') }}">Register</a>
          @endif
        @endauth
      </div>
    @endif

  </div>
</div>

<!--  fontawesome JS  -->
<script src="{{ asset('js/all.min.js') }}" defer></script>

</body>
</html>
