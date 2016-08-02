<?php
require_once('../../inc/db_connection.inc.php');
header('Content-Type: application/json; charset=utf-8');
$opcion = $_GET["opcion"];
$json = null;

//LANGUAGE ID
//ja-JP 1
//ja-JP 2 //roomaji //none
//ko-KR 3
//zh-CN 4 //none
//fr-FR 5 
//de-DE 6
//es-ES 7
//it-IT 8
//en-US 9
//cs-CZ 10
//ja-JP 11 //ja-kanji //none
$lang = 9;

switch (strtoupper($opcion)) {
    case "POKEMONLIST":
        $sql="  SELECT 
                    P.`id` AS id,
                    PSN.`name` AS name
                FROM pokedex.pokemon AS P 
                    LEFT JOIN pokedex.pokemon_species_names AS PSN ON P.species_id = PSN.pokemon_species_id
                WHERE PSN.local_language_id = ".$lang." AND P.is_default = 1
                ORDER BY P.`id`";

        $arr = sql2arr($sql);
        
        if($arr){
            foreach ($arr as $key => $value) {
       
                //get Types
                $sql="  SELECT 
                            T.`id` AS id,
                            TN.`name` AS name
                        FROM pokedex.pokemon_types AS PT 
                            LEFT JOIN pokedex.types AS T ON PT.type_id = T.id
                            LEFT JOIN pokedex.type_names AS TN ON T.id = TN.type_id
                        WHERE PT.pokemon_id = '".$value["id"]."' AND TN.local_language_id = ".$lang."";
                $arrTypes = sql2arr($sql);
                $arr[$key]['types'] = $arrTypes;

                //get Stats
                $sql="  SELECT 
                            S.`id` AS id,
                            CASE SN.`name` WHEN 'Special Attack' THEN 'Sp. Atk' WHEN 'Special Defense' THEN 'Sp. Def' ELSE SN.`name` END AS name,
                            PS.`base_stat` AS base_stat
                        FROM pokedex.pokemon_stats AS PS 
                            LEFT JOIN pokedex.stats AS S ON PS.stat_id = S.id
                            LEFT JOIN pokedex.stat_names AS SN ON S.id = SN.stat_id
                        WHERE PS.pokemon_id = '".$value["id"]."' AND SN.local_language_id = ".$lang."";
                $arrStats = sql2arr($sql);
                $arr[$key]['stats'] = $arrStats;

            }
            $json = json_encode($arr);
        }

    break;

}

echo $json;

function utf8ize($d) {
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }
    return $d;
}
?>


<?php
/*
require_once('inc/db_connection.inc.php');
$opcion = $_GET["opcion"];

//LANGUAGE ID
//ja-JP 1
//ja-JP 2 //roomaji
//ko-KR 3
//zh-CN 4
//fr-FR 5
//de-DE 6
//es-ES 7
//it-IT 8
//en-US 9
//cs-CZ 10
//ja-JP 11 //ja-kanji
$lang = 9;


switch (strtoupper($opcion)) {
    case "POKEMONNATIONALLIST":
    $sql="SELECT 
                P.id,
                PSN.name
            FROM pokedex.pokemon AS P 
            LEFT JOIN pokedex.pokemon_species_names AS PSN ON P.species_id = PSN.pokemon_species_id
            WHERE PSN.local_language_id = '".$lang."' AND P.is_default = 1
            ORDER BY P.`order`";

        $arr = sql2arr($sql);

        if($arr){
            foreach ($arr as $key => $value) {
                //get Types
                $sql="SELECT * FROM pokedex.pokemon_types AS PT LEFT JOIN
                        pokedex.types AS T ON PT.type_id = T.id
                        WHERE PT.pokemon_id = ".$value["id"]."";
                $arrTypes = sql2arr($sql);
                $arr[$key]['types'] = $arrTypes;

                //get Stats
                $sql="SELECT * FROM pokedex.pokemon_stats AS PS LEFT JOIN
                        pokedex.stats AS S ON PS.stat_id = S.id
                        WHERE PS.pokemon_id = ".$value["id"]."";
                $arrStats = sql2arr($sql);
                $arr[$key]['stats'] = $arrStats;


            }
            print_r($arr);
            $json = json_encode($arr);
        }
        
    break;

}

echo $json;
*/
?>