const initial = () => {
    mountForm();

 ajaxRequest('http://localhost:8080/designation/list', 'GET', null,
     function(designation) {
      console.log('Designation:', designation);
      populateSelectField(designation, '#textDesignation','name','');
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
    //
    // ajaxRequest('https://example.com/api/resource', 'POST', postData, function(response) {
    //     console.log('Success:', response);
    // }, function(xhr, status, error) {
    //     console.error('Error:', error);
    // });

}


mountForm = ()=>{

    // employee = new Object();
    // oldemployee = null;
     employee = {}; // Define an empty object
    console.log("ASELA 345");


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