
import { cartArray, DisplayCartArrayList, updateCartBagdeNum } from "../../assets/js/testing.js";
import {basketShopingItemTemplate, basketItemHtmlTemplate } from "../../assets/js/template.js"
import sendToWhatsApp from "../../assets/js/testing.js"
import { 
        basketDisplayList, 
        dropdownContainerBasket, 
        addbasketItemBtn,
        basketSection,
        productDisplaySection,
        productSectionContainer,
        productDetailsSection,
        footerContainer,
        dropdownContainer,
        basketBadge,
        viewMoreBasketLists,
        basketlistNumOfAQty,
        basketListContainer,
        viewMoreBasketListsCont,
        basketCheckoutDetailsDivTotalAmt,
        basketCheckoutDetailsDivQty,
        basketCheckoutDetailsDivDiscount,
        basketCheckoutMsgPrice,
        basketSectionCloseIcon,
        basketCheckoutMsgBtn
} 
    from "../../assets/js/dom.js"




document.addEventListener('DOMContentLoaded', function() {
    basketDisplayList.addEventListener("click", displayBasketPopUp)
    addbasketItemBtn.addEventListener("click", addBasketList)
    basketSectionCloseIcon.addEventListener("click", hideBasketPage)
    basketCheckoutMsgBtn.addEventListener("click", createMsgTemplateDraft.bind(this))
  
    updateBasketBadgeNum()
})

let basketArray = []



//Display Basket PopUp
function displayBasketPopUp(){
    dropdownContainerBasket.classList.toggle("hidden")
    dropdownContainer.classList.add("hidden")
    displayBasketList()
}

// close cart PopUp and And Open  BasketPopUp
function closeAndOpenPopUp(){
    dropdownContainerBasket.classList.toggle("hidden")
    dropdownContainer.classList.toggle("hidden")
}

function updateBasketBadgeNum(){
      // Display Cart Number when page loads
      let cartData = JSON.parse(localStorage.getItem("basket"))

      basketArray = cartData?.length > 0 ? cartData : []
      
  if(basketArray?.length > 0){
          basketBadge.classList.remove("hidden")
          basketBadge.textContent = +basketArray.length
      }
  if(!(basketArray?.length > 0)){
          basketBadge.classList.add("hidden")
          basketBadge.classList.add("hidden")
          DisplayCartArrayList()
      }

}

// ///////////// DELETE BASKET SHOPPING LIST ITEM ////////////////
function DeleteBasketShoppingList(e){
   let id = +e.target.getAttribute('data-id')

   let newBasketList = basketArray.filter(el => el.id != id && el)
   
   basketArray = newBasketList

       // Update Id
basketArray.forEach((el,i) => {
        el.id = i
        return el
} )


   localStorage.setItem("basket", JSON.stringify(basketArray))
   
   displayBasketList()
   updateBasketBadgeNum()
}
 
// ///////////// DELETE BASKETLIST ITEM ////////////////
function deleteBasketList(e){
    let id = +e.target.getAttribute("data-id")
    let basketObjId =  +e.target.getAttribute("data-info")
    
    let basketObj = basketArray.find(el => el.id == basketObjId && el)
    
    let newbasketList = basketObj.basketList.filter(el => !(el.id == id) && el)

    basketObj.basketList = newbasketList
    localStorage.setItem("basket", JSON.stringify(basketArray))

    updateListDetails(newbasketList, basketObjId)
    
}



function updatePageDetails(data, id){
    basketlistNumOfAQty.innerText = `${data.basketList.length} Items`
    basketCheckoutDetailsDivTotalAmt.innerText = `${data.totalAmt}`
    basketCheckoutDetailsDivQty.innerText = data.basketList.length
    basketCheckoutDetailsDivDiscount.innerText = data.discount
    basketCheckoutMsgPrice.innerText = data.totalAmt
  
    // Update List 
    updateListDetails(data.basketList, id)
}


