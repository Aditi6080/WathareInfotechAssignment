var ctx = document.getElementById('myChart').getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: timestamps,
        datasets: [{
            label: 'Vibration Values',
            data: vibrationValues,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            fill: false
        }]
    },
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'second' // adjust the time scale as needed
                }
            },
            y: {
                beginAtZero: true
            }
        }
    }
});
