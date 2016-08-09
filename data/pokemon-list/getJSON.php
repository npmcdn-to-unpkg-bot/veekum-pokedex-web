<?php
require_once('../../inc/db_connection.inc.php');
header('Content-Type: application/json; charset=utf-8');
$opcion = $_POST["opcion"];
$perPage = 24;
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

        $page = 1;
        $rowcount = 1;
        if(!empty($_POST["page"])) {
            $page = $_POST["page"];
        }

        $start = ($page-1)*$perPage;
        if($start < 0) $start = 0;

        $sql .= " limit " . $start . "," . $perPage; 

        $arr["data"] = sql2arr($sql);

        if(!empty($_POST["rowcount"])) {
            $rowcount = $_POST["rowcount"];
        }
        //echo $rowcount;
        
        if($arr){
            $arr["structure"] = array("page"=>$page,"rowcount"=>$rowcount);
            foreach ($arr["data"] as $key => $value) {
       
                //get Types
                $sql="  SELECT 
                            T.`id` AS id,
                            TN.`name` AS name
                        FROM pokedex.pokemon_types AS PT 
                            LEFT JOIN pokedex.types AS T ON PT.type_id = T.id
                            LEFT JOIN pokedex.type_names AS TN ON T.id = TN.type_id
                        WHERE PT.pokemon_id = '".$value["id"]."' AND TN.local_language_id = ".$lang."";
                $arrTypes = sql2arr($sql);
                $arr["data"][$key]['types'] = $arrTypes;

                //get Stats
                $sql="  SELECT 
                            S.`id` AS id,
                            SN.`name` AS name,
                            PS.`base_stat` AS base_stat
                        FROM pokedex.pokemon_stats AS PS 
                            LEFT JOIN pokedex.stats AS S ON PS.stat_id = S.id
                            LEFT JOIN pokedex.stat_names AS SN ON S.id = SN.stat_id
                        WHERE PS.pokemon_id = '".$value["id"]."' AND SN.local_language_id = ".$lang."";
                $arrStats = sql2arr($sql);
                $arr["data"][$key]['stats'] = $arrStats;

            }
            $json = json_encode($arr);
        }

    break;

}

 echo $json;

?>