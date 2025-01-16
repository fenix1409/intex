let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")
let elCategoryList = document.querySelector(".category-list")
let elPoolsList = document.querySelector(".pool-tbody")
let elUserLogo = document.querySelector(".user-logo")

let products = JSON.parse(localStorage.getItem("products")) || []
document.querySelector(".user-logo").textContent = JSON.parse(localStorage.getItem("user")).username

// Add part 
function handleAddProductBtnClick(){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = `
    <form class="add-product-form p-[41px]" autocomplete="off">
    <label class="block mb-[24px] cursor-pointer">
        <input type="file" class="add-choose-input hidden">
        <img class="add-choose-img mx-auto w-[500px] h-[300px] object-contain p-2 rounded-md" src="./images/emptyimkg.png" alt="Empty img" width="691" height="316">
    </label>
    <div class="flex justify-between">
        <div class="w-[49%] space-y-[13px]">
            <select name="category" class="outline-none py-[13px] rounded-md pl-2 border-[1px] border-slate-500 w-full cursor-pointer">
                <option value="1">Каркасные</option>
                <option value="2">Надувные</option>
            </select>
            <input type="number" class="outline-none py-3 rounded-md pl-2 border-[1px] border-slate-500 w-full cursor-pointer" required name="oldPrice" placeholder="Стартая цена (сум)">
            <select name="frame" class="outline-none py-[13px] rounded-md pl-2 border-[1px] border-slate-500 w-full cursor-pointer">
                <option value="1">Металлический</option>
                <option value="2">Прямоугольная</option>
                <option value="3">Рамка призмы</option>
            </select>
        </div>
        <div class="w-[49%] space-y-5">
            <input class="cursor-pointer outline-none py-[11.5px] rounded-md pl-2 border-[1px] border-slate-500 w-full" type="number" name="amount" placeholder="Количество">
            <input class="cursor-pointer outline-none py-[11.5px] rounded-md pl-2 border-[1px] border-slate-500 w-full" type="number" name="newPrice" placeholder="Цена со скидкой (сум)">
        </div>
    </div>
    <button class="w-[237px] mt-[33px] block mx-auto py-[6px] bg-[#3F8C8E] text-white text-[20px] text-center font-bold rounded-[25px]">Добавить</button>
    </form>
    
    `
    
    let elChooseInput = document.querySelector(".add-choose-input")
    let elChooseImg = document.querySelector(".add-choose-img")
    let elProductForm = document.querySelector(".add-product-form")
    
    elChooseInput.addEventListener("change", function(e){
        elChooseImg.src = URL.createObjectURL(e.target.files[0])
        elChooseImg.classList.add = "bg-white"
    })
    elProductForm.addEventListener("submit", function(e){
        e.preventDefault()
        const data = {
            id: products.length ? products[products.length - 1].id + 1 : 1,
            imgUrl: elChooseImg.src, 
            categoryId: e.target.category.value,
            oldPrice:e.target.oldPrice.value,
            frame:e.target.frame.value,
            amount:e.target.amount.value,
            newPrice:e.target.newPrice.value
        }
        e.target.lastElementChild.innerHTML = `
            <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="loading" width="35">
        `
        setTimeout(() => {
            e.target.lastElementChild.innerHTML = "Добавить"
            products.push(data)
            elModalWrapper.classList.add("scale-0")
            if(data.categoryId == "1"){
                elCategoryList.children[0].className = active
                elCategoryList.children[1].className = disabled
            }
            else if(data.categoryId == "2"){
                elCategoryList.children[0].className = disabled
                elCategoryList.children[1].className = active
            }
            renderPools(products, data.categoryId)
            localStorage.setItem("products", JSON.stringify(products))
        }, 1000);
    })
}

elModalWrapper.addEventListener("click", (e) => {
    if(e.target.id == "wrapper") {
        elModalWrapper.classList.add("scale-0")
        setTimeout(() => {
            elModalInner.className = "modal-inner w-[1000px] h-[700px] bg-slate-300 absolute top-0 bottom-0 right-0 left-0 m-auto rounded-md"        
        }, 500);
    }
})
// Add part 


const active = "font-bold text-[35px] leading-10 text-[#009398] border-b-[2px] border-[#009398] pb-2 cursor-pointer"
const disabled = "font-bold text-[35px] leading-10 text-[#A6A6A6] border-b-[2px] border-transparent pb-2 cursor-pointer"


// Category list change start 
elCategoryList.addEventListener("click", function(e){
    if(e.target.id == "1"){
        e.target.className = active
        e.target.nextElementSibling.className = disabled
        renderPools(products, "1")
    }
    else if(e.target.id == "2"){
        e.target.className = active
        e.target.previousElementSibling.className = disabled
        renderPools(products, "2")
    }
})
// Category list change start 




