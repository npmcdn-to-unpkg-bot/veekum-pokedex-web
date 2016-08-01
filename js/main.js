$(document).ready(function() {

pokemonlist();
isotope();
/*
 $(".seePokemon").click(function() {
        alert(this.id);
    });
*/

});

function pokemonlist(){
    var content = "";
    var sumStats = 0;
    var url = "data/pokemon-list/getJSON.php?opcion=POKEMONLIST";
    $.ajax({
        type: "GET",
        url: url,
        dataType: "JSON",
        async: false,
        success: function(res) {
            $.each( res, function( key, value ) {
                sumStats = 0;
                content += '<article id="'+value.id+'" class="element-item '+value.types[0].name.toLowerCase()+' col-xs-6 col-sm-4 col-md-3 col-lg-2">';
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

function isotope(){
    // init Isotope
    var $grid = $('.grid').isotope({
      itemSelector: '.element-item',
      layoutMode: 'fitRows'
    });

    // filter functions
    var filterFns = {
      // show if number is greater than 50
      numberGreaterThan50: function() {
        var number = $(this).find('.number').text();
        return parseInt( number, 10 ) > 50;
      },
      // show if name ends with -ium
      ium: function() {
        var name = $(this).find('.name').text();
        return name.match( /ium$/ );
      }
    };

    // bind filter button click
    $('.filters-button-group').on( 'click', 'button', function() {
      var filterValue = $( this ).attr('data-filter');
      // use filterFn if matches value
      filterValue = filterFns[ filterValue ] || filterValue;
      $grid.isotope({ filter: filterValue });
    });

    // change is-checked class on buttons
    $('.button-group').each( function( i, buttonGroup ) {
      var $buttonGroup = $( buttonGroup );
      $buttonGroup.on( 'click', 'button', function() {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $( this ).addClass('is-checked');
      });
    });

}



function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}


