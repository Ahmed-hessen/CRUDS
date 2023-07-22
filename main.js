let title=document.getElementById("title");
let price=document.getElementById("price");
let taxes=document.getElementById("taxes");
let ads=document.getElementById("ads");
let discount=document.getElementById("discount");
let total=document.getElementById("total");
let count=document.getElementById("count");
let category=document.getElementById("category");
let create=document.getElementById("create");
let tbody = document.getElementById("tbody");
let mood ="create";
let temp;


// 1-function to calculate the price 
function calculateTotal(){
    if (price.value !== ""){
        let result = (+price.value + +taxes.value + +ads.value)- +discount.value;
        total.innerHTML=result;
        total.style.background="lightgreen";
    }else {
        total.innerHTML="";
        total.style.background="red";
    }
}
// 2-function to create data 

if (localStorage.product != null){
    dataProduct = JSON.parse(localStorage.product);   
}else{
    dataProduct = [];
}

create.onclick = function (){
    let newProduct = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }
    if (mood ==="create"){
        if(newProduct.count > 1){
            for( i = 0 ; i< newProduct.count ;i++){
                dataProduct.push(newProduct);
            }
        }else {
            dataProduct.push(newProduct);
        }
    }else{
        dataProduct[temp]=newProduct; 
        mood="create";
        create.innerHTML="create"
        count.style.display="block"
    }

    localStorage.setItem("product",JSON.stringify(dataProduct))

    clearData();
    showData();
}

// 3- function clear data dynamic after create it 
function clearData(){
    title.value="";
    price.value="";
    taxes.value="";
    ads.value="";
    discount.value="";
    total.innerHTML="";
    count.value="";
    category.value="";
}
// Read data and put it in html 
function showData(){
    calculateTotal();
        let table ="";
        for(i = 0 ;i < dataProduct.length ; i++){
                table+=`
            <tr>
                <td>${i}</td>
                <td>${dataProduct[i].title}</td>
                <td>${dataProduct[i].price}</td>
                <td>${dataProduct[i].taxes}</td>
                <td>${dataProduct[i].ads}</td>
                <td>${dataProduct[i].discount}</td>
                <td>${dataProduct[i].total}</td>
                <td>${dataProduct[i].category}</td>
                <td><button onclick="updateData(${i})" id="update">update</button></td>
                <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
            </tr>
                `;
        }
            tbody.innerHTML=table;
            let deleteALLBtn=document.getElementById("deleteAllButton");
            if (dataProduct.length>0){
                deleteALLBtn.innerHTML=`<button onclick="deleteAll()">delete all (${dataProduct.length} ) </button>`
            }else{
                deleteALLBtn.innerHTML='';
            }
}
showData();
// 4- function delete one data 
function deleteData(i){
    dataProduct.splice(i,1);
    localStorage.product=JSON.stringify(dataProduct);
    showData();
}
// 5- function delete all data from page 
function deleteAll(){
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}
// 6- function update data 
function updateData(i) {
            title.value= dataProduct[i].title
            price.value= dataProduct[i].price
            taxes.value= dataProduct[i].taxes
            ads.value= dataProduct[i].ads
            discount.value=dataProduct[i].discount
            calculateTotal();
            category.value=dataProduct[i].category
            count.style.display="none";
            create.innerHTML="update";
            mood="update";
            temp=i;
            scroll({
                top:0,
                behavior:"smooth"
            })
}
// 7- function search 


let searchMood = "title";


function getSearchMood (id){
    let search =document.getElementById("search");
        if ( id==="searchTitle"){
            searchMood="title";
            search.placeholder="Search By Title";
        }else { 
            searchMood="category";
            search.placeholder="Search By Category";
        }
        search.focus();
        search.value="";
        showData();
} 

function searchData(value){
    let table =""; 
    if (searchMood=="title"){

        for (i=0 ; i<dataProduct.length; i++){
       
            if (dataProduct[i].title.includes(value.toLowerCase())){
                table+=`
                <tr>
                    <td>${i}</td>
                    <td>${dataProduct[i].title}</td>
                    <td>${dataProduct[i].price}</td>
                    <td>${dataProduct[i].taxes}</td>
                    <td>${dataProduct[i].ads}</td>
                    <td>${dataProduct[i].discount}</td>
                    <td>${dataProduct[i].total}</td>
                    <td>${dataProduct[i].category}</td>
                    <td><button onclick="updateData(${i})" id="update">update</button></td>
                    <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                </tr>`
            }
         }
        }else{
            for (i=0 ; i<dataProduct.length; i++){
       
                if (dataProduct[i].category.includes(value.toLowerCase())){
                    table+=`
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick="updateData(${i})" id="update">update</button></td>
                        <td><button id="delete" onclick="deleteData(${i})">delete</button></td>
                    </tr>`
                }
             }
    } tbody.innerHTML=table; 
}        
