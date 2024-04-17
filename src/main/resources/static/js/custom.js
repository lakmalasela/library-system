validcolor = "2px solid green";
invalidcolor = "2px solid red";
initialcolor = "2px solid #d6d6c2";

function ajaxRequest(url, method, data, successCallback, errorCallback, finalCallback) {
    $.ajax({
        url: url,
        type: method,
        data: data,
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

//load data for select field
function populateSelectField(list, fieldId, attr, selectedValue) {
    var selectField = $(fieldId);

    // Clear existing options
    selectField.empty();

    // Append initial option
    selectField.append($('<option>', { value: '', text: 'Select the Designation' }));

    // Append options based on the received list
    list.forEach(function(item) {
        var option = $('<option>', { value: JSON.stringify(item), text: item[attr] });
        if (selectedValue && selectedValue[attr] === item[attr]) {
            option.prop('selected', true);
            selectField.css('border', '2px solid green'); // Add border to the select field
        }
        selectField.append(option);
    });
}

inputTextBind = (fieldId,pattern, obj, prop) =>{
    var regpattern = new RegExp(pattern);
    var val = fieldId.value.trim();

    if (val !== "") {
        if (regpattern.test(val)) {
            obj[prop] = val;
            fieldId.style.border = validcolor;
            console.log("SSSSSSSSSSSSSSSSS ", obj[prop]);
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

