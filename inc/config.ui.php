<?php

//CONFIGURATION for SmartAdmin UI

//ribbon breadcrumbs config
//array("Display Name" => "URL");
$breadcrumbs = array(
	"Home" => APP_URL
);

/*navigation array config

ex:
"dashboard" => array(
	"title" => "Display Title",
	"url" => "http://yoururl.com",
	"url_target" => "_blank",
	"icon" => "fa-home",
	"label_htm" => "<span>Add your custom label/badge html here</span>",
	"sub" => array() //contains array of sub items with the same format as the parent
)

*/
$page_nav = array(
	"dashboard" => array(
		"title" => "Pokémon data",
		"icon" => "fa-home",
		"sub" => array(
			"pokedex" => array(
				"title" => "Pokédex",
				"url" => "ajax/pokemon-list.php"
			),
			"moves" => array(
				"title" => "Moves",
				"url" => "ajax/dashboard-social.php"
			),
			"type" => array(
				"title" => "Type chart",
				"url" => "ajax/dashboard-social.php"
			),
			"abilities" => array(
				"title" => "Abilities",
				"url" => "ajax/dashboard-social.php"
			),
			"items" => array(
				"title" => "Items",
				"url" => "ajax/dashboard-social.php"
			),
			"evolution" => array(
				"title" => "Evolution chains",
				"url" => "ajax/dashboard-social.php"
			),
			"locations" => array(
				"title" => "Pokémon locations",
				"url" => "ajax/dashboard-social.php"
			),
			"gallery" => array(
				"title" => "Sprite gallery",
				"url" => "ajax/dashboard-social.php"
			),
			"stats" => array(
				"title" => "Pokémon stats",
				"url" => "ajax/dashboard-social.php"
			)
		)
	)
);

//configuration variables
$page_title = "";
$page_css = array();
$no_main_header = false; //set true for lock.php and login.php
$page_body_prop = array(); //optional properties for <body>
$page_html_prop = array(); //optional properties for <html>
?>