validcolor = "1px solid green";
invalidcolor = "red";
initialcolor = "2px solid #d6d6c2";
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

    console.log("old pg ", oldobj);
    if (val !== "") {
        if (regpattern.test(val)) {
            obj[prop] = val;
            console.log("SSSSSSSSSSSSSSSSS ", obj[prop]);
            if (oldobj != null && oldobj[prop] != null && oldobj[prop] !== obj[prop]) {
                fieldId.style.border = updatedColor;
            } else if (oldobj != null && oldobj[prop] != null && oldobj[prop] === obj[prop]) {
                fieldId.style.border = validcolor;
            } else {
                fieldId.style.border = validcolor;
            }
        } else {
            fieldId.style.border = invalidcolor;
            obj[prop] = null;
        }
    } else {
        if (fieldId.required) {
            fieldId.style.border = invalidcolor;
        } else {
            fieldId.style.border = initialcolor;
        }
        obj[prop] = null;
    }
}

// inputTextBind = (fieldId,pattern, obj, prop,oldobj) =>{
//     var regpattern = new RegExp(pattern);
//     var val = fieldId.value.trim();
//
//     console.log("old pg ",oldobj)
//     if (val !== "") {
//         if (regpattern.test(val)) {
//             obj[prop] = val;
//             console.log("SSSSSSSSSSSSSSSSS ", obj[prop]);
//             if(oldobj != null && (oldobj[prop] != obj[prop])){
//                 fieldId.style.border = updatedColor;
//             }else if(oldobj[prop] === obj[prop]){
//                 fieldId.style.border = validcolor;
//             }
//             else{
//
//                 fieldId.style.border = validcolor;
//             }
//         } else {
//             fieldId.style.border = invalidcolor;
//             obj[prop] = null;
//         }
//     } else {
//         if (fieldId.required) {
//             fieldId.style.border = invalidcolor;
//         } else {
//             fieldId.style.border = initialcolor;
//         }
//         obj[prop] = null;
//     }
//
// }

//select bind field
bindSelectField = (fieldId, obj, prop)=>{

    // Set the data-object attribute to store the object reference
    fieldId.setAttribute('data-object', 'employee');
    var ob = obj; // Get the employee object reference

    // Parse the value from the fieldId and set it to the prop of the object
    ob[prop] = JSON.parse(fieldId.value);
    console.log("Selected designation ID:", ob[prop]);

    // Check if the value is not null or undefined, then set the border color
    if (ob[prop] != null && ob[prop] !== '') {
        fieldId.style.border = validcolor;
    } else {
        fieldId.style.border = invalidcolor;
    }


}


function CreateTable(colname, valuesofrow) {

    const table = document.createElement('table');

    // Create a table header
    const tableHeader = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Create an object to store maximum column widths
    const maxWidths = {};

    // Populate table header and initialize maximum column widths
    colname.forEach(col => {
        const headerCell = document.createElement('th');
        headerCell.style.textAlign = 'center';
        headerCell.textContent = col;
        headerRow.appendChild(headerCell);

        // Initialize maximum width for each column
        maxWidths[col] = col.length * 10; // Set an initial width based on the field name length
    });

    // Add a column for the action buttons
    const actionHeaderCell = document.createElement('th');
    actionHeaderCell.style.textAlign = 'center';
    actionHeaderCell.textContent = 'Action';
    headerRow.appendChild(actionHeaderCell);

    tableHeader.appendChild(headerRow);

    // Create table body
    const tableBody = document.createElement('tbody');

    // Populate table body and update maximum column widths
    valuesofrow.forEach(obj => {
        const row = document.createElement('tr');
        colname.forEach(col => {
            const cell = document.createElement('td');
            cell.textContent = obj[col] || ''; // Set cell content from data or empty string if data is undefined
            row.appendChild(cell);

            // Update maximum width for each column based on cell content
            maxWidths[col] = Math.max(maxWidths[col], (obj[col] || '').toString().length * 10);
        });

        // Add action buttons cell
        const actionCell = document.createElement('td');
        actionCell.style.width = "5vw";
        actionCell.style.textAlign = 'center';

        // Update button
        const updateButton = document.createElement('button');
        updateButton.textContent = 'Fill Form';
        updateButton.cursor = 'pointer';
        updateButton.className = 'btn btn-primary';
        updateButton.addEventListener('click', () => {
            // Fill form fields with row data for updating
            fillFormFields(obj);
        });
        actionCell.appendChild(updateButton);

        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'btn btn-danger';
        deleteButton.addEventListener('click', () => {
            // Implement deletion logic here
            // For example, you can delete the row from the table
            row.remove();
        });
        actionCell.appendChild(deleteButton);

        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });

    // Set column widths based on maximum widths
    colname.forEach(col => {
        const headerCell = tableHeader.querySelector(`th:nth-child(${colname.indexOf(col) + 1})`);
        headerCell.style.width = `${maxWidths[col]}px`;

        const cellsInColumn = tableBody.querySelectorAll(`td:nth-child(${colname.indexOf(col) + 1})`);
        cellsInColumn.forEach(cell => {
            cell.style.width = `${maxWidths[col]}px`;
        });
    });

    // Append the table header and body to the table
    table.appendChild(tableHeader);
    table.appendChild(tableBody);

    // Append the table to the container in the DOM
    const tableContainer = document.getElementById('table-container1');
    tableContainer.appendChild(table);
}




