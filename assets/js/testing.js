
import productDataJson from "../../data/data.js"
import productTrendDataJson  from "../../data/trendData.js"
import {
    productDetailsIMageHtml, 
    cartHtmlTemplate, 
    productLoaderHtml, 
    htmlTemplate,
    trendHtmlProductItem
} 
    from "../../assets/js/template.js"
import {
    filterListBtns, 
    productList, 
    productCard,
    productCardCloseBtn, 
    dropdownContainer, 
    cartContainer,
    productDisplaySection, 
    productDetailsSection,
    detailsIcon,
    imageListContainer,
    productDetailsBckBtn,
    cartIconBagde,
    homeLink,
    trendProductListContainer,
    trendproductItem,
    emptycart,
    totalpriceCart,
    totalpriceCartPrice,
    dropdownContainerList,
    contact,
    footer,
    btnwhatsapp,
    navbar,
    overlay,
    dropdownContainerBasket,
    basketSection,
} from "../../assets/js/dom.js"





let loadContent = productDataJson
let sortedArr = JSON.parse(localStorage.getItem("categorysortList")) || []
let sort = JSON.parse(localStorage.getItem("sort")) || false;
export let cartArray = []
let filterBtns = [...filterListBtns]
let  observeLastItem = true
let start = 0
let end = 8
let i = 0




const init = function(){
    sort ? 
    DisplayProductList(sortedArr)
    : 
    DisplayProductList(productDataJson)

  
    if(window.location.href.slice(-1) === "/"){
        DisplayTrendProductList(productTrendDataJson)
    }else if(window.location.pathname.split("/")[2] === "index.html"){
        DisplayTrendProductList(productTrendDataJson)
    }else if(window.location.href.slice(-1) === "#"){
        DisplayTrendProductList(productTrendDataJson)
    }

}
init()




document.addEventListener('DOMContentLoaded', function() {
    const productDetails = document.getElementById('productDetails');
    let exploreBtnLists = [...document.querySelectorAll('.exploreProduct')]

    setTimeout(() => {
        productDetails?.classList.add('slide-in');
    }, 100); // Add a slight delay to ensure smooth transition

    filterBtns.forEach(el => el.addEventListener("click", sortProducts.bind(this)))
    productCardCloseBtn?.addEventListener("click", closeProductCard.bind(this))
    document.querySelector(".btnAddCart")?.addEventListener("click",  AddToCart.bind(this))
    document.querySelector(".cartbtndisplay")?.addEventListener("click", displayCartPopUp)
    exploreBtnLists?.map(el=> el.addEventListener("click",exploreProductFunc.bind(this)));
    contact.addEventListener("click", scrollFooter.bind(this))
    btnwhatsapp.addEventListener('click', HandleWhatsappMessage.bind(this))
    updateCartBagdeNum()
});


function scrollFooter(){
    footer.scrollIntoView({
        behavior: "smooth"
    })
}








const observer = new IntersectionObserver(entries =>{

    entries.forEach(entry=>{
        entry.isIntersecting ? loadMoreContent() : ""

        observer.unobserve(entry.target)

        observeLastItem &&
        observer.observe(productList.children[productList.children.length - 1])
    })
},
{
    threshold: 0.8
})


observer.observe(productList.children[productList.children.length - 1])


// Load more content
const loadMoreContent = function(){
    if(productDataJson.length === end) {
        observeLastItem = false
        return
    }

    // start = end
    end = (productDataJson.length/end) * end

    displayLoader()
    
    setTimeout(()=>{
        DisplayProductList(loadContent)
    },2000)
}


// Display Loading of content
 function displayLoader(){
   let arr = [1,2,3,4]
    const newProductList = arr.map(el => {
                return productLoaderHtml
        }).join(" ")
productList.insertAdjacentHTML("beforeend", newProductList) 

}


function DisplayTrendProductList(DisplayArr){
    let newProductList =  DisplayArr.map(el => {
   
            let replaceHtmlTemplate = trendHtmlProductItem.replace(/{%Name%}/g, el.name)
                                        .replace(/{%ID%}/g, el.id)
                                        .replace(/{%current%}/g, el.current)
            

                    return replaceHtmlTemplate
            }).join(" ");
    
    trendProductListContainer.innerHTML = newProductList
            

    let trendproductItem = [...trendProductListContainer.querySelectorAll(".product-item")]


    trendproductItem.forEach(el => el.addEventListener("click", handleProductClick.bind(this)))
}


