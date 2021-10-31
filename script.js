let listAccount = [];
let countAdmin = 1;
let countCustomer = 0;
let countFixer = 0;

const findAccount = (id)=>{
    var result;
    listAccount.forEach(e=>{
        if(e.accountID === id){
            result = e;
        }
    })
    return result;
}

const renderData=() =>{
    var html = "";

    listAccount.forEach(e=>{
        html+=`
        <tr class="${e.role === 'admin' ? 'd-none':""}">
            <td>${e.fullname}</td>
            <td>${e.email}</td>
            <td>${e.phone}</td>
            <td class="${e.role}">${e.role}</td>
            <td >
                    <i class="fa fa-info" aria-hidden="true" onclick="showDetail('${e.accountID}')"></i>
                    <i class="fa fa-pencil-square-o" aria-hidden="true" onclick="showEdit('${e.accountID}')"></i>
                    <i class="fa fa-trash-o" aria-hidden="true" onclick="deleteAcc('${e.accountID}')"></i>
            </td>
        </tr>
        `;
    });

    document.getElementById('tbody').innerHTML = html;
}

const updateProcess = ()=>{
    document.getElementById('customer').style.width = ((countCustomer / listAccount.length)*100)+"%"
    document.getElementById('admin').style.width = ((1 / listAccount.length)*100)+"%"
    document.getElementById('fixer').style.width = ((countFixer / listAccount.length)*100)+"%"
    document.getElementById('adminCount').innerHTML = "("+countAdmin+")"
    document.getElementById('fixerCount').innerHTML = "("+countFixer+")"
    document.getElementById('customerCount').innerHTML = "("+countCustomer+")"
    document.getElementById('allUserCount').innerHTML = "("+listAccount.length+")"

}

const init = ()=>{
    for(var i = 0; i < 10 ; i++){
        listAccount.push({
            accountID: "SE"+i,
            fullname: "Name"+i,
            email: "name"+i+"@gmail.com",
            address: "address"+i,
            phone: "0912381289",
            password: "password"+i,
            role: "Customer",
            description: "description"
        });
        countCustomer++;
    }

    for(var i = 10; i < 15 ; i++){
        listAccount.push({
            accountID: "SE"+i,
            fullname: "Name"+i,
            email: "name"+i+"@gmail.com",
            address: "address"+i,
            phone: "0912381289",
            password: "password"+i,
            role: "Fixer",
            description: "description"
        });
        countFixer++;
    }

    listAccount.push({
        accountID: "ADMIN",
        fullname: "Admin",
        email: "admin"+"@gmail.com",
        address: "address",
        phone: "0912381289",
        password: "123",
        role: "admin",
        description: "description"
    });
}

const renderDataForm=(data)=>{
    document.getElementById('fullname').value = data.fullname;
    document.getElementById('email').value = data.email;
    document.getElementById('address').value = data.address;
    document.getElementById('phone').value = data.phone;
    document.getElementById('password').value = data.password;
    document.getElementById('description').value = data.description;
    document.getElementById('role').value = data.role;
}

const showForm=()=>{
    document.getElementById('form').style.top= "0";
    document.getElementById('form-real').style.transform = "translateY(0%)";
}

const hideForm=()=>{
    document.getElementById('form').style.top= "100%";
    document.getElementById('form-real').style.transform = "translateY(200%)";
    document.getElementById('fullname').value = ""
    document.getElementById('email').value = "";
    document.getElementById('address').value = "";
    document.getElementById('phone').value = "";
    document.getElementById('password').value = "";
    document.getElementById('description').value = "";
    document.getElementById('role').value = ""
    updateProcess();
}

const showAdd=()=>{
    document.getElementById('button').style.display = "flex";
    document.getElementById('button').innerHTML = `<button id='update' onclick="add()">Add</button>`
    showForm();
    
}

const add=()=>{
    var obj = {};

    obj.fullname =document.getElementById('fullname').value
    obj.email= document.getElementById('email').value 
    obj.address = document.getElementById('address').value
    obj.phone = document.getElementById('phone').value 
    obj.password = document.getElementById('password').value
    obj.description = document.getElementById('description').value
    obj.role = document.getElementById('role').value

    listAccount.push(obj)
    swal("Notification", "Create successfully!", "success");
    hideForm();
    renderData();
    if(obj.role === "Fixer"){
        countFixer++;
    }else{
        countCustomer++;
    }
}

const showDetail=(id)=>{
    renderDataForm(findAccount(id));
    document.getElementById('button').style.display = "none";
    showForm();
}

const showEdit=(id)=>{
    renderDataForm(findAccount(id));
    document.getElementById('button').style.display = "flex";
    document.getElementById('button').innerHTML = `<button id='update' onclick="edit('${id}')">Update</button>`
    showForm();
}

const edit=(id)=>{
    var obj = findAccount(id);

    obj.fullname =document.getElementById('fullname').value
    obj.email= document.getElementById('email').value 
    obj.address = document.getElementById('address').value
    obj.phone = document.getElementById('phone').value 
    obj.password = document.getElementById('password').value
    obj.description = document.getElementById('description').value
    obj.role = document.getElementById('role').value
    swal("Notification", "Update successfully!", "success");
    renderData();
    hideForm();
}


const deleteAcc = (id)=>{
    var obj = findAccount(id);


    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            listAccount.splice(listAccount.indexOf(obj), 1);
            swal("Notification", "Delete successfully!", "success");
            renderData();
            
            if(obj.role === "Fixer"){
                countFixer--;
            }else{
                countCustomer--;
            }
            updateProcess();
        }
      });

}


init();
updateProcess();
renderData();
console.log(listAccount);