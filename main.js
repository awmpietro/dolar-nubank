(function($) {
    $("#calculate-btn").click(function(){
        $.LoadingOverlay("show");
        //let today = moment().subtract('3', 'days').format('MM-DD-YYYY');
        let today = moment().format('MM-DD-YYYY');
        let url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='"+today+"'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao";
        $.getJSON( url, function( data ) {
            $.LoadingOverlay("hide");
            if(data.value.length > 0) {
                let dolar = $('#dolar').val();
                let sum1 = dolar * data.value[0].cotacaoVenda;
                let sum2 = (sum1/100) * 4;
                let sum3 = sum1 + sum2;
                let sum4 = (sum3/100) * 6.38;
                let sum5 = sum4 + sum3;
                let total = sum5.toLocaleString('pt-BR', { style: 'currency', currency: 'REA'})
                $('#total').val(total);
                $('#data').html(moment(data.value[0].dataHoraCotacao).format("DD/MM/YYYY HH:mm:ss"));
                $('#compra').html(data.value[0].cotacaoCompra.toLocaleString('pt-BR', { style: 'currency', currency: 'REA'}))
                $('#venda').html(data.value[0].cotacaoVenda.toLocaleString('pt-BR', { style: 'currency', currency: 'REA'}))
            } else {
                bootbox.alert("Cotação do dólar comercial não disponibilizada pelo BCB para o dia de hoje.");
            }
        });
    });
})(jQuery);