function DisplayProductList(DisplayArr){
    // logic for which array get displayed more
    loadContent = DisplayArr.length === productDataJson.length ? DisplayArr: sortedArr
    
    let newArr = DisplayArr.filter((value, index) => {
        if (index  >= start && index <= end ) {return value}
    })
    
    
    let newProductList =  newArr.map(el => {
        
        let replaceHtmlTemplate =  htmlTemplate.replace(/{%Name%}/g, el.name).replace(/{%ID%}/g, el.id)
        return replaceHtmlTemplate
    }).join(" ");
    

    displayLoader()

    setTimeout(() => {
            productList.innerHTML = newProductList
            
        let productItemList = [...productList.querySelectorAll(".product-item")]
        

        productItemList.forEach(el => el.addEventListener("click", handleProductClick.bind(this)))
    },2000)
   
}


// Sort Product list display
const sortProducts = function(e){
    let subCategory = e.target.getAttribute("data-set")

    let listArr = [...e.target.parentElement.parentElement.children]
    listArr.forEach(el => {
        el.children[0].classList.remove("active")
    })


    e.target.classList.add("active")

    if(subCategory === 'All'){
        DisplayProductList(productDataJson)
        return
    }

   const subCategoryList =  productDataJson.filter(el => {
        return el ? el.subCategory === subCategory : ""
    })

    sortedArr = []
    sortedArr.push(...subCategoryList)
    

    DisplayProductList(sortedArr)
}


// move Product Image
const  moveProductImage = function(data, e){

    let imageUrl = data.productImageSrc

    if(e.target.className.includes("next")){

        if(!(i <= imageUrl.length)) return

        i === (imageUrl.length - 1) ? i = 0 : i++

        imageUrl = data.productImageSrc[i]
    productCard.querySelector(".productCardImg").style.backgroundImage = `url('${imageUrl}')`;

    }

    if(e.target.className.includes("prev")){

        if(!(i >= 0)) return

        i === 0 ? i = imageUrl.length - 1 : i--

        imageUrl = data.productImageSrc[i]
        productCard.querySelector(".productCardImg").style.backgroundImage = `url('${imageUrl}')`;
    }

}


const updateProductCard = function(data){
    let imageUrl = data.productImageSrc
   
    if(imageUrl.length == 1){
        productCard.querySelectorAll(".moveImg").forEach(el => el.classList.add("hidden"))
    }

    if(imageUrl.length > 1){
        imageUrl = data.productImageSrc[0]
        productCard.querySelectorAll(".moveImg").forEach(el=> el.classList.remove("hidden"))
        productCard.querySelectorAll(".moveImg").forEach(el=> {
            el.addEventListener("click", moveProductImage.bind(this, data))})
    }


    productCard.querySelector(".productCardImg").style.backgroundImage = `url('${imageUrl}')`;
    productCard.querySelector(".productPrice").innerText = data.price
    productCard.querySelector(".productTitle-h3").innerText = data.name
    productCard.querySelector(".productDescrip").innerText = data.description
    productCard.querySelector('.btnAddCart').classList.add(`${data.id}`)
    btnwhatsapp.setAttribute("data-info",data.id)
}


// Display Product Card
function handleProductClick(e) {
    if(!(e.target.localName === "img" || e.target.localName === "a" || e.target.localName === "div" )) return
    
    productCard?.classList.remove("hidden")

    let id = +e.target.getAttribute("data-set")
    let info = e.target.getAttribute("data-info")

    

   let productData = (info === "trend" ? productTrendDataJson : productDataJson).find(el => el.id === id)
   
   updateProductCard(productData)
}



// Close Product Card
function closeProductCard (e){
    if(e.target.tagName === "ION-ICON" || e.target.tagName === "SPAN"){
        document.getElementById("productCard").classList.add("hidden")
    }
}


// /Updates the number  in the cart array list
// const updateNumberCartItem = function(e){
  
