const initial = () => {
    mountForm();

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
            var columnsToShow = ['id', 'empname', 'empcode'];
            CreateTable(columnsToShow,employee);
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

addEmployee = () =>{

    var postData = employee;
    console.log("EMP ",employee)

    ajaxRequest('http://localhost:8080/employee', 'POST', employee, function(response) {
        console.log('Success:', response);
        alert("Success Employee Add")
    }, function(xhr, status, error) {
        console.error('Error:', error);
    });


}


mountForm = ()=>{

    // employee = new Object();
    // oldemployee = null;
     employee = {}; // Define an empty object
     oldobj = null;

     txtEmp.value = "";
     txtempName.value = "";
     txtNIC.value = "";
     txtPhone.value = "";




    // employee = {
    //     empname: "",
    //     empcode:"",
    //     designation_id:{
    //         id:null,
    //         name: ""
    //     },
    //     empstatus_id:{
    //         id: null,
    //         name: ""
    //     },
    //     nic:"",
    //     phone:""
    // };



}

// Function to fill form fields with row data for updating
function fillFormFields(obj) {

    rowData = JSON.parse(JSON.stringify(obj));
    oldobj = JSON.parse(JSON.stringify(obj));
    console.log("fill old ",oldobj)
    txtEmp.value = rowData.empcode;
    txtempName.value = rowData.empname;
    txtNIC.value = rowData.nic;
    txtPhone.value = rowData.phone;
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

}
updateEmployee =() =>{

}