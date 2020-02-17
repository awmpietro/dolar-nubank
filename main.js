(function($) {
    $('#dolarInfo').css("display", "none");
    $("#calculate-btn").click(function(){
        getData();
    });
})(jQuery);

const getData = async () => {
    $.LoadingOverlay("show");        
        let res = []
        let day = 0;
        while (res.length === 0) {
            res = await fetchData(day);
            day++
        }
        $.LoadingOverlay("hide");
        $('#dolarInfo').css("display", "block");
        let dolar = $('#dolar').val();
        let sum1 = dolar * res[0].cotacaoVenda;
        let sum2 = (sum1/100) * 4;
        let sum3 = sum1 + sum2;
        let sum4 = (sum3/100) * 6.38;
        let sum5 = sum4 + sum3;
        let total = sum5.toLocaleString('pt-BR', {minimumFractionDigits: 2, style: 'currency', currency: 'REA'})
        $('#total').val(total);
        $('#data').html(moment(res[0].dataHoraCotacao).format("DD/MM/YYYY") + " às " + moment(res[0].dataHoraCotacao).format("HH:mm:ss"));
        $('#compra').html(res[0].cotacaoCompra.toLocaleString('pt-BR', {minimumFractionDigits: 4, style: 'currency', currency: 'BLR'}));
        $('#venda').html(res[0].cotacaoVenda.toLocaleString('pt-BR', {minimumFractionDigits: 4, style: 'currency', currency: 'BLR'}));       
}

const fetchData = async (day) => {
    let today = moment().subtract(day, 'days').format('MM-DD-YYYY');
    let url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='"+today+"'&$top=100&$format=json&$select=cotacaoCompra,cotacaoVenda,dataHoraCotacao";
    const data = await $.getJSON( url );
    return data.value;
}