<?php
// Preparando el engine de templates
// Twig

// Incluimos Twig Auto Loader
require($root . 'libs/php/Twig/Autoloader.php');
Twig_Autoloader::register();

// Definimos la ruta donde estarán nuestros templates
$loader = new Twig_Loader_Filesystem($root . 'views/templates/pokedex-1.0.0');

// Inicializamos twig
$twig = new Twig_Environment($loader);

?>