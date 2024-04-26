validcolor = "1px solid green";
invalidcolor = "1px solid red";
initialcolor = "1px solid #d6d6c2";
updatedColor = "1px solid orange";

function ajaxRequest(url, method, data, successCallback, errorCallback, finalCallback) {
    $.ajax({
        url: url,
        type: method,
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: function(response) {
            if (successCallback && typeof successCallback === 'function') {
                successCallback(response);
            }
            if (finalCallback && typeof finalCallback === 'function') {
                finalCallback();
            }
        },
        error: errorCallback
    });
}

function handleSuccess(response) {
    console.log('Success:', response);
}

function handleError(xhr, status, error) {
    console.error('Error:', error);
}


function populateSelectField(list, fieldId,selecttype, attr, selectedValue) {
    var selectField = $(fieldId);

    // Clear existing options
    selectField.empty();
    // Append initial option
    selectField.append($('<option>', { value: '', text: selecttype }));

    // Append options based on the received list
    list.forEach(function(item) {
        var option = $('<option>', { value: JSON.stringify(item), text: item[attr] });
        if (selectedValue && selectedValue === item[attr]) {
            option.prop('selected', true);
            selectField.css('border', '1px solid green'); // Add border to the select field
        }
        selectField.append(option);
    });
}


inputTextBind = (fieldId, pattern, obj, prop, oldobj) => {
    var regpattern = new RegExp(pattern);
    var val = fieldId.value.trim();

    console.log("Old ",oldobj)

    if(val !=""){
        if (regpattern.test(val)) {
            obj[prop] = val;
            if (oldobj != null && (oldobj[prop] !== obj[prop])){
                fieldId.style.border = updatedColor;
            }else{
                fieldId.style.border = validcolor;
            }
        }
        else {
            fieldId.style.border = invalidcolor;
            obj[prop] = null;
        }
    }else{
        if(fieldId.required){
            fieldId.style.border = invalidcolor;

        }else{
            fieldId.style.border = invalidcolor;
        }
        obj[prop] = null;
    }
}

//select bind field
bindSelectField = (fieldId, obj, prop,oldobj)=>{

    // Set the data-object attribute to store the object reference
    fieldId.setAttribute('data-object', 'employee');
    var ob = obj; // Get the employee object reference

    // Parse the value from the fieldId and set it to the prop of the object
    ob[prop] = JSON.parse(fieldId.value);
    // Check if the value is not null or undefined, then set the border color
    if (oldobj != null && (oldobj[prop] == null || oldobj[prop].id != ob[prop].id)) {
        fieldId.style.border = updatedColor;
    }
    else if(ob[prop] != null && ob[prop] !== ''){
        fieldId.style.border = validcolor;
    }
    else {
        fieldId.style.border = invalidcolor;
    }


}

function CreateTable(colname, showcol, valuesofrow, delmap) {
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

    const actionHeaderCell = document.createElement('th');
    actionHeaderCell.style.textAlign = 'center';
    actionHeaderCell.textContent = 'Action';
    headerRow.appendChild(actionHeaderCell);

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
                cell.textContent = obj[col] || '';
                row.appendChild(cell);
            });

            const actionCell = document.createElement('td');
            actionCell.style.width = "5vw";
            actionCell.style.textAlign = 'center';

            const updateButton = document.createElement('button');
            updateButton.innerHTML = '<i class="fas fa-file-alt"></i>';
            updateButton.className = 'btn btn-primary';
            updateButton.addEventListener('click', () => {
                fillFormFields(obj);
            });
            actionCell.appendChild(updateButton);

            const deleteButton = document.createElement('button');
            deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
            deleteButton.style.marginTop = '5px';
            deleteButton.className = 'btn btn-danger';
            deleteButton.addEventListener('click', () => {
                ajaxRequest('http://localhost:8080/' + delmap, 'DELETE', obj, function(response) {
                    console.log('Success:', response);
                    alert("Delete Record Successfully");
                    initial();
                    window.location.reload();
                }, function(xhr, status, error) {
                    console.error('Error:', error);
                });
            });
            actionCell.appendChild(deleteButton);

            row.appendChild(actionCell);
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


