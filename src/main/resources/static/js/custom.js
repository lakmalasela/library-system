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
bindSelectField = (fieldId, obj, prop, oldobj, regexPattern = null) => {
    // Set the data-object attribute to store the object reference
    fieldId.setAttribute('data-object', 'employee');
    var ob = obj; // Get the employee object reference

    // Validate if the field value is JSON
    var fieldValue = fieldId.value;
    var parsedValue;
    try {
        parsedValue = JSON.parse(fieldValue);
    } catch (error) {
        // If parsing fails, assume fieldValue is not JSON and use it directly
        parsedValue = fieldValue;
    }

    // Assign the parsed or raw value to the object property
    ob[prop] = parsedValue;

    // Check if the value matches the regex pattern if provided
    var isValidPattern = true;
    if (regexPattern instanceof RegExp) {
        isValidPattern = regexPattern.test(ob[prop]);
    }

    // Check if the value is not null or undefined, then set the border color
    if (oldobj != null && (oldobj[prop] == null || oldobj[prop].id != ob[prop].id)) {
        fieldId.style.border = updatedColor;
    } else if (ob[prop] != null && ob[prop] !== '' && isValidPattern) {
        fieldId.style.border = validcolor;
    } else {
        fieldId.style.border = invalidcolor;
    }
}


// bindSelectField = (fieldId, obj, prop, oldobj, regexPattern = null) => {
//     // Set the data-object attribute to store the object reference
//     fieldId.setAttribute('data-object', 'employee');
//     var ob = obj; // Get the employee object reference
//
//     // Parse the value from the fieldId and set it to the prop of the object
//     ob[prop] = JSON.parse(fieldId.value);
//
//     // Check if the value matches the regex pattern if provided
//     var isValidPattern = true;
//     if (regexPattern) {
//         isValidPattern = regexPattern.test(ob[prop]);
//     }
//
//     // Check if the value is not null or undefined, then set the border color
//     if (oldobj != null && (oldobj[prop] == null || oldobj[prop].id != ob[prop].id)) {
//         fieldId.style.border = updatedColor;
//     } else if (ob[prop] != null && ob[prop] !== '' && isValidPattern) {
//         fieldId.style.border = validcolor;
//     } else {
//         fieldId.style.border = invalidcolor;
//     }
// }




// bindSelectField = (fieldId, obj, prop,oldobj)=>{
//
//     // Set the data-object attribute to store the object reference
//     fieldId.setAttribute('data-object', 'employee');
//     var ob = obj; // Get the employee object reference
//
//     // Parse the value from the fieldId and set it to the prop of the object
//     ob[prop] = JSON.parse(fieldId.value);
//     // Check if the value is not null or undefined, then set the border color
//     if (oldobj != null && (oldobj[prop] == null || oldobj[prop].id != ob[prop].id)) {
//         fieldId.style.border = updatedColor;
//     }
//     else if(ob[prop] != null && ob[prop] !== ''){
//         fieldId.style.border = validcolor;
//     }
//     else {
//         fieldId.style.border = invalidcolor;
//     }
//
//
// }

function CreateTable(colname, showcol, valuesofrow, delmap) {
    const tableContainer = document.getElementById('table-container1');
    tableContainer.innerHTML = ''; // Clear previous content

    const table = document.createElement('table');
    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Create table headers
    showcol.forEach(colshow => {
        const headerCell = document.createElement('th');
        headerCell.style.textAlign = 'center';
        headerCell.textContent = colshow;
        headerRow.appendChild(headerCell);
    });

    // Add action header cell
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

        // Loop through data and populate table rows
        data.forEach(obj => {
            const row = document.createElement('tr');
            colname.forEach(col => {
                const cell = document.createElement('td');
                // Check if column is nested
                if (col.includes('.')) {
                    const nestedProps = col.split('.');
                    let nestedValue = obj;
                    nestedProps.forEach(prop => {
                        nestedValue = nestedValue[prop];
                    });
                    cell.textContent = nestedValue || '';
                } else {
                    cell.textContent = obj[col] || '';
                }
                row.appendChild(cell);
            });

            // Create action buttons
            const actionCell = document.createElement('td');
            actionCell.style.width = "5vw";
            actionCell.style.textAlign = 'center';

            const updateButton = document.createElement('button');
            updateButton.innerHTML = '<i class="fas fa-file-alt"></i>';
            updateButton.className = 'btn btn-primary';
            if(delmap =='bookissue'){
                updateButton.disabled = true;
                updateButton.style.cursor = 'not-allowed';
            }
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
        pageButton.style.marginLeft = '5px';
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
//             const actionCell = document.createElement('td');
//             actionCell.style.width = "5vw";
//             actionCell.style.textAlign = 'center';
//
//             const updateButton = document.createElement('button');
//             updateButton.innerHTML = '<i class="fas fa-file-alt"></i>';
//             updateButton.className = 'btn btn-primary';
//             updateButton.addEventListener('click', () => {
//                 fillFormFields(obj);
//             });
//             actionCell.appendChild(updateButton);
//
//             const deleteButton = document.createElement('button');
//             deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
//             deleteButton.style.marginTop = '5px';
//             deleteButton.className = 'btn btn-danger';
//             deleteButton.addEventListener('click', () => {
//                 ajaxRequest('http://localhost:8080/' + delmap, 'DELETE', obj, function(response) {
//                     console.log('Success:', response);
//                     alert("Delete Record Successfully");
//                     initial();
//                     window.location.reload();
//                 }, function(xhr, status, error) {
//                     console.error('Error:', error);
//                 });
//             });
//             actionCell.appendChild(deleteButton);
//
//             row.appendChild(actionCell);
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











