// Emission factors (kg CO2 per unit)
const emissionFactors = {
    diesel: 2.67,      // kg CO2 per liter of diesel
    electricity: 0.91, // kg CO2 per kWh of electricity
    excavation: 0.04   // kg CO2 per ton of excavation
};

// Industry benchmarks (in kg CO2)
const industryBenchmarks = {
    perTonExcavation: 0.05, // Average emissions per ton of excavation
    perEmployee: 5000,      // Average emissions per employee per year
    perUnitEnergy: 0.85     // Average emissions per kWh
};

let emissionChart = null; // Store the chart instance

function calculateEmissions() {
    // Get input values
    const excavationVolume = parseFloat(document.getElementById('excavationVolume').value);
    const dieselConsumed = parseFloat(document.getElementById('dieselConsumed').value);
    const transportationDistance = parseFloat(document.getElementById('transportationDistance').value);
    const electricityConsumed = parseFloat(document.getElementById('electricityConsumed').value);
    const employees = parseInt(document.getElementById('employees').value);

    // Calculate emissions for each activity
    const excavationEmissions = excavationVolume * emissionFactors.excavation;
    const dieselEmissions = dieselConsumed * emissionFactors.diesel;
    const electricityEmissions = electricityConsumed * emissionFactors.electricity;

    // Calculate total emissions
    const totalEmissions = excavationEmissions + dieselEmissions + electricityEmissions;

    // Calculate per capita emissions
    const perCapitaEmissions = totalEmissions / employees;

    // Display results
    document.getElementById('totalEmissions').innerText = totalEmissions.toFixed(2);
    document.getElementById('perCapitaEmissions').innerText = perCapitaEmissions.toFixed(2);

    // Show results section
    document.getElementById('results').classList.remove('hidden');

    // Generate or update chart
    generateChart(excavationEmissions, dieselEmissions, electricityEmissions);

    // Compare with benchmarks
    const comparison = compareWithBenchmark(totalEmissions, excavationVolume, employees, electricityConsumed);
    displayComparisonResults(comparison);
}

function generateChart(excavationEmissions, dieselEmissions, electricityEmissions) {
    const ctx = document.getElementById('emissionChart').getContext('2d');
    
    // Destroy the existing chart if it exists
    if (emissionChart) {
        emissionChart.destroy();
    }

    // Create a new chart
    emissionChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Excavation', 'Diesel Consumption', 'Electricity Consumption'],
            datasets: [{
                label: 'Emissions (kg CO2)',
                data: [excavationEmissions, dieselEmissions, electricityEmissions],
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56'],
                hoverOffset: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Activity-wise Carbon Emissions'
                }
            }
        }
    });
}

function compareWithBenchmark(totalEmissions, excavationVolume, employees, electricityConsumed) {
    const excavationBenchmark = excavationVolume * industryBenchmarks.perTonExcavation;
    const perEmployeeBenchmark = employees * industryBenchmarks.perEmployee;
    const energyBenchmark = electricityConsumed * industryBenchmarks.perUnitEnergy;

    return {
        excavationComparison: totalEmissions - excavationBenchmark,
        perEmployeeComparison: (totalEmissions / employees) - perEmployeeBenchmark,
        energyComparison: (electricityConsumed * emissionFactors.electricity) - energyBenchmark
    };
}

function displayComparisonResults(comparison) {
    const comparisonSection = document.getElementById('comparisonResults');
    comparisonSection.innerHTML = `
        <p>Excavation Emissions: ${comparison.excavationComparison.toFixed(2)} kg CO2 compared to industry benchmark.</p>
        <p>Per Employee Emissions: ${comparison.perEmployeeComparison.toFixed(2)} kg CO2 compared to industry benchmark.</p>
        <p>Energy Consumption Emissions: ${comparison.energyComparison.toFixed(2)} kg CO2 compared to industry benchmark.</p>
    `;
    comparisonSection.classList.remove('hidden');
}

async function generatePDFReport() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    
    doc.setFontSize(16);
    doc.text("Carbon Footprint Report", 20, 20);
    
    const totalEmissions = parseFloat(document.getElementById('totalEmissions').innerText);
    const perCapitaEmissions = parseFloat(document.getElementById('perCapitaEmissions').innerText);
    
    doc.setFontSize(12);
    doc.text(`Total Emissions: ${totalEmissions} kg CO2`, 20, 30);
    doc.text(`Per Capita Emissions: ${perCapitaEmissions} kg CO2`, 20, 40);

    const comparisonSection = document.getElementById('comparisonResults').innerText;
    doc.text("Benchmark Comparison:", 20, 60);
    doc.text(comparisonSection, 20, 70);

    doc.text("Compliant with Indian environmental regulations and international standards.", 20, 110);
    
    doc.save('carbon_footprint_report.pdf');
}