// Update Basket List Details
function updateListDetails(basketItemData, id){


    let newBasketList =   basketItemData.map((el,i) => {
        el.id = i
        let replaceHtmlTemplate =  basketItemHtmlTemplate
                        .replace(/{%PRICE%}/g, el.price)
                        .replace(/{%ID%}/g, i)
                        .replace(/{%TYPE%}/g, el.type)
                        .replace(/{%NAME%}/g, el.name)
                        
            
        return replaceHtmlTemplate
    }).join(" ")

    basketListContainer.innerHTML = newBasketList

    // Check basket Array length to no know when to display "more items"
    basketItemData.length <= 3 ? 
     viewMoreBasketLists.classList.add("hidden"):
     viewMoreBasketLists.classList.toggle("hidden")

     let closebtnsArr = [...document.querySelectorAll(".basketItemDetailsClose")]
     closebtnsArr.forEach(el => el.addEventListener("click", deleteBasketList.bind(this)))
     closebtnsArr.forEach(el => el.setAttribute("data-info", id))
     basketCheckoutMsgBtn.setAttribute("data-info", id)
}



// Display Basket Page
function DisplayBasketPage(e){
    if(!(e.target.tagName === "LI" || e.target.tagName === "STRONG")) return

    let id = +e.target.getAttribute("data-id")
    
    let basketItem = basketArray.find((el,i) => i === id && el )

    updatePageDetails(basketItem, id)
    showBasketPage()
}



// Add BasketList 
function addBasketList(){

    let numOfItem = cartArray.length
    let totalAmt = +cartArray.reduce((sum, item)=> sum + +item.price , 0).toFixed(2)
    
     cartArray.forEach((el,i) => {
                el.id = i
                return el
        } )


    let basketObj = {
        id:   basketArray.length,
        numOfItem: numOfItem,
        totalAmt: `₦${totalAmt}`,
        discount: 0,
        basketList: cartArray
    }


    basketArray.push(basketObj)
    

    localStorage.setItem("basket", JSON.stringify(basketArray))


    // close and open cart and basket popup
    closeAndOpenPopUp()

    // Display basket array list
    displayBasketList()

    // Reset cart arrya local storage value
    let newCartArr = []
    localStorage.setItem("cartArray", JSON.stringify(newCartArr))

    // update cartBadge number
    updateCartBagdeNum()

 // update BasketBadge number
    updateBasketBadgeNum()

    // Display cart array list
    DisplayCartArrayList()

}


// Display Basket List
function displayBasketList(){

    let newBasketList =  basketArray.map((el,i) => {
        let replaceHtmlTemplate =  basketShopingItemTemplate
                        .replace(/{%PRICE%}/g, el.totalAmt)
                        .replace(/{%ID%}/g, i)
            
        return replaceHtmlTemplate
    }).join(" ")


    dropdownContainerBasket.innerHTML = basketArray.length > 0 ? newBasketList : ` <li>No Basket Avialable</li>`

    let basketListItem = [...document.querySelectorAll(".dropdownContainerBasketListItem")]
    let trashBtn = [...document.querySelectorAll(".trashCart")]

    basketListItem?.forEach(el => el.addEventListener("click", DisplayBasketPage.bind(this)))
    trashBtn?.forEach(el => el.addEventListener("click", DeleteBasketShoppingList.bind(this)))
}


function showBasketPage(){

        basketSection.classList.remove("hidden")

        productSectionContainer.classList.add("hidden")
        document.querySelector(".mainContainer")?.classList.add("hidden")
        footerContainer.classList.add("hidden")
        productDetailsSection.classList.add("hidden")
        productDisplaySection.style.display = "none"
        displayBasketPopUp()
}


function hideBasketPage(){

    basketSection.classList.add("hidden")
    document.querySelector(".mainContainer")?.classList.remove("hidden")
    productSectionContainer.classList.remove("hidden")
    productDisplaySection.style.display = "block"
    footerContainer.classList.remove("hidden")
}
    

function createMsgTemplateDraft(e){
    let id = +e.target.getAttribute("data-id")
    
    let basketItem = basketArray.find((el,i) => i === id && el )
    let totalAmt = +basketItem.basketList.reduce((sum, item)=> sum + +item.price , 0).toFixed(2)
   
    // let  message = `Hello there, I  want to buy ${basketItem.basketList.length} Items, Total amount:₦${totalAmt}:`
    let msgArr = [`Hello there, I  want to buy ${basketItem.basketList.length} Items, Total amount:₦${totalAmt}:\n\n`]

    basketItem.basketList.forEach((item ,i)=> {
        let template = `Item ${i + 1}\nName: ${item.name}\nPrice: ₦${item.price}\nImage: ${item.productImageSrc[0]}\n\n`;
        msgArr.push(template);
     })


    let  message = msgArr.join("")

    sendToWhatsApp(message)
}