//     if(!(e.target.className.includes("subBtn") || e.target.className.includes("addBtn"))) return

//     let id = +e.target.parentElement.className.slice(-1)

//     let cartData = cartArray.find(el => el.id === id && el);

//     let value = cartData.numOfCartAdded

//     if(e.target.className.includes("subBtn")){
//         value == 1 ? "" : value--
//         cartData.numOfCartAdded = value
//     }

//     if(e.target.className.includes("addBtn")){
//         value++
//         cartData.numOfCartAdded = value
//     }

//     DisplayCartArrayList()
// }



// ///////////////// CARTCODE SECTION ////////////////////////////////////////////////////
// Add Product to cart
function AddToCart(e){
    dropdownContainer.classList.remove("hidden")
    productCard.classList.add('hidden')
    emptycart.classList.add('hidden')
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");

    let Item = +e.target.className.slice(-1)

   let cartItem = productDataJson.find(el => el.id === Item && el)


    cartItem.numOfCartAdded = 1
    cartArray.push(cartItem)
    // Store cart to local storage
   

    // Set Updated Cart Array to Local storage
    localStorage.setItem("cartArray", JSON.stringify(cartArray))
    
    DisplayCartArrayList()
    cartIconBagde.classList.remove("hidden")
    cartIconBagde.innerText = +cartArray.length
    productCard.querySelector('.btnAddCart').classList.remove(`${e.target.className.slice(-1)}`)
    productCard.classList.add("hidden")

   if( window.innerWidth <= 768){
    navbar.classList.toggle("active");
    overlay.classList.toggle("active");
   }

}



// Displays Cart Array Lists
export const DisplayCartArrayList = function(){ 
    let newCartList =  cartArray.map(el => {
        
        let replaceHtmlTemplate =  cartHtmlTemplate.replace(/{%CARTNUM%}/g, el.numOfCartAdded)
            .replace(/{%ID%}/g, el.id)
            .replace(/{%PRICE%}/g, el.price)
            .replace(/{%NAME%}/g, el.name)
            .replace(/{%IMAGEURL%}/g, el.productImageSrc[0])
            
        return replaceHtmlTemplate
    }).join(" ")

    let totalPrice = cartArray.reduce((sum,item)=> sum + +item.price, 0).toFixed(2)
    totalpriceCartPrice.textContent = `₦${totalPrice}`

    dropdownContainerList.innerHTML = cartArray.length > 0 ? newCartList : `<p>No Items here. Add to Cart</p>`
    document.querySelectorAll(".addSubItemContainer").forEach(el => el.addEventListener("click", updateNumberCartItem.bind(this)));
    document.querySelectorAll(".trashCart").forEach(el => el.addEventListener("click", deleteCart.bind(this)));
    [...dropdownContainer.children].forEach(el => el.addEventListener("click", showCartListDetails.bind(this)))
    localStorage.setItem("cartArray", JSON.stringify(cartArray))
}


// Display/Show the cart product details page
const showCartListDetails = function(e){
    if(e.target.className.includes("Btn") || e.target.className.includes("trash")) return

    let id = +e.target.getAttribute("data-id")
    let product = productDataJson.find(el => el.id === id && el)

    let detailsImages = product.productImageSrc.map((el, i) => {
        let replaceHtmlTemplate =  productDetailsIMageHtml.replace(/{%IMAGEURL%}/g, el).replace(/{%ID%}/g, i)
        return replaceHtmlTemplate
    }).join(" ")


    imageListContainer.innerHTML = detailsImages
    document.querySelector(".div-sub-images-container").setAttribute("data-id", id)
    document.querySelector(".productDisplayImage").src = product.productImageSrc[0]
    productDetailsBckBtn.addEventListener("click", closeProductSection)
    document.querySelector(".div-1-details-backIcon").addEventListener("click", nextImageDetailsList)
   if( product?.productImageSrc.length <= 5)  detailsIcon.style.display = "none"

   document.querySelector(".mainContainer")?.classList.add("hidden")
   document.querySelector(".orderProduct").setAttribute("data-id", id)
   document.querySelector(".div-3-details-content-name").innerText = product.name
   document.querySelector(".div-3-details-content-price").innerText = `₦${product.price}`
   document.querySelector(".div-3-details-content-descrip").innerText = product.description
   document.querySelector(".div-3-details-content-2-p").innerText = product.description
   document.querySelector(".orderProduct").addEventListener("click", handleOrderCartDetails.bind(this))

    productDisplaySection.style.display = "none"
    productDetailsSection.classList.remove("hidden")
    dropdownContainer.classList.toggle("hidden")
    basketSection.classList.add("hidden")
}