// render pools 
function renderPools(arr, categoryId){
    elPoolsList.innerHTML = null
    const filterArr = arr.filter(item => item.categoryId === categoryId)
    filterArr.forEach(item => {
        let elPoolsRaw = document.createElement("tr")
        elPoolsRaw.className = "bg-white"
        
        elPoolsRaw.innerHTML = `
                            <td class="py-[17px] rounded-tl-[30px] rounded-bl-[30px]">
                                <img class="mx-auto" src="${item.imgUrl}" alt="pool" width="110" height="41">
                            </td>
                            <td class="">
                                <div class="flex flex-col">
                                    <span class="text-[12px] leading-[13px] text-[#A6A6A6] line-through text-red-500">${item.oldPrice} сум</span>
                                    <strong class="">${item.newPrice} сум</strong>
                                </div>
                            </td>
                            <td>
                                <span class="text-[25px] leading-[35px]">${item.amount}</span>
                            </td>
                            <td>
                                <span class="text-[25px] leading-[35px]">
                                ${item.frame == "1" ? "Металлический" : ""}
                                ${item.frame == "2" ? "Прямоугольная" : ""}
                                ${item.frame == "3" ? "Рамка призмы" : ""}
                                </span>
                            </td>
                            <td>
                                <span class="text-[25px] leading-[35px]">
                                ${item.categoryId == "1" ? "Каркасные" : ""}
                                ${item.categoryId == "2" ? "Надувные" : ""}                                
                                </span>
                            </td>
                            <td class="rounded-tr-[30px] rounded-br-[30px]">
                                <div class="flex items-center gap-[18px]">
                                    <button onclick="handleEditCLickBtn(${item.id})" class="hover:scale-[1.5] duration-300">
                                        <img src="./images/edit.svg" alt="edit icon" width="22" height="22">
                                    </button>
                                    <button onclick="handleDeleteCLickBtn(${item.id})" class="hover:scale-[1.5] duration-300">
                                        <img src="./images/delete.svg" alt="delete icon" width="22" height="22">
                                    </button>
                                </div>
                            </td>
    `
        elPoolsList.appendChild(elPoolsRaw)
    });
}
renderPools(products, "1")
// render pools 




// Delete part 
function handleDeleteCLickBtn(id){    
    elModalWrapper.classList.remove("scale-0")
    elModalInner.classList.remove("w-[1000px]")
    elModalInner.classList.add("w-[500px]")
    elModalInner.classList.remove("h-[680px]")
    elModalInner.classList.add("h-[200px]")
    
    
    const deleteIndex = products.findIndex(item => item.id == id)
    elModalInner.innerHTML = `
    <div class="p-5">
       <h2 class="text-center text-[25px]">Are you sure delete</h2>
    <div class="flex items-center gap-[10px]">
        <button onclick="handleDeleteProductClickBtn(${id})" class="delete-btn w-[49%] mt-[33px] block mx-auto py-[6px] bg-red-500 text-white text-[20px] text-center font-bold rounded-[25px]">Delete</button>
        <button onclick="handleCancelClickBtn()" class="w-[49%] mt-[33px] block mx-auto py-[6px] bg-[#3F8C8E] text-white text-[20px] text-center font-bold rounded-[25px]">Cancel</button>
    </div>
    </div>
`
}
function handleCancelClickBtn(){
    elModalWrapper.classList.add("scale-0")
    setTimeout(() => {
        elModalInner.className = "modal-inner w-[1000px] h-[700px] bg-slate-300 absolute top-0 bottom-0 right-0 left-0 m-auto rounded-md"        
    }, 500);
}
function handleDeleteProductClickBtn(id){
    let elDeleteBtn = document.querySelector
    (".delete-btn")
    const deleteIndex = products.findIndex(item => item.id == id)
    const findedObj = products.find(item => item.id == id)
    
    elDeleteBtn.innerHTML = `
        <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="loading" width="35">
` 
    setTimeout(() => {
        handleCancelClickBtn()
        products.splice(deleteIndex, 1)
        renderPools(products, findedObj.categoryId)
        localStorage.setItem("products", JSON.stringify(products))
    }, 1000);
}
// Delete part 



