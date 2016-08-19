/*global console:true */
/************************************
* Coleres de la tarjeta, se recuperan los colores declarados en el data-palette y a partir de ellos se definen los colores de la tarjeta
************************************/
function initColoresTarjeta(c){
    var tarjetas = $(".tarjeta"),
        color = "red",
        colorNum, colorTexto;
    tarjetas.each(function(){
        var colores = $(this).attr("data-palette").split(",");
        if( colores.length === 2){
            // sumar los dos colores
            color = $.xcolor.average( c[colores[0]], c[colores[1]] );
        } else {
            color = c[colores[0]];
        }
        // Aplicar estilos CSS
        $(this).css('border-bottom-color', color);
        $(this).find("figcaption").css('background-color', color);
        
        colorNum = parseInt( color.getHex().replace("#", ""), 16 );
        if (colorNum > (16777215 / 2)){
            colorTexto = "#565656";
        } else {
            colorTexto = "#f5f5f5";
        }
        $(this).find("figcaption").css("color", colorTexto);
    });
}

/************************************
* Init Botón Tajeta
************************************/
function initBtnTarjeta(){
    var contenedor = $(".poke-contenedor");
    if( contenedor.length ){
        contenedor.on("click", function(e){
            console.log("hola");
            event.stopImmediatePropagation();
            var target = $(e.target),
                boton = target;
            if( target.prop("tagName") === "SPAN" ){
                boton = target.parent();
            }
            if( boton.hasClass("btn-mostrar") ){
                e.preventDefault();
                boton.parents(".tarjeta-contenido").toggleClass("visible");
                boton.find("span").toggleClass("fa-rotate-180");
            } else {
                console.log( boton.attr("href") );
            }
        });
    }
}
/************************************
* Inicializacion
************************************/
$(function(){
    var colores = {
        "type1"    : "#A1ACA0", // normal
        "type2"    : "#AB6147", // fighting
        "type3"    : "#7FC7E6", // flying
        "type4"    : "#CC5094", // poison
        "type5"    : "#DBCCAD", // ground
        "type6"    : "#93734C", // rock
        "type7"    : "#97CE68", // bug
        "type8"    : "#8E95B1", // ghost
        "type9"    : "#636464", // steel
        "type10"    : "#E74C3C", // fire
        "type11"    : "#0FA7D2", // water
        "type12"    : "#2ECC71", // grass
        "type13"    : "#FFCA0C", // electric
        "type14"    : "#D41568", // psychic
        "type15"    : "#C7F2FF", // ice
        "type16"    : "#702A87", // dragon
        "type17"    : "#344146", // dark
        "type18"    : "#EEC3D6" // fairy
    };

    initColoresTarjeta( colores );
    initBtnTarjeta();

    // Bootstrap
    $('[data-toggle="tooltip"]').tooltip({
        "trigger" : "hover focus"
    });
});