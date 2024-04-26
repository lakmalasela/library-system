const initial = () => {


    // function CreateTableInventory(colname, showcol, valuesofrow) {
    //     const tableContainer = document.getElementById('table-container1');
    //     tableContainer.innerHTML = ''; // Clear previous content
    //
    //     const table = document.createElement('table');
    //     const tableHeader = document.createElement('thead');
    //     const headerRow = document.createElement('tr');
    //
    //     showcol.forEach(colshow => {
    //         const headerCell = document.createElement('th');
    //         headerCell.style.textAlign = 'center';
    //         headerCell.textContent = colshow;
    //         headerRow.appendChild(headerCell);
    //     });
    //     tableHeader.appendChild(headerRow);
    //     table.appendChild(tableHeader);
    //
    //     const tableBody = document.createElement('tbody');
    //
    //     table.appendChild(tableBody);
    //     tableContainer.appendChild(table);
    //
    //     // Calculate total number of pages
    //     const totalPages = Math.ceil(valuesofrow.length / 4);
    //
    //     // Function to update table content based on selected page
    //     function updateTable(pageNumber) {
    //         tableBody.innerHTML = '';
    //         const startIndex = (pageNumber - 1) * 5;
    //         const endIndex = startIndex + 5;
    //         const data = valuesofrow.slice(startIndex, endIndex);
    //
    //         data.forEach(obj => {
    //             const row = document.createElement('tr');
    //             colname.forEach(col => {
    //                 const cell = document.createElement('td');
    //                 cell.textContent = obj[col] || '';
    //                 row.appendChild(cell);
    //             });
    //
    //
    //             tableBody.appendChild(row);
    //         });
    //     }
    //
    //     // Initialize pagination buttons
    //     const paginationContainer = document.createElement('div');
    //     paginationContainer.classList.add('pagination');
    //
    //     for (let i = 1; i <= totalPages; i++) {
    //         const pageButton = document.createElement('button');
    //         pageButton.className = 'btn btn-info';
    //         pageButton.style.marginTop = '5px';
    //         pageButton.textContent = i;
    //         pageButton.addEventListener('click', () => {
    //             updateTable(i);
    //         });
    //         paginationContainer.appendChild(pageButton);
    //     }
    //
    //     tableContainer.appendChild(paginationContainer);
    //
    //     // Show the first page initially
    //     updateTable(1);
    // }

    function CreateTableInventory(colname, showcol, valuesofrow) {
        const tableContainer = document.getElementById('table-container1');
        tableContainer.innerHTML = ''; // Clear previous content

        const table = document.createElement('table');
        const tableHeader = document.createElement('thead');
        const headerRow = document.createElement('tr');

        showcol.forEach(colshow => {
            const headerCell = document.createElement('th');
            headerCell.style.textAlign = 'center';
            headerCell.textContent = colshow;
            headerRow.appendChild(headerCell);
        });
        tableHeader.appendChild(headerRow);
        table.appendChild(tableHeader);

        const tableBody = document.createElement('tbody');

        table.appendChild(tableBody);
        tableContainer.appendChild(table);

        // Calculate total number of pages
        const totalPages = Math.ceil(valuesofrow.length / 4);

        // Function to update table content based on selected page
        function updateTable(pageNumber) {
            tableBody.innerHTML = '';
            const startIndex = (pageNumber - 1) * 5;
            const endIndex = startIndex + 5;
            const data = valuesofrow.slice(startIndex, endIndex);

            data.forEach(obj => {
                const row = document.createElement('tr');
                colname.forEach(col => {
                    const cell = document.createElement('td');
                    let nestedValue = obj;
                    const nestedProps = col.split('.'); // Split nested properties
                    for (const prop of nestedProps) {
                        if (nestedValue && nestedValue.hasOwnProperty(prop)) {
                            nestedValue = nestedValue[prop]; // Traverse nested object
                        } else {
                            nestedValue = ''; // If any property is missing, set value to empty string
                            break;
                        }
                    }
                    cell.textContent = nestedValue;
                    row.appendChild(cell);
                });
                tableBody.appendChild(row);
            });
        }

        // Initialize pagination buttons
        const paginationContainer = document.createElement('div');
        paginationContainer.classList.add('pagination');

        for (let i = 1; i <= totalPages; i++) {
            const pageButton = document.createElement('button');
            pageButton.className = 'btn btn-info';
            pageButton.style.marginTop = '5px';
            pageButton.textContent = i;
            pageButton.addEventListener('click', () => {
                updateTable(i);
            });
            paginationContainer.appendChild(pageButton);
        }

        tableContainer.appendChild(paginationContainer);

        // Show the first page initially
        updateTable(1);
    }






    //table
    ajaxRequest('http://localhost:8080/inventory/list', 'GET', null,
        function(inventory) {
            console.log('Employee:', inventory);
            var columnsToproperty  = ['id', 'book_id.name','bookcount', 'availablebookcount','damagecount','inventorystatus_id.name'];
            var showColumns = ['ID','Book Name','Total Count','Available.Count','Damage Count','Status']
            CreateTableInventory(columnsToproperty,showColumns,inventory,'inventory');
            // createTable(employee, columnsToShow);
        },
        function(xhr, status, error) {
            console.error('Error fetching designation:', error);
        },
        function() {
            console.log('Ajax request completed');
        }
    );


}
window.onload = initial;
