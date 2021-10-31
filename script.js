let listAccount = [];
let listFixer = [];
let listApproved = [];
let countAdmin = 1;
let countCustomer = 0;
let countFixer = 0;

const findAccount = (id, list)=>{
    var result;
    list.forEach(e=>{
        if(e.accountID === id){
            result = e;
        }
    })
    return result;
}

const renderData=(target, list, filter) =>{
    var html = "";

    list.forEach(e=>{
        if(e.role === 'Fixer' && e.status !== 'pending' && filter !== undefined){

        }else{
            html+=`
            <tr class="${e.role === 'admin' ? 'd-none':""}">
                <td>${e.fullname}</td>
                <td>${e.email}</td>
                <td>${e.phone}</td>
                <td class="${e.role}">${e.role}</td>
                ${e.role === 'Fixer'?`
                    <td class="${e.status === 'pending'?'text-warning':'text-success'}">${e.status}</td>
                `:''}
                ${e.role === 'Fixer' && e.status === 'pending'?`
                
                <td>
                    <button class="btn btn-success" onclick="approved('${e.accountID}')">Approve</button>
                    <button class="btn btn-danger" onclick="deleteAcc('${e.accountID}')">Deny</button>
                </td>
                `:`
                
                <td >
                        <i class="fa fa-info" aria-hidden="true" onclick="showDetail('${e.accountID}')"></i>
                        <i class="fa fa-pencil-square-o" aria-hidden="true" onclick="showEdit('${e.accountID}')"></i>
                        <i class="fa fa-trash-o" aria-hidden="true" onclick="deleteAcc('${e.accountID}')"></i>
                </td>
                `}
            </tr>
            `;
        }
        
    });

    document.getElementById(target).innerHTML = html;
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
            accountID: "CT"+i,
            fullname: "Name"+i,
            email: "name"+i+"@gmail.com",
            address: "address"+i,
            phone: "0912381289",
            password: "password"+i,
            role: "Customer"
        });
        countCustomer++;
    }

    for(var i = 0; i < 5 ; i++){
        listFixer.push({
            accountID: "FX"+i,
            fullname: "Name"+i,
            email: "name"+i+"@gmail.com",
            address: "address"+i,
            phone: "0912381289",
            password: "password"+i,
            role: "Fixer",
            description: "description",
            status: "pending"
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

const showAdd=(title)=>{
    document.getElementById('button').style.display = "flex";
    if(title === 'customer'){
        document.getElementById('des').style.display = "none";
    }else{
        document.getElementById('des').style.display = "block";
    }
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
    if(obj.role==='Fixer'){
        obj.status = 'approved'
        obj.accountID = 'SE'+ (listFixer.length + 1)
        listFixer.push(obj)
    }else{
        obj.accountID = 'SE'+ (listAccount.length + 1)
        listAccount.push(obj)
    }


    swal("Notification", "Create successfully!", "success");
    hideForm();
    if(obj.role === "Fixer"){
        renderData('tbody-fixer',listFixer);
    }else{
        renderData('tbody',listAccount);
    }
    if(obj.role === "Fixer"){
        countFixer++;
    }else{
        countCustomer++;
    }
}

const showDetail=(id)=>{
    var obj = findAccount(id,listAccount);
    if(!obj){
        obj= findAccount(id,listFixer);
    }
    renderDataForm(obj);
    document.getElementById('button').style.display = "none";
    if(obj.role === "Customer"){
        document.getElementById('des').style.display = "none";
    }else{
        document.getElementById('des').style.display = "block";
    }
    showForm();
}

const showEdit=(id)=>{
    var obj = findAccount(id,listAccount);
    if(!obj){
        obj= findAccount(id,listFixer);
    }
    renderDataForm(obj);
    if(obj.role === "Customer"){
        document.getElementById('des').style.display = "none";
    }else{
        document.getElementById('des').style.display = "block";
    }
    document.getElementById('button').style.display = "flex";
    document.getElementById('button').innerHTML = `<button id='update' onclick="edit('${id}')">Update</button>`
    showForm();
}

const edit=(id)=>{
    var obj = findAccount(id,listAccount);
    if(!obj){
        obj= findAccount(id,listFixer);
    }

    obj.fullname =document.getElementById('fullname').value
    obj.email= document.getElementById('email').value 
    obj.address = document.getElementById('address').value
    obj.phone = document.getElementById('phone').value 
    obj.password = document.getElementById('password').value
    obj.description = document.getElementById('description').value
    obj.role = document.getElementById('role').value
    swal("Notification", "Update successfully!", "success");
    if(obj.role === "Fixer"){
        renderData('tbody-fixer',listFixer);
    }else{
        renderData('tbody',listAccount);
    }
    hideForm();
}


const deleteAcc = (id)=>{
    var obj = findAccount(id,listAccount);
    if(!obj){
        obj= findAccount(id,listFixer);
    }

    swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
            
            swal("Notification", "Delete successfully!", "success");
            
            if(obj.role === "Fixer"){
                listFixer.splice(listFixer.indexOf(obj), 1);
                countFixer--;
                renderData('tbody-fixer',listFixer);
                console.log(listFixer.length);
            }else{
                listAccount.splice(listAccount.indexOf(obj), 1);
                countCustomer--;
                renderData('tbody',listAccount);
            }
            updateProcess();
        }
      });

}

const showTab=(item, tab)=>{
    var list = document.getElementsByClassName('active')
    var listTab = document.getElementsByClassName('tab')
    list[0].classList.remove('active');
    document.getElementById(item).classList.add("active");

   for (let i = 0; i < listTab.length; i++) {
       const element = listTab[i];
       element.classList.add('d-none')
   }
    document.getElementById(tab).classList.remove("d-none");
}

const approved=(id)=>{
    var obj = findAccount(id,listFixer);
    obj.status = 'approved';
    renderData('tbody-fixer',listFixer);
}


init();
updateProcess();
renderData('tbody',listAccount);
renderData('tbody-fixer',listFixer,'pending');
console.log(listAccount);