// Edit part 
function handleEditCLickBtn(id){
    const findedObj = products.find(item => item.id == id)
    elModalWrapper.classList.remove("scale-0")
    elModalInner.innerHTML = `
    <form class="edit-product-form p-[41px]" autocomplete="off">
    <label class="block mb-[24px] cursor-pointer">
        <input type="file" class="edit-choose-input hidden">
        <img onerror="handleErrorImg()" class="edit-choose-img mx-auto w-[500px] h-[300px] object-contain p-2 rounded-md" src="${findedObj.imgUrl}" alt="Empty img" width="691" height="316">
        </label>
    <div class="flex justify-between">
        <div class="w-[49%] space-y-[13px]">
            <select name="category" class="outline-none py-[13px] rounded-md pl-2 border-[1px] border-slate-500 w-full cursor-pointer">
                <option ${findedObj.categoryId == "1" ? "selected" : ""} value="1">Каркасные</option>
                <option ${findedObj.categoryId == "2" ? "selected" : ""} value="2">Надувные</option>
            </select>
            <input value="${findedObj.categoryId}" type="number" class="outline-none py-3 rounded-md pl-2 border-[1px] border-slate-500 w-full cursor-pointer" required name="oldPrice" placeholder="Стартая цена (сум)">
            <select name="frame" class="outline-none py-[13px] rounded-md pl-2 border-[1px] border-slate-500 w-full cursor-pointer">
                <option ${findedObj.frame == "1" ? "selected" : ""} value="1">Металлический</option>
                <option ${findedObj.frame == "2" ? "selected" : ""} value="2">Прямоугольная</option>
                <option ${findedObj.frame == "3" ? "selected" : ""} value="3">Рамка призмы</option>
            </select>
        </div>
        <div class="w-[49%] space-y-5">
            <input value="${findedObj.amount}" class="cursor-pointer outline-none py-[11.5px] rounded-md pl-2 border-[1px] border-slate-500 w-full" type="number" name="amount" placeholder="Количество">
            <input value="${findedObj.newPrice}" class="cursor-pointer outline-none py-[11.5px] rounded-md pl-2 border-[1px] border-slate-500 w-full" type="number" name="newPrice" placeholder="Цена со скидкой (сум)">
        </div>
    </div>
    <button class="edit-btn w-[237px] mt-[33px] block mx-auto py-[6px] bg-green-500 text-white text-[20px] text-center font-bold rounded-[25px]">Edit</button>
    </form>
    
    `
    
    elEditForm = document.querySelector(".edit-product-form")
    let elEditChooeseInput = document.querySelector(".edit-choose-input")
    let elEditImg = document.querySelector(".edit-choose-img")
    
    elEditChooeseInput.addEventListener("change", function(e){
        elEditImg.src = URL.createObjectURL(e.target.files[0])
    })
    
    elEditForm.addEventListener("submit", function(e){
        e.preventDefault()
        let elEditBtn = document.querySelector(".edit-btn")
        elEditBtn.innerHTML = `
            <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="loading" width="35">        
    `
        
        setTimeout(() => {
            findedObj.imgUrl = elEditImg.src
            findedObj.categoryId = e.target.category.value
            findedObj.oldPrice = e.target.oldPrice.value
            findedObj.frame = e.target.frame.value
            findedObj.amount = e.target.amount.value
            findedObj.newPrice = e.target.newPrice.value
            
            
            
            if(e.target.category.value == "1"){
                elCategoryList.children[0].className = active
                elCategoryList.children[1].className = disabled
            }
            else if(e.target.category.value == "2"){
                elCategoryList.children[0].className = disabled
                elCategoryList.children[1].className = active
            }
            
            
            
            elModalWrapper.classList.add("scale-0")
            renderPools(products, e.category.value)
            localStorage.setItem("product", JSON.stringify(products))
        }, 1000);
    })
}
function handleErrorImg() {
    let elEditImg = document.querySelector(".edit-choose-img")
    elEditImg.src = "./images/emptyimkg.png"   
}

// Edit part 



// search part 
let elSearchInput = document.querySelector(".search-input")
elSearchInput.addEventListener("input", function(e){
    if(elCategoryList.children[0].className == active){
        const newPriceSearch = products.filter(item => item.newPrice.includes(e.target.value))
        renderPools(newPriceSearch, "1")
        elSearchInput.value = ""
    }
    if(elCategoryList.children[1].className == active){
        const newPriceSearch = products.filter(item => item.newPrice.includes(e.target.value))
        renderPools(newPriceSearch, "2")
        elSearchInput.value = ""
    }
})
// search part 





// logout part 
function handleLoginBtn(){
    elModalWrapper.classList.remove("scale-0")
    elModalInner.classList.remove("w-[1000px]")
    elModalInner.classList.add("w-[500px]")
    elModalInner.classList.remove("h-[680px]")
    elModalInner.classList.add("h-[200px]")
    
    
    elModalInner.innerHTML = `
    <div class="p-5">
       <h2 class="text-center text-[25px]">Are you sure logout?</h2>
    <div class="flex items-center gap-[10px]">
        <button onclick="handleLogoutClickBtn()" class="logout-btn w-[49%] mt-[33px] block mx-auto py-[6px] bg-red-500 text-white text-[20px] text-center font-bold rounded-[25px]">Logout</button>
        <button onclick="handleCancelClickBtn()" class="logout-btn w-[49%] mt-[33px] block mx-auto py-[6px] bg-[#3F8C8E] text-white text-[20px] text-center font-bold rounded-[25px]">Cancel</button>
    </div>
    </div>
`
}


function handleLogoutClickBtn(){
    let elLogout = document.querySelector(".logout-btn")
    elLogout.innerHTML = `
     <img class="mx-auto scale-[1.4]" src="./images/loading.png" alt="loading" width="35">
    `
    setTimeout(() => {
        localStorage.clear()
        sessionStorage.clear()
        location.pathname = "/"
    }, 1000);
}
// logout part 