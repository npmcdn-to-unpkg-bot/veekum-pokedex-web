/************************************
* Init Botón Tajeta
************************************/
function initBtnTarjeta(){
    var boton = $('.btn-mostrar');
    if( boton.length ){
        boton.on("click", function(e){
            e.preventDefault();
            var target = $(e.currentTarget),
                span = target.find("span");
            target.parents(".tarjeta-contenido").toggleClass("visible");
span.toggleClass("fa-rotate-180");
        });
    }
}
/************************************
* Inicializacion
************************************/
$(function(){
    initBtnTarjeta();
});