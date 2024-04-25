const initial = () => {

 //
 // ajaxRequest('http://localhost:8080/designation/list', 'GET', null,
 //     function(designation) {
 //      console.log('Designation:', designation);
 //      designationList = designation;
 //      populateSelectField(designation, '#textDesignation','Select the Designation','name','');
 //     },
 //     function(xhr, status, error) {
 //      console.error('Error fetching designation:', error);
 //     },
 //     function() {
 //      console.log('Ajax request completed');
 //     }
 // );

 //table
    ajaxRequest('http://localhost:8080/book/list', 'GET', null,
        function(book) {
            console.log('Employee:', book);
            var columnsToproperty = ['id', 'name', 'author'];
            var showColumns = ['ID','Name','Author']
            CreateTable(columnsToproperty,showColumns,book,'book');
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

addBook = () =>{

    var postData = book;
    console.log("EMP ",book)

    ajaxRequest('http://localhost:8080/book', 'POST', book, function(response) {
        console.log('Success:', response);
        alert("Book Add Successfully");
        initial();
        // Reload the current page
        window.location.reload();

        console.log("SSSDDDFFF")
    }, function(xhr, status, error) {
        console.error('Error:', error);
    });


}

mountForm = ()=>{
    book = {}; // Define an empty object
     oldbook = null;

    txtBook.value = "";
    txtbookName.value = "";
    textAuthor.value = "";
    txtPrice.value = "";
    txtCount.value = "";

    txtBook.style.border = initialcolor;
    txtbookName.style.border = initialcolor;
    textAuthor.style.border = initialcolor;
    txtPrice.style.border = initialcolor;
    txtCount.style.border = initialcolor;

    // populateSelectField(designationList, '#textDesignation','Select the Designation','name','');


}

// Function to fill form fields with row data for updating
function fillFormFields(obj) {

    rowData = JSON.parse(JSON.stringify(obj));
    oldbook = JSON.parse(JSON.stringify(obj));

    txtBook.value = rowData.regno;
    txtBook.style.border = validcolor

    txtbookName.value = rowData.name;
    txtbookName.style.border = validcolor;

    textAuthor.value = rowData.author;
    textAuthor.style.border = validcolor;

    txtPrice.value = rowData.price;
    txtPrice.style.border = validcolor;

    txtCount.value = rowData.bookcount;
    txtCount.style.border = validcolor;



}

clearBook = ()=>{

    if( confirm("Are you sure clear this form ?")){
       mountForm();
    }

}
updateBook =() =>{

    var updateData = rowData;
    console.log("EMP OLD ",book)


    book.id = oldbook.id;
    book.regno = txtBook.value;
    if(!(book.name)){
        book.name = txtbookName.value;
    }
    if(!(book.author)){
        book.author = textAuthor.value;
    }
    if(!(book.price)){
        book.price = txtPrice.value;
    }
    if(!(book.bookcount)){
        book.bookcount = txtCount.value;
    }


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
    ajaxRequest('http://localhost:8080/book', 'PUT', book, function(response) {
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