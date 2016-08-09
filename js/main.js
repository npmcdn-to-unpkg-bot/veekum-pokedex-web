$(document).ready(function() {
    
    

    pokemonlist();
    

    $(window).scroll(function(){

        if ($(window).scrollTop() == $(document).height() - $(window).height()){
            if($(".pagenum:last").val() <= $(".total-page:last").val()) {
                var rowcount = parseInt($(".total-page:last").val()) + 1;
                var pagenum = parseInt($(".pagenum:last").val()) + 1;
                pokemonlist(rowcount,pagenum);
            }
        }
    }); 

    isotope();
/*
 $(".seePokemon").click(function() {
        alert(this.id);
    });
*/

});



function pokemonlist(rowcount,pagenum){

    var content = "";
    var sumStats = 0;
    var url = "data/pokemon-list/getJSON.php";
    $.ajax({
        type: "POST",
        url: url,
        data:  {opcion:"POKEMONLIST", rowcount:rowcount, page:pagenum},
        dataType: "JSON",
        async: true,
        beforeSend: function(){
        $('#loader-icon').show();
        },
        complete: function(){
        $('#loader-icon').hide();
        },
        success: function(res) {
            var max;
            max = 0;
            var data = res.data;
            var structure = res.structure;
            content += '<input type="hidden" class="pagenum" value="'+structure.page+'" /><input type="hidden" class="total-page" value="'+structure.rowcount+'" />';
            $.each( data, function( key, value ) {
                sumStats = 0;

                if(value.types[1] !== undefined) {
                    content += '<article id="'+value.id+'" class="element-item type'+value.types[1].id+' type'+value.types[0].id+' col-xs-12 col-sm-6 col-md-4 col-lg-3">';
                }else{
                    content += '<article id="'+value.id+'" class="element-item type'+value.types[0].id+' col-xs-12 col-sm-6 col-md-4 col-lg-3">';
                }

                content += '    <div class="tarjeta tarjeta-type'+value.types[0].id+'">';
                content += '        <figure class="tarjeta-figure text-center">';
                content += '            <img src="img/pokemon-small/'+pad(value.id, 3)+'.png" alt="Nombre">';
                content += '            <figcaption>#'+pad(value.id, 3)+'</figcaption>';
                content += '        </figure>';
                content += '        <div class="tarjeta-contenido">';
                content += '            <section class="tarjeta-titulo">';
                content += '                <nav class="tarjeta-nav">';
                content += '                    <a href="#" class="btn btn-mostrar"><span class="fa fa-angle-up"></span></a>';
                content += '                    <a href="detalle.html?pid=1" class="btn"><span class="fa fa-angle-double-right"></span></a>';
                content += '                </nav>';

                
                content += '                <h1>'+value.name+'';
                $.each( value.types, function( key, value ) {
                    content += '                    <span class="type type'+value["id"]+'" data-toggle="tooltip" data-placement="top" title="'+value["name"]+'">'+value["name"]+'</span> ';
                    
                });
                content += '                </h1>';
                content += '             </section>';
                content += '             <section class="tarjeta-stats clearfix text-center">';
                $.each( value.stats, function( key, value ) {
                    if(max < parseInt(value.base_stat)){
                        max = value.base_stat;
                    }

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
            $(".poke-contenedor").append(content);
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