// Update badge cart
export function updateCartBagdeNum (){
    // Display Cart Number when page loads
    let cartData = JSON.parse(localStorage.getItem("cartArray"))

            cartArray = cartData?.length > 0 ? cartData : []
            
        if(cartArray?.length > 0){
                cartIconBagde.classList.remove("hidden")
                cartIconBagde.innerText = +cartArray.length
            }
        if(!(cartArray?.length > 0)){
                cartIconBagde.classList.add("hidden")
                cartIconBagde.classList.add("hidden")
                DisplayCartArrayList()
            }

}



// Delete cart Array list
const deleteCart = function(e){
    let id = +e.target.className.match(/\d+/)[0]
    let newCartArr = cartArray.filter(el => el.id !== id && el);

    cartArray = newCartArr

    DisplayCartArrayList()
    // chk if cartArr has no item left
    if(+cartArray.length === 0 ){
        cartIconBagde.classList.add("hidden")
    }

    // update badge number
    cartIconBagde.innerText = +cartArray.length
    
}


// Display PopUp for cart
const displayCartPopUp = function(){
    dropdownContainer.classList.toggle("hidden")
    dropdownContainerBasket.classList.add("hidden")
    DisplayCartArrayList()
}

// close product details page
const closeProductSection = function(){
    productDisplaySection.style.display = "block"
    productDetailsSection.classList.add("hidden")
    document.querySelector(".mainContainer").classList.remove("hidden")
}

// Next Image on details list
const nextImageDetailsList = function(){
    let imageHeight = imageListContainer.children[0].offsetHeight + 12
  
  imageListContainer.scrollBy({
      top: imageHeight,
      left: 0,
      behavior: "smooth"
  })
  }
  


// ///////////////// CARTCODE SECTION ////////////////////////////////////////////////////


// ///// Seach By Category////////////////////////////////////
const exploreProductFunc = function(e){
    localStorage.setItem("sort", true)

    let searchCategory = e.target.getAttribute("data-set")
    
    let categoryListArr = productDataJson.filter(el => el.category === searchCategory && el)
    
    sortedArr = categoryListArr

    localStorage.setItem("categorysortList", JSON.stringify(sortedArr))
    window.location.href = "product.html"
}


///////////// Handle cart details page order //////////////////////
function handleOrderCartDetails(e){
    let numOfItem = e.target.previousElementSibling.value
    let id = +e.target.getAttribute("data-id")
    let productData = productDataJson.find(el => el.id === id && el)

    const message = `Hello, I am interested in buying ${numOfItem} ${productData.name}
    *price:* ${productData.price}
    *Image:* ${productData.productImageSrc[0]}`;
    sendToWhatsApp(message)
}



////////////////// Handle product card message btn ///////////////////
function HandleWhatsappMessage(e){
    
  let id = +e.target.getAttribute("data-info")


  let productData = productDataJson.find(el => el.id === id && el)

    // Construct the message
    const message = `Hello, I am interested in buying the following product:
    *Name:* ${productData.name}
    *price:* ${productData.price}
    *Image:* ${productData.productImageSrc[0]}`;

    sendToWhatsApp(message)
}


/////////// FUNCTION DIRECT WHATSAPP MESSAGE ////////////////////////////////////
export default function sendToWhatsApp(message) {
    // Encode the message to be URL-friendly
    const encodedMessage = encodeURIComponent(message);

    // Client's WhatsApp number (replace with actual number)
    const whatsappNumber = '2349122067994'; // Use the full international format without '+' or '00'

    // WhatsApp URL scheme to open chat with pre-filled message
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    // Open the WhatsApp URL in a new tab or window
    window.open(whatsappUrl, '_blank');
}



// export{sendToWhatsApp}