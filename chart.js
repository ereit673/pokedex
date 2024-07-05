
function renderChart(pokemonInfos) {
    let pokemonStats = pokemonInfos['stats'];
    console.log(pokemonStats);
    let statsNames = [];
    let statsValues = [];
    for (let i = 0; i < pokemonStats.length; i++) {
        const statName = pokemonStats[i]['stat']['name'];
        statsNames.push(statName);
    }

    for (let j = 0; j < pokemonStats.length; j++) {
        const statValue = pokemonStats[j]['base_stat'];
        statsValues.push(statValue);
    }
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: statsNames,
            datasets: [{
                data: statsValues,
                borderRadius: '50',
                borderWidth: 2,
                barPercentage: '1',
                backgroundColor: statsValues.map(value =>
                    value <= 30 ? 'red' : value <= 70 ? 'yellow' : 'green'
                ),
            }]
        },
        options: {
            aspectRatio: 1.5,
            plugins: {
                customCanvasBackgroundColor: {
                    color: 'rgb(255,215,0)'
                },
                legend: {
                    display: false,
                },
            },
            indexAxis: 'y',
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    }
                },
                x: {
                    max: 200,

                }
            }
        }
    });
}