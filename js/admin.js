let elModalWrapper = document.querySelector(".modal-wrapper")
let elModalInner = document.querySelector(".modal-inner")
let elCategoryList = document.querySelector(".category-list")
let elPoolsList = document.querySelector(".pool-tbody")


let products =[]


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
            renderPools(products)
        }, 1000);
    })
}

elModalWrapper.addEventListener("click", (e) => {
    if(e.target.id == "wrapper") elModalWrapper.classList.add("scale-0")
    })
// Add part 


const active = "font-bold text-[35px] leading-10 text-[#009398] border-b-[2px] border-[#009398] pb-2 cursor-pointer"
const disabled = "font-bold text-[35px] leading-10 text-[#A6A6A6] border-b-[2px] border-transparent pb-2 cursor-pointer"


// Category list change start 
elCategoryList.addEventListener("click", function(e){
    if(e.target.id == "1"){
        e.target.className = active
        e.target.nextElementSibling.className = disabled
    }
    else if(e.target.id == "2"){
        e.target.className = active
        e.target.previousElementSibling.className = disabled
    }
})
// Category list change start 




// render pools 
function renderPools(arr, id){
    elPoolsList.innerHTML = null
    // const filteredPools = arr.filter(item => item.categoryId = id)
    arr.forEach(item => {
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
                            <td class="rounded-tr-[30px] rounded-br-[30px]">
                                <div class="flex items-center gap-[18px]">
                                    <button>
                                        <img src="./images/edit.svg" alt="edit icon" width="22" height="22">
                                    </button>
                                    <button>
                                        <img src="./images/delete.svg" alt="delete icon" width="22" height="22">
                                    </button>
                                </div>
                            </td>
    `
    elPoolsList.appendChild(elPoolsRaw)
    });
}
// render pools 