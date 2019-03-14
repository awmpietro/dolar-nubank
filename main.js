(function($) {
    $("#calculate-btn").click(function(){
        $.LoadingOverlay("show");
        var today = moment().subtract('1', 'days').format('MM-DD-YYYY');
        var url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='"+today+"'&$top=100&$format=json&$select=cotacaoVenda";
        $.getJSON( url, function( data ) {
            $.LoadingOverlay("hide");
            if(data.value.length > 0) {
                var dolar = $('#dolar').val();
                var sum1 = dolar * data.value[0].cotacaoVenda;
                var sum2 = (sum1/100) * 4;
                var sum3 = sum1 + sum2;
                var sum4 = (sum3/100) * 6.38;
                var sum5 = sum4 + sum3;
                var total = sum5.toLocaleString('pt-BR', { style: 'currency', currency: 'REA'})
                $('#total').val(total);
            } else {
                bootbox.alert("Cotação do dólar comercial não disponibilizada pelo BCB para o dia de hoje.");
            }
        });
    });
})(jQuery);