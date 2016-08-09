<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Pokestats</title>
  </head>
  <body>
    
    <section class="container-fluid">
      <div class="button-group filters-button-group">
        <button class="btn btn-default button is-checked" data-filter="*">show all</button>
        <button class="btn btn-default button" data-filter=".type11">water</button>
        <button class="btn btn-default button" data-filter=".type10">fire</button>
        <button class="btn btn-default button" data-filter=".type12">grass</button>
        <button class="btn btn-default button" data-filter=".type16">dragon</button>
        <button class="btn btn-default button" data-filter=".type1">normal</button>
        <button class="btn btn-default button" data-filter=".type7">bug</button>
        <button class="btn btn-default button" data-filter=".type15">ice</button>
        <button class="btn btn-default button" data-filter=".type17">dark</button>
        <button class="btn btn-default button" data-filter=".type3">flying</button>
        <button class="btn btn-default button" data-filter=".type4">poison</button>
        <button class="btn btn-default button" data-filter=".type2">fighting</button>
        <button class="btn btn-default button" data-filter=".type5">ground</button>
        <button class="btn btn-default button" data-filter=".type6">rock</button>
        <button class="btn btn-default button" data-filter=".type8">ghost</button>
        <button class="btn btn-default button" data-filter=".type9">steel</button>
        <button class="btn btn-default button" data-filter=".type18">fairy</button>
        <button class="btn btn-default button" data-filter=".type14">psychic</button>
        <button class="btn btn-default button" data-filter=".type13">electric</button>
      </div>
      <main class="row grid poke-contenedor">
        
      </main>
      <div id="loader-icon"><img src="LoaderIcon.gif" /><div>
    </section>

    <!-- CSS -->
    <link href='https://fonts.googleapis.com/css?family=Roboto:300,400,500' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link type="text/css" rel="stylesheet" href="css/style.css">
    <!-- JS -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src="https://use.fontawesome.com/d0bd13eb63.js"></script>
    <script src="https://npmcdn.com/isotope-layout@3.0/dist/isotope.pkgd.min.js"></script>
    
    <script src="js/main.js"></script>
    <script src="js/fns-min.js"></script>
  </body>
</html>