// function CreateTable(colname, showcol, valuesofrow, delmap) {
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
//
//     const actionHeaderCell = document.createElement('th');
//     actionHeaderCell.style.textAlign = 'center';
//     actionHeaderCell.textContent = 'Action';
//     headerRow.appendChild(actionHeaderCell);
//
//     tableHeader.appendChild(headerRow);
//     table.appendChild(tableHeader);
//
//     const tableBody = document.createElement('tbody');
//
//     valuesofrow.forEach(obj => {
//         const row = document.createElement('tr');
//         colname.forEach(col => {
//             const cell = document.createElement('td');
//             cell.textContent = obj[col] || '';
//             row.appendChild(cell);
//         });
//
//         const actionCell = document.createElement('td');
//         actionCell.style.width = "5vw";
//         actionCell.style.textAlign = 'center';
//
//         const updateButton = document.createElement('button');
//         updateButton.textContent = 'Fill Form';
//         updateButton.className = 'btn btn-primary';
//         updateButton.addEventListener('click', () => {
//             fillFormFields(obj);
//         });
//         actionCell.appendChild(updateButton);
//
//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = 'Delete';
//         deleteButton.className = 'btn btn-danger';
//         deleteButton.addEventListener('click', () => {
//             ajaxRequest('http://localhost:8080/' + delmap, 'DELETE', obj, function(response) {
//                 console.log('Success:', response);
//                 alert("Delete Record Successfully");
//                 initial();
//                 window.location.reload();
//             }, function(xhr, status, error) {
//                 console.error('Error:', error);
//             });
//         });
//         actionCell.appendChild(deleteButton);
//
//         row.appendChild(actionCell);
//         tableBody.appendChild(row);
//     });
//
//     table.appendChild(tableBody);
//     tableContainer.appendChild(table);
//
//     // Initialize pagination
//     $('#demo').pagination({
//         dataSource: valuesofrow, // Assuming valuesofrow contains all data
//         pageSize: 5,
//         pageNumber: 1, // Start with the first page
//         callback: function(data, pagination) {
//             // Clear existing table data
//             tableBody.innerHTML = '';
//
//             // Populate table with current page data
//             data.forEach(obj => {
//                 const row = document.createElement('tr');
//                 colname.forEach(col => {
//                     const cell = document.createElement('td');
//                     cell.textContent = obj[col] || '';
//                     row.appendChild(cell);
//                 });
//
//                 const actionCell = document.createElement('td');
//                 actionCell.style.width = "5vw";
//                 actionCell.style.textAlign = 'center';
//
//                 const updateButton = document.createElement('button');
//                 updateButton.textContent = 'Fill Form';
//                 updateButton.className = 'btn btn-primary';
//                 updateButton.addEventListener('click', () => {
//                     fillFormFields(obj);
//                 });
//                 actionCell.appendChild(updateButton);
//
//                 const deleteButton = document.createElement('button');
//                 deleteButton.textContent = 'Delete';
//                 deleteButton.className = 'btn btn-danger';
//                 deleteButton.addEventListener('click', () => {
//                     ajaxRequest('http://localhost:8080/' + delmap, 'DELETE', obj, function(response) {
//                         console.log('Success:', response);
//                         alert("Delete Record Successfully");
//                         initial();
//                         window.location.reload();
//                     }, function(xhr, status, error) {
//                         console.error('Error:', error);
//                     });
//                 });
//                 actionCell.appendChild(deleteButton);
//
//                 row.appendChild(actionCell);
//                 tableBody.appendChild(row);
//             });
//         }
//     });
// }



