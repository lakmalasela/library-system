const initial = () => {

    //member
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

//books
 ajaxRequest('http://localhost:8080/book/bookininventory', 'GET', null,
     function(books) {
      console.log('Designation:', books);
         books.designationList = books;
      populateSelectField(books, '#textBook','Select the Book','name','');
     },
     function(xhr, status, error) {
      console.error('Error fetching designation:', error);
     },
     function() {
      console.log('Ajax request completed');
     }
 );

 //employee
    ajaxRequest('http://localhost:8080/employee/list', 'GET', null,
        function(employee) {
            console.log('Designation:', employee);

            populateSelectField(employee, '#textEmp','Select the Employee','empname','');
        },
        function(xhr, status, error) {
            console.error('Error fetching designation:', error);
        },
        function() {
            console.log('Ajax request completed');
        }
    );

 //table
    ajaxRequest('http://localhost:8080/bookissue/list', 'GET', null,
        function(bookissue) {
            console.log('Employee:', bookissue);
            var columnsToproperty = ['id', 'member_id.name', 'issuestatus_id.name'];
            var showColumns = ['ID','Member','Status']
            CreateTable(columnsToproperty,showColumns,bookissue,'bookissue');
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

addBookissue = () =>{

    var postData = bookissue;
    console.log("EMP ",bookissue)

    ajaxRequest('http://localhost:8080/bookissue', 'POST', bookissue, function(response) {
        console.log('Success:', response);
        alert("Book Issue Add Successfully");
        initial();
        // Reload the current page
        window.location.reload();

        console.log("SSSDDDFFF")
    }, function(xhr, status, error) {
        console.error('Error:', error);
    });


}

mountForm = ()=>{
    bookissue = {}; // Define an empty object
     oldbookissue = null;

     txtReturndate.value = "";
     txtIssuedate.value = "";
    // textAuthor.value = "";
    // txtPrice.value = "";
    // txtCount.value = "";
    //
    // txtBook.style.border = initialcolor;
    // txtbookName.style.border = initialcolor;
    // textAuthor.style.border = initialcolor;
    // txtPrice.style.border = initialcolor;
    // txtCount.style.border = initialcolor;
    textMember.style.border = initialcolor;
    textBook.style.border = initialcolor;
    textEmp.style.border = initialcolor;

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

    const designationVal = JSON.stringify(rowData.designation_id.name);
    console.log(designationVal)
    console.log(designationList)
    populateSelectField(designationList, '#textDesignation','Select the Designation','name','Librarian');


}

clearBookissue = ()=>{

    if( confirm("Are you sure clear this form ?")){
        initial();
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