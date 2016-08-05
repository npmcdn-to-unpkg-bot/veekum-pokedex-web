/************************************
* Init Botón Tajeta
************************************/
function initBtnTarjeta(){
    var contenedor = $(".poke-contenedor")
    if( contenedor.length ){
        contenedor.on("click", function(e){
            e.preventDefault();
            event.stopImmediatePropagation();
            var target = $(e.target),
                boton = target;
            if( target.prop("tagName") === "SPAN" ){
                boton = target.parent();
            }
            if( boton.hasClass("btn") ){
                boton.parents(".tarjeta-contenido").toggleClass("visible");
                target.find("span").toggleClass("fa-rotate-180");
            }
        });
    }
}
/************************************
* Inicializacion
************************************/
$(function(){
    initBtnTarjeta();

    // Bootstrap
    $('[data-toggle="tooltip"]').tooltip({
        "trigger" : "hover focus"
    });
});