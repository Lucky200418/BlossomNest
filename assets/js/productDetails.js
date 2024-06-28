import productDataJson from "../../data/data.js"


const sideImageContainer = document.querySelector(".div-sub-images-container")
const productDisplayImage = document.querySelector(".productDisplayImage")
const dropdownContainerUl = document.querySelector(".dropdownContainer")



const nextImage = function(e){
    if(!(e.target.className === "cart-div-img"))  return
    let targetEl =  +sideImageContainer.getAttribute("data-id")
    
    let allDivChildren = [...sideImageContainer.querySelectorAll(".div-1-img")]
    let productId = e.target.parentElement.getAttribute("data-id")
    //Find the product from arr
    let productDataImg = productDataJson.find(el => el.id === targetEl && el) 

    allDivChildren.forEach(el => {
        el.children[0].classList.remove("activeBlock")
    })
    

    e.target.classList.add("activeBlock")

    productDisplayImage.src = productDataImg.productImageSrc[productId]
}


sideImageContainer?.addEventListener("click", nextImage.bind(this))