$(document).ready(function() {

pokemonlist();
/*
 $(".seePokemon").click(function() {
        alert(this.id);
    });
*/

});

function pokemonlist(){
    var content = "";
    var sumStats = 0;
    var url = "../ajax/pokemon-list/getJSON.php?opcion=POKEMONLIST";
    $.ajax({
        type: "GET",
        url: url,
        dataType: "JSON",
        async: false,
        success: function(res) {
            $.each( res, function( key, value ) {
                sumStats = 0;
                content += '<article id="'+value.id+'" class="col-xs-6 col-sm-4 col-md-3 col-lg-2">';
                content += '    <div class="tarjeta tarjeta-'+value.types[0].name.toLowerCase()+'">';
                content += '        <figure class="tarjeta-figure text-center">';
                content += '            <img src="img/pokemon-small/'+pad(value.id, 3)+'.png" alt="Nombre">';
                content += '            <figcaption>#'+pad(value.id, 3)+'</figcaption>';
                content += '        </figure>';
                content += '        <div class="tarjeta-contenido">';
                content += '            <section class="tarjeta-titulo">';
                content += '                <a href="#" class="btn pull-right btn-mostrar"><span class="fa fa-angle-up"></span></a>';
                content += '                <h1>'+value.name+'';
                $.each( value.types, function( key, value ) {
                    content += '                    <small class="txt-'+value["name"].toLowerCase()+'">'+value["name"]+'</small>';
                    
                });
                content += '                </h1>';
                content += '             </section>';
                content += '             <section class="tarjeta-stats clearfix text-center">';
                $.each( value.stats, function( key, value ) {
                    sumStats = sumStats + parseInt(value.base_stat);
                    if(key % 2 === 0){
                        content += '                <div class="tarjeta-stat pull-left text-right">';
                        content += '                    <small>'+value.name+'</small> <h2>'+value.base_stat+'</h2>';
                        content += '                </div>';
                    }else{
                        content += '                <div class="tarjeta-stat pull-right text-left">';
                        content += '                    <h2>'+value.base_stat+'</h2> <small>'+value.name+'</small>';
                        content += '                </div>';
                    }
                });
                content += '                <div class="tarjeta-stat block">';
                content += '                    <small>Total</small> <h2>'+sumStats+'</h2>';
                content += '                </div>';
                content += '            </section>';
                content += '        </div>';
                content += '    </div>';
                content += '</article>';
            });
            $(".poke-contenedor").html(content);
        }
    });
}



function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}


