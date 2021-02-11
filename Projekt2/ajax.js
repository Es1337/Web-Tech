$(document).ready(function() {

    $("#login_form").on("submit", function( event ) {
        event.preventDefault();
        $.ajax({
            type: "POST",
            url: "/login",
            data: $(this).serialize(),
            success: function(response) {
                sendLocalDataToServer();
                alert(response);
            },
            error: function(response) {
                alert(response.responseText);
            }
        })
    });
    
    
    // CREATE
    $("#input_form").on("submit", function( event ) {
        event.preventDefault();
        var now = Date.now();
        var today = new Date(now);
        $.ajax({
            type: "POST",
            url: "/input",
            data: $(this).serialize() + "&Data=" + today.toDateString(),
            success: function(data) {
                alert('Wysłano dane.');
            },
            error: function(){
                alert('Nie udalo sie wysłać danych.');
            }
        })
    });
    
    // Save data locally
    $("#save_locally").click(function (event){
        let form_data = $("#input_form").serialize();
        var now = Date.now();
        var today = new Date(now);
        form_data += "&Data=" + today.toDateString();
        var survey = QueryStringToJSON(form_data)
        addObjectToStore('water_levels', survey);
    })
    
    function QueryStringToJSON(queryString) {            
        var pairs = queryString.split('&');
        
        var result = {};
        pairs.forEach(function(pair) {
            pair = pair.split('=');
            result[pair[0]] = decodeURIComponent(pair[1] || '');
        });
    
        return JSON.parse(JSON.stringify(result));
    }
    
    $("#get_results_offline").click(function (event) {
        event.preventDefault();
        readData('water_levels', function() {console.log("Read successful.");});
    
        
        $("#offline_results").html("");
        var table = '';
        if (typeof global_results !== 'undefined') {
            table += '<table class="table table-stripped">';
            table += '<thead class="thead-light"><tr>';
            
            for(var heading in global_results[0]){
                table += '<th>' + heading + '</th>';
            }
            table += '</tr></thead>';
            table += '<tbody>';
            
            for(var i = 0; i < global_results.length; i++){
                table += '<tr>';
                for(var field in global_results[i]){
                    table += '<td>' + global_results[i][field] + '</td>';
                }
                table += '</tr>';
            }
            table += '</tbody>';
            table += '</table>';
        }
        $("#offline_results").append(table);
    });
    
    
    $("#draw_chart").click(function (event){
        $.ajax({
            type: "GET",
            url: "/chart_data",
            success: function(data) {
                console.log(data);
                draw_chart(data);
            },
            error: function(){
                alert('Nie udalo sie uzyskać danych z serwera.');
            }
        })
    
        function draw_chart(data) {
            var ctx = document.getElementById("chart").getContext("2d");
            ctx.font = "30px Arial";
            var water = [];
            var days = [];
            
            for(var i = 0; i < data.length; i++) {
                water.push(data[i].Poziom_wody);
            } 
            for(var i = 0; i < data.length; i++) {
                days.push(data[i].Data);
            } 
            
            var chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: days,
                    datasets: [{
                        label: 'Poziom wody',
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        data: water,
                        fill: true,
                    }]
                },
                options: {
                    responsive: false
                }
            });
        }
    })
});