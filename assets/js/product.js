
import productDataJson from "../../data/data.js"
import {productDetailsIMageHtml, cartHtmlTemplate, productLoaderHtml, htmlTemplate} from "../../assets/js/template.js"
import {
    filterListBtns, 
    indexPage, 
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
    cartIconBagde
} from "../../assets/js/dom.js"




let DisplayArr
let displayArr = []
// let sortedArr = []
let sortedArr = JSON.parse(localStorage.getItem("categorysortList")) || []
let cartArray = []
// let sort = false
let sort = JSON.parse(localStorage.getItem("sort")) || false;
let filterBtns = [...filterListBtns]
let  observeLastItem = true
let start = 0
let end = 8
let i = 0




const init = function(){
    DisplayProductList()
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
    document.querySelector(".nav-action-btn-icon")?.addEventListener("click", displayCartPopUp)
    exploreBtnLists?.map(el=> el.addEventListener("click",exploreProductFunc.bind(this)));
    updateCartBagdeNum()

});


// Update badge cart
function updateCartBagdeNum (){
        // Display Cart Number when page loads
    let cartData = JSON.parse(localStorage.getItem("cartArray"))

    cartArray = cartData?.length > 0 ? cartData : cartArray
    if(cartArray?.length > 0){
        cartIconBagde.classList.remove("hidden")
        cartIconBagde.innerText = +cartArray.length
    }

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

    start = end
    end = (productDataJson.length/end) * end

    displayLoader()
    
    setTimeout(()=>{
        DisplayProductList()
    },2000)
}


// Display Loading of content
const displayLoader = function(){
   let arr = [1,2,3,4]
    const newProductList = arr.map(el => {
                return productLoaderHtml
        }).join(" ")
   
productList.insertAdjacentHTML("beforeend", newProductList) 
}

function DisplayProductList(){

    if(sort){
        DisplayArr = sortedArr
    }else{
        displayArr.push(...productDataJson.slice(start, end))
        DisplayArr = displayArr
    }
    


    let newProductList =  DisplayArr.map(el => {

                let replaceHtmlTemplate =  htmlTemplate.replace(/{%Name%}/g, el.name).replace(/{%ID%}/g, el.id)
                        return replaceHtmlTemplate
                }).join(" ");

   productList.innerHTML = newProductList

   let productItemList = [...productList.querySelectorAll(".product-item")]
  

    productItemList.forEach(el => el.addEventListener("click", handleProductClick.bind(this)))
}


// Sort Product list display
const sortProducts = function(e){
    sort = true
    localStorage.setItem("sort", true)

    let subCategory = e.target.getAttribute("data-set")

    let listArr = [...e.target.parentElement.parentElement.children]
    listArr.forEach(el => {
        el.children[0].classList.remove("active")
    })


    e.target.classList.add("active")

    if(subCategory === 'All'){
        sortedArr = productDataJson;
        DisplayProductList()
        localStorage.setItem("categorysortList", JSON.stringify(sortedArr))
        return
    }

   const subCategoryList =  productDataJson.filter(el => {
        return el ? el.subCategory === subCategory : ""
    })

    sortedArr = []
    sortedArr.push(...subCategoryList)
    localStorage.setItem("categorysortList", JSON.stringify(sortedArr))
  
    
    
    
    DisplayProductList()
}

// move Product IMage
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
        productCard.querySelectorAll(".moveImg").forEach(el=> el.classList.add("hidden"))
    }

    if(imageUrl.length > 1){
        imageUrl = data.productImageSrc[0]
        productCard.querySelectorAll(".moveImg").forEach(el=> el.classList.remove("hidden"))
        productCard.querySelectorAll(".moveImg").forEach(el=> {
            console.log(el)  
            el.addEventListener("click", moveProductImage.bind(this, data))})
    }


    productCard.querySelector(".productCardImg").style.backgroundImage = `url('${imageUrl}')`;
    productCard.querySelector(".productPrice").innerText = data.price
    productCard.querySelector(".productTitle-h3").innerText = data.name
    productCard.querySelector(".productDescrip").innerText = data.description
    productCard.querySelector('.btnAddCart').classList.add(`${data.id}`)
}


// Display Product Card
function handleProductClick(e) {
    if(!(e.target.localName === "img" || e.target.localName === "a" || e.target.localName === "div" )) return

    productCard?.classList.remove("hidden")

    let id = +e.target.getAttribute("data-set")
    

   let productData =  DisplayArr.find(el => el.id === id)
   
   updateProductCard(productData)
}


const closeProductCard = e => e.target.parentElement.parentElement.classList.add("hidden")

// /Updates the number  in the cart array list
const updateNumberCartItem = function(e){
  
    if(!(e.target.className.includes("subBtn") || e.target.className.includes("addBtn"))) return

    let id = +e.target.parentElement.className.slice(-1)

    let cartData = cartArray.find(el => el.id === id && el);

    let value = cartData.numOfCartAdded

    if(e.target.className.includes("subBtn")){
        value == 1 ? "" : value--
        cartData.numOfCartAdded = value
    }

    if(e.target.className.includes("addBtn")){
        value++
        cartData.numOfCartAdded = value
    }

    DisplayCartArrayList()
}

// Delets cart Array list
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



// Displays Cart Array Lists
const DisplayCartArrayList = function(){ 
    let newCartList =  cartArray.map(el => {
        
        let replaceHtmlTemplate =  cartHtmlTemplate.replace(/{%CARTNUM%}/g, el.numOfCartAdded).replace(/{%ID%}/g, el.id)
        return replaceHtmlTemplate
    }).join(" ")

    dropdownContainer.innerHTML = cartArray.length > 0 ? newCartList : `<p>No Items here. Add to Cart</p>`
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
    productDisplaySection.style.display = "none"
    productDetailsSection.classList.remove("hidden")
    dropdownContainer.classList.toggle("hidden")
}


// close product details page
const closeProductSection = function(){
    productDisplaySection.style.display = "block"
    productDetailsSection.classList.add("hidden")
    document.querySelector(".mainContainer").classList.remove("hidden")
}



// Display PopUp for cart
const displayCartPopUp = function(){
    dropdownContainer.classList.toggle("hidden")
    DisplayCartArrayList()
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


// Add Product to cart
function AddToCart(e){
    dropdownContainer.classList.remove("hidden")
    productCard.classList.add('hidden')

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
}




const exploreProductFunc = function(e){
    let searchCategory = e.target.getAttribute("data-set")
    
    let categoryListArr = productDataJson.filter(el => el.category === searchCategory && el)
    
    sortedArr = categoryListArr
    let shopDataObj = {
        sort: false,
        sortedArr: []
    }

    let shopData = localStorage.setItem("shopData", JSON.stringify(shopDataObj))

    console.log(shopData)
    localStorage.setItem("categorysortList", JSON.stringify(sortedArr))
    localStorage.setItem("sort", true)
    window.location.href = "product.html"
    DisplayCartArrayList()
}


