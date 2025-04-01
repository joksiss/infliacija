const button = document.getElementById("button")
let chart
button.onclick=function() 
{
    event.preventDefault()
    const atlyginimas = parseFloat(document.getElementById("atlyginimas").value)
    const pradineData = new Date(document.getElementById("pradine-data").value)
    const galutineData = new Date (document.getElementById("galutine-data").value)
    const infliacija = parseFloat(document.getElementById("infliacija").value)
    const atlyginimoPokytis = parseFloat(document.getElementById("atlyginimo-pokytis").value)

    const metuSkirtumas = galutineData.getFullYear() - pradineData.getFullYear();
    console.log (metuSkirtumas)

    let skirtumas = atlyginimas
    let algosPokytis = [atlyginimas]

    for (let i = 0; i < metuSkirtumas; i++) {
        skirtumas *= (1 + atlyginimoPokytis/100); // Taikomas atlyginimo augimas
        skirtumas /= (1 + infliacija/100); // Koreguojama pagal infliaciją
        algosPokytis.push(skirtumas);
    }
    if (chart)
    {
        chart.destroy()
    }
    const rezultatas = document.getElementById("rez")
    rezultatas.innerHTML=`Po ${metuSkirtumas} metų atlyginimas pagal infliaciją bus ${skirtumas.toFixed(2)} EUR.`
    let ctx = document.getElementById('chart').getContext('2d');
    chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({length: metuSkirtumas + 1}, (_, i) => `Metai ${i}`),
            datasets: [{
                label: 'Perkamoji galia',
                data: algosPokytis.map(val => val.toFixed(2)),
                borderColor: '#3498db',
                fill: false,
                tension: 0.1,
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
}