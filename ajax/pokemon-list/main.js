$(document).ready(function() {

pokemonlist();
loadDataTable();

 $(".seePokemon").click(function() {
        alert(this.id);
    });


});

function pokemonlist(){
    var content = "";
    var header = "";
    var url = "ajax/pokemon-list/getJSON.php?opcion=POKEMONLIST";
    $.ajax({
        type: "GET",
        url: url,
        dataType: "JSON",
        async: false,
        success: function(res) {
            header = "<thead>";
            header += "<tr>";
                header += "<th>IMG</th>";
                header += "<th>#</th>";
                header += "<th>Name</th>";
                header += "<th>Type</th>";
                header += "<th data-hide='phone,tablet'>HP</th>";
                header += "<th data-hide='phone,tablet'>Attack</th>";
                header += "<th data-hide='phone,tablet'>Defense</th>";
                header += "<th data-hide='phone,tablet'>Special Attack</th>";
                header += "<th data-hide='phone,tablet'>Special Defense</th>";
                header += "<th data-hide='phone,tablet'>Speed</th>";
                header += "<th data-hide='phone,tablet'>Total</th>";
            header += "</tr>";
            header += "</thead>";
            content = "<tbody>";
            $.each( res, function( key, value ) {
                var sumStats = 0;
                content += "<tr class='seePokemon' id='"+value.id+"'>";
                    content += "<td><img src='img/pokemon-small/"+pad(value.id, 3)+".png' width='40px' height='40px'></td>";
                    content += "<td>"+pad(value.id, 3)+"</td>";
                    content += "<td>"+value.name+"</td>";
                    content += "<td>";
                    $.each( value.types, function( key, value ) {
                        content += "<img src='img/pokemon-types/"+value["name"]+".png' width='70px' height='25px'>";
                        
                    });
                    content += "</td>";
                    $.each( value.stats, function( key, value ) {
                        sumStats = sumStats + parseInt(value.base_stat);
                        content += "<td>"+value.base_stat+"</td>";
                    });
                    content += "<td>"+sumStats+"</td>";
                content += "</tr>";
            });
            content += "</tbody>";
            $("#datatable_tabletools").html(header+content);
        }
    });
}

function loadDataTable(){
        /* DO NOT REMOVE : GLOBAL FUNCTIONS!
     *
     * pageSetUp(); WILL CALL THE FOLLOWING FUNCTIONS
     *
     * // activate tooltips
     * $("[rel=tooltip]").tooltip();
     *
     * // activate popovers
     * $("[rel=popover]").popover();
     *
     * // activate popovers with hover states
     * $("[rel=popover-hover]").popover({ trigger: "hover" });
     *
     * // activate inline charts
     * runAllCharts();
     *
     * // setup widgets
     * setup_widgets_desktop();
     *
     * // run form elements
     * runAllForms();
     *
     ********************************
     *
     * pageSetUp() is needed whenever you load a page.
     * It initializes and checks for all basic elements of the page
     * and makes rendering easier.
     *
     */

    pageSetUp();
    
    /*
     * ALL PAGE RELATED SCRIPTS CAN GO BELOW HERE
     * eg alert("my home function");
     * 
     * var pagefunction = function() {
     *   ...
     * }
     * loadScript("js/plugin/_PLUGIN_NAME_.js", pagefunction);
     * 
     */
    
    // PAGE RELATED SCRIPTS
    
    // pagefunction 
    var pagefunction = function() {
        //console.log("cleared");
        
        /* // DOM Position key index //
        
            l - Length changing (dropdown)
            f - Filtering input (search)
            t - The Table! (datatable)
            i - Information (records)
            p - Pagination (paging)
            r - pRocessing 
            < and > - div elements
            <"#id" and > - div with an id
            <"class" and > - div with a class
            <"#id.class" and > - div with an id and class
            
            Also see: http://legacy.datatables.net/usage/features
        */  

        /* BASIC ;*/
            var responsiveHelper_datatable_tabletools = undefined;
            
            var breakpointDefinition = {
                tablet : 1024,
                phone : 480
            };
        /* END BASIC */
        
        /* TABLETOOLS */
        $('#datatable_tabletools').dataTable({
            
            // Tabletools options: 
            //   https://datatables.net/extensions/tabletools/button_options
            "sDom": "<'dt-toolbar'<'col-xs-12 col-sm-6'f><'col-sm-6 col-xs-6 hidden-xs'T>r>"+
                    "t"+
                    "<'dt-toolbar-footer'<'col-sm-6 col-xs-12 hidden-xs'i><'col-sm-6 col-xs-12'p>>",
            "oTableTools": {
                 "aButtons": [
                 "copy",
                 "csv",
                 "xls",
                    {
                        "sExtends": "pdf",
                        "sTitle": "SmartAdmin_PDF",
                        "sPdfMessage": "SmartAdmin PDF Export",
                        "sPdfSize": "letter"
                    },
                    {
                        "sExtends": "print",
                        "sMessage": "Generated by SmartAdmin <i>(press Esc to close)</i>"
                    }
                 ],
                "sSwfPath": "js/plugin/datatables/swf/copy_csv_xls_pdf.swf"
            },
            "autoWidth" : true,
            "paging" : true,
            "iDisplayLength" : 50,
            "preDrawCallback" : function() {
                // Initialize the responsive datatables helper once.
                if (!responsiveHelper_datatable_tabletools) {
                    responsiveHelper_datatable_tabletools = new ResponsiveDatatablesHelper($('#datatable_tabletools'), breakpointDefinition);
                }
            },
            "rowCallback" : function(nRow) {
                responsiveHelper_datatable_tabletools.createExpandIcon(nRow);
            },
            "drawCallback" : function(oSettings) {
                responsiveHelper_datatable_tabletools.respond();
            }
        });
        
        /* END TABLETOOLS */

    };

    // load related plugins
    
    loadScript("js/plugin/datatables/jquery.dataTables.min.js", function(){
        loadScript("js/plugin/datatables/dataTables.colVis.min.js", function(){
            loadScript("js/plugin/datatables/dataTables.tableTools.min.js", function(){
                loadScript("js/plugin/datatables/dataTables.bootstrap.min.js", function(){
                    loadScript("js/plugin/datatable-responsive/datatables.responsive.min.js", pagefunction)
                });
            });
        });
    });

}

function pad (str, max) {
  str = str.toString();
  return str.length < max ? pad("0" + str, max) : str;
}


