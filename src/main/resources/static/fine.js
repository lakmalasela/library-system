const initial = () => {


 ajaxRequest('http://localhost:8080/member/list', 'GET', null,
     function(member) {
      memberList = member;
      populateSelectField(member, '#textMember','Select the Member','name','');
     },
     function(xhr, status, error) {
      console.error('Error fetching designation:', error);
     },
     function() {
      console.log('Ajax request completed');
     }
 );

 //table
    ajaxRequest('http://localhost:8080/fine/list', 'GET', null,
        function(fine) {
            console.log('Employee:', fine);
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

finecharge = () =>{
    console.log("sdsdsdsdsdsdsdsd ",JSON.parse(textMember.value).id)

    //bookid bind
    ajaxRequest('http://localhost:8080/bookissue/finebookissue?memberid='+JSON.parse(textMember.value).id, 'GET', null,
        function(bookissue) {

            console.log("BOOK ISSSUEEEE  ",bookissue)
            fine.bookissue_id = bookissue;
            textMember.style.border = validcolor;

        },
        function(xhr, status, error) {
            console.error('Error fetching designation:', error);
        },
        function() {
            console.log('Ajax request completed');
        }
    );



    //fine charge calculate
    ajaxRequest('http://localhost:8080/bookissue/finemember?memberid='+JSON.parse(textMember.value).id, 'GET', null,
        function(fineday) {
            finedayList = fineday;
            console.log("F FDAY ",fineday)
            if( fineday > 0){
                txtCharge.value = parseFloat((fineday * 300)).toFixed(2);
                fine.charge =  txtCharge.value;
                txtCharge.style.border = validcolor;
            }
        },
        function(xhr, status, error) {
            console.error('Error fetching designation:', error);
        },
        function() {
            console.log('Ajax request completed');
        }
    );



}

addFine = () =>{

    ajaxRequest('http://localhost:8080/fine', 'POST', fine, function(response) {
        console.log('Success:', response);
        alert("Success Fine Add");
        initial();
        // Reload the current page
        window.location.reload();

        console.log("SSSDDDFFF")
    }, function(xhr, status, error) {
        console.error('Error:', error);
    });


}

mountForm = ()=>{
     fine = {}; // Define an empty object
     oldfine= null;

     // txtEmp.value = "";
     // txtempName.value = "";
     // txtNIC.value = "";
     // txtPhone.value = "";
     //
     // txtEmp.style.border = initialcolor;
     // txtempName.style.border = initialcolor;
     // txtNIC.style.border = initialcolor;
     // txtPhone.style.border = initialcolor;
     // textDesignation.style.border = initialcolor;
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
       mountForm();
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