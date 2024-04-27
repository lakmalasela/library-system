const initial = () => {


 ajaxRequest('http://localhost:8080/designation/list', 'GET', null,
     function(designation) {
      console.log('Designation:', designation);
      designationList = designation;
      populateSelectField(designation, '#textDesignation','Select the Designation','name','');
     },
     function(xhr, status, error) {
      console.error('Error fetching designation:', error);
     },
     function() {
      console.log('Ajax request completed');
     }
 );

 //table
    ajaxRequest('http://localhost:8080/employee/list', 'GET', null,
        function(employee) {
            console.log('Employee:', employee);
            var columnsToproperty = ['id', 'empcode', 'empname'];
            var showColumns = ['ID','EMP Codee','EMP Name']
            CreateTable(columnsToproperty,showColumns,employee,'employee');
            // createTable(employee, columnsToShow);
        },
        function(xhr, status, error) {
            console.error('Error fetching designation:', error);
        },
        function() {
            console.log('Ajax request completed');
        }
    );

    mountForm();
}
window.onload = initial;

addEmployee = () =>{

    var postData = employee;
    console.log("EMP ",employee)

    ajaxRequest('http://localhost:8080/employee', 'POST', employee, function(response) {
        console.log('Success:', response);
        alert("Success Employee Add");
        initial();
        // Reload the current page
        window.location.reload();

        console.log("SSSDDDFFF")
    }, function(xhr, status, error) {
        console.error('Error:', error);
    });


}

mountForm = ()=>{
     employee = {}; // Define an empty object
     oldemployee = null;

     txtEmp.value = "";
     txtempName.value = "";
     txtNIC.value = "";
     txtPhone.value = "";

     txtEmp.style.border = initialcolor;
     txtempName.style.border = initialcolor;
     txtNIC.style.border = initialcolor;
     txtPhone.style.border = initialcolor;
     textDesignation.style.border = initialcolor;
    // populateSelectField(designationList, '#textDesignation','Select the Designation','name','');


}

// Function to fill form fields with row data for updating
function fillFormFields(obj) {

    rowData = JSON.parse(JSON.stringify(obj));
    oldemployee = JSON.parse(JSON.stringify(obj));

    txtEmp.value = rowData.empcode;
    txtEmp.style.border = validcolor;

    txtempName.value = rowData.empname;
    txtempName.style.border = validcolor;

    txtNIC.value = rowData.nic;
    txtNIC.style.border = validcolor;

    txtPhone.value = rowData.phone;
    txtPhone.style.border = validcolor;

    const designationVal = JSON.stringify(rowData.designation_id.name);
    console.log(designationVal)
    console.log(designationList)
    populateSelectField(designationList, '#textDesignation','Select the Designation','name','Librarian');
    // Here you can implement logic to fill form fields with rowData
    // For example, if you have input fields with IDs corresponding to column names,
    // you can set their values like this:
    // document.getElementById('fieldName').value = rowData['fieldName'];
}

clearEmployee = ()=>{

    if( confirm("Are you sure clear this form ?")){
        initial();
       //mountForm();
    }

}
updateEmployee =() =>{

    var updateData = rowData;
    console.log("EMP OLD ",oldemployee)
    console.log("EMP NEW ",employee)

    employee.id = oldemployee.id;
    employee.empcode = txtEmp.value;
    if(!(employee.empname)){
        employee.empname = txtempName.value;
    }
    if(!(employee.nic)){
        employee.nic = txtNIC.value;
    }
    if(!(employee.phone)){
        employee.phone = txtPhone.value;
    }
    if(!(employee.designation_id)){
        employee.designation_id = JSON.parse(textDesignation.value);
    }
    console.log("EMP NEW AFTER ",employee)
   // rowData.empcode =   txtEmp.value
   //
   //  txtempName.value = rowData.empname;
   //  txtempName.style.border = validcolor;
   //
   //  txtNIC.value = rowData.nic;
   //  txtNIC.style.border = validcolor;
   //
   //  txtPhone.value = rowData.phone;
   //  txtPhone.style.border = validcolor;
   //
   //  const designationVal = JSON.stringify(rowData.designation_id.name);
   //  console.log(designationVal)
   //  console.log(designationList)

    //
    ajaxRequest('http://localhost:8080/employee', 'PUT', employee, function(response) {
        console.log('Success:', response);
        alert("Record Updated Successfully");
        initial();
        // Reload the current page
        window.location.reload();

        console.log("SSSDDDFFF")
    }, function(xhr, status, error) {
        console.error('Error:', error);
    });


}