// function CreateTable(colname, showcol,valuesofrow,delmap) {
//
//     const table = document.createElement('table');
//
//     // Create a table header
//     const tableHeader = document.createElement('thead');
//     const headerRow = document.createElement('tr');
//
//     // Create an object to store maximum column widths
//     const maxWidths = {};
//     showcol.forEach(colshow => {
//         const headerCell = document.createElement('th');
//         headerCell.style.textAlign = 'center';
//         headerCell.textContent = colshow;
//         headerRow.appendChild(headerCell);
//
//         // Initialize maximum width for each column
//         // maxWidths[colshow] = colshow.length * 2; // Set an initial width based on the field name length
//     });
//
//     // Populate table header and initialize maximum column widths
//     // colname.forEach(col => {
//     //     const headerCell = document.createElement('th');
//     //     headerCell.style.textAlign = 'center';
//     //     headerCell.textContent = col;
//     //     headerRow.appendChild(headerCell);
//     //
//     //     // Initialize maximum width for each column
//     //     maxWidths[col] = col.length * 10; // Set an initial width based on the field name length
//     // });
//
//     // Add a column for the action buttons
//     const actionHeaderCell = document.createElement('th');
//     actionHeaderCell.style.textAlign = 'center';
//     actionHeaderCell.textContent = 'Action';
//     headerRow.appendChild(actionHeaderCell);
//
//     tableHeader.appendChild(headerRow);
//
//     // Create table body
//     const tableBody = document.createElement('tbody');
//
//     // Populate table body and update maximum column widths
//     valuesofrow.forEach(obj => {
//         const row = document.createElement('tr');
//         colname.forEach(col => {
//             const cell = document.createElement('td');
//             cell.textContent = obj[col] || ''; // Set cell content from data or empty string if data is undefined
//             row.appendChild(cell);
//
//             // Update maximum width for each column based on cell content
//             maxWidths[col] = Math.max(maxWidths[col], (obj[col] || '').toString().length * 10);
//         });
//
//         // Add action buttons cell
//         const actionCell = document.createElement('td');
//         actionCell.style.width = "5vw";
//         actionCell.style.textAlign = 'center';
//
//         // Update button
//         const updateButton = document.createElement('button');
//         updateButton.textContent = 'Fill Form';
//         updateButton.cursor = 'pointer';
//         updateButton.className = 'btn btn-primary';
//         updateButton.addEventListener('click', () => {
//             // Fill form fiel with row data for updating
//             fillFormFields(obj);
//         });
//         actionCell.appendChild(updateButton);
//
//         // Delete button
//         const deleteButton = document.createElement('button');
//         deleteButton.textContent = 'Delete';
//         deleteButton.className = 'btn btn-danger';
//         deleteButton.addEventListener('click', () => {
//             // Implement deletion logic here
//             // For example, you can delete the row from the table
//             ajaxRequest('http://localhost:8080/'+delmap, 'DELETE', obj, function(response) {
//                 console.log('Success:', response);
//                 alert("Delete Record Successfully");
//                 initial();
//                 // Reload the current page
//                 window.location.reload();
//
//                 console.log("SSSDDDFFF")
//             }, function(xhr, status, error) {
//                 console.error('Error:', error);
//             });
//
//         });
//         actionCell.appendChild(deleteButton);
//
//         row.appendChild(actionCell);
//
//         tableBody.appendChild(row);
//     });
//
//     // Set column widths based on maximum widths
//     colname.forEach(col => {
//         const headerCell = tableHeader.querySelector(`th:nth-child(${colname.indexOf(col) + 1})`);
//         headerCell.style.width = `${maxWidths[col]}px`;
//
//         const cellsInColumn = tableBody.querySelectorAll(`td:nth-child(${colname.indexOf(col) + 1})`);
//         cellsInColumn.forEach(cell => {
//             cell.style.width = `${maxWidths[col]}px`;
//         });
//     });
//
//     // Append the table header and body to the table
//     table.appendChild(tableHeader);
//     table.appendChild(tableBody);
//
//     // Append the table to the container in the DOM
//     const tableContainer = document.getElementById('table-container1');
//     tableContainer.appendChild(table);
// }




