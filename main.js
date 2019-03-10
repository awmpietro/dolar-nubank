function calculate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    } 
    if (mm < 10) {
        mm = '0' + mm;
    } 
    var today = mm + '-' + dd + '-' + yyyy;
    var url = "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='"+today+"'&$top=100&$format=json&$select=cotacaoVenda";
    $.getJSON( url, function( data ) {
        if(data.value.length > 0) {
            var dolar = document.getElementById('dolar').value;
            var sum1 = dolar * data.value[0].cotacaoVenda;
            var sum2 = (sum1/100) * 4;
            var sum3 = sum1 + sum2;
            var sum4 = (sum3/100) * 6.38;
            var sum5 = sum4 + sum3;
            document.getElementById('total').value = sum5.toFixed(4);
        } else {
            alert("Cotação do dólar comercial não disponível pelo BCB.")
        }

    });

}