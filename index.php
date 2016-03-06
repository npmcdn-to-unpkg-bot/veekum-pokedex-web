<?php


session_name('pokedex');
session_start();

$root = '';

// Incluimos el template engine
include('includes/templateEngine.inc.php');


// Cargamos la plantilla
	$twig->display('index.php',array(
		"root"			=> $root,
		"title"			=> "Pokedex",
		"footer"		=> 'Pokedex 2016',
	));
?>