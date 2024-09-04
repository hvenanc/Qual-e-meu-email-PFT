document.addEventListener('DOMContentLoaded', () => {
    fetch('data/turma2.json')
        .then(response => response.json())
        .then(data => {
            createTable(data);
            setupSearch(data);
        })
        .catch(error => console.error('Erro ao carregar os dados JSON:', error));
});

function createTable(data) {
    const table = document.getElementById('data-table');
    const thead = table.querySelector('thead tr');
    const tbody = table.querySelector('tbody');

    if (data.length > 0) {
        const headers = Object.keys(data[0]);
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header.charAt(0).toUpperCase() + header.slice(1);
            thead.appendChild(th);
        });

        data.forEach(item => {
            const tr = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = item[header];
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }
}

function setupSearch(data) {
    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', () => {
        const filter = searchInput.value.toLowerCase();
        const filteredData = data.filter(item => {
            return Object.values(item).some(value => 
                value.toString().toLowerCase().includes(filter)
            );
        });
        updateTable(filteredData);
    });
}

function updateTable(data) {
    const tbody = document.querySelector('#data-table tbody');
    tbody.innerHTML = ''; // Limpa a tabela

    const headers = Object.keys(data[0] || {});
    data.forEach(item => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = item[header];
            tr.appendChild(td);
        });
        tbody.appendChild(tr);
    });
}
