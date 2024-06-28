let productDetailsIMageHtml = ` 
                        <div data-id="{%ID%}" class="div-1-img ">
                            <img class="cart-div-img" src="{%IMAGEURL%}" alt="productImage"/>
                        </div>`

 let cartHtmlTemplate = `
                        <li class="cartList" data-id="{%ID%}">
                            <div class="cartImgDiv">
                                <img src={%IMAGEURL%} alt="cartImage" class="cartImage"/>
                            </div>
                            <div>
                                <span>{%NAME%}</span>
                                <!-- <span>Item Id</span> -->
                            </div>
                        
                            <div class="priceCloseContainer">
                                <p>₦{%PRICE%}</p>
                                <span><ion-icon class="trashCart {%ID%}" name="trash"></ion-icon></span>
                            </div>
                        </li>
                    `

let productLoaderHtml = `
                        <li class="product-item" >
                            <div class="product-card product-card-loader" tabindex="0">

                                        <figure class="card-banner card-banner-loader">
                                                <img width="312" height="350" loading="lazy"
                                                class="image-contain image-contain-loader ">
                                        </figure>

                                    <div class="card-content-loader">

                                            <div class="card-cat card-cat-loader">
                                                <a href="#" class="card-cat-link"></a> 
                                            </div>

                                            <div class="card-cat-2 card-cat-loader">
                                                <a href="#" class="card-cat-link"></a> 
                                            </div>

                                            <div class="card-cat-3 card-cat-loader">
                                                <a href="#" class="card-cat-link"></a> 
                                            </div>
                                    </div>

                            </div>
                        </li>
`

let htmlTemplate = `
                    <li class="product-item" >
                        <div class="product-card" tabindex="0">

                        <figure class="card-banner" data-set={%ID%}>
                            <img src="./assets/images/product-1.jpg" width="312" height="350" loading="lazy"
                            alt="Running Sneaker Shoes" class="image-contain" data-set={%ID%}>

                            {<div class="card-badge">New</div>}

                    <ul class="card-action-list">

                        <li class="card-action-item">
                            <button class="card-action-btn" aria-labelledby="card-label-3">
                            <ion-icon name="eye-outline"></ion-icon>
                            </button>

                            <div class="card-action-tooltip" id="card-label-3">Quick View</div>
                        </li> 

                        <!-- <li class="card-action-item">
                            <button class="card-action-btn" aria-labelledby="card-label-4">
                            <ion-icon name="repeat-outline"></ion-icon>
                            </button>

                            <div class="card-action-tooltip" id="card-label-4">Compare</div>
                        </li>  -->

                    </ul>
                    </figure>

                    <div class="card-content" data-set={%ID%}>

                        <div class="card-cat">
                        <a href="#" class="card-cat-link" data-set={%ID%}>Men</a> 
                        <!-- <a href="#" class="card-cat-link">Women</a> -->
                        </div>

                        <h3 class="h3 card-title">
                        <a href="#" data-set={%ID%}>{%Name%}</a>
                        </h3>

                        <data class="card-price" value="180.85">₦{%PRICE%}</data>

                    </div>

                    </div>
                    </li>
`

let trendHtmlProductItem = `
         <li class="product-item" data-info="trend" data-set={%ID%}>
                <div class="product-card" tabindex="0">

            <figure class="card-banner">
                    <img src="./assets/images/product-1.jpg" width="312" height="350" loading="lazy"
                    alt="Running Sneaker Shoes" class="image-contain" data-set={%ID%} data-info="trend">

                   <div class ="card-badge {%current%}">New</div>

                <ul class="card-action-list">
                    <li class="card-action-item">
                        <button class="card-action-btn" aria-labelledby="card-label-1">
                            <ion-icon name="cart-outline"></ion-icon>
                        </button>

                        <div class="card-action-tooltip" id="card-label-1">Add to Cart</div>
                </li>

                <li class="card-action-item">
                        <button class="card-action-btn" aria-labelledby="card-label-2">
                            <ion-icon name="heart-outline"></ion-icon>
                        </button>

                        <div class="card-action-tooltip" id="card-label-2">Add to Whishlist</div>
                </li>

                <li class="card-action-item">
                        <button class="card-action-btn" aria-labelledby="card-label-3">
                            <ion-icon name="eye-outline"></ion-icon>
                        </button>

                        <div class="card-action-tooltip" id="card-label-3">Quick View</div>
                </li>

                <li class="card-action-item">
                        <button class="card-action-btn" aria-labelledby="card-label-4">
                            <ion-icon name="repeat-outline"></ion-icon>
                        </button>

                        <div class="card-action-tooltip" id="card-label-4">Compare</div>
                </li>

                </ul>
                </figure>

                <div class="card-content data-set={%ID%} data-info="trend" ">

                    <div class="card-cat">
                        <a href="#" class="card-cat-link data-set={%ID%} data-info="trend"">Men</a> /
                        <a href="#" class="card-cat-link data-set={%ID%} data-info="trend"">Women</a>
                    </div>

                    <h3 class="h3 card-title">
                         <a href="#">/{%Name%}/</a>
                    </h3>

                    <data class="card-price" value="180.85">$180.85</data>

                    </div>

                </div>
            </li>
`

let basketItemHtmlTemplate = `
                                <li>
                                <img alt="Image Of Product" src="./assets/images/collection-1.jpg" class="basketItemImage">
                                <div class="basketItemDetails">
                                    <div class="basketItemDetailsLeft"> 
                                    <h3>{%NAME%}</h3>
                                    <p>{%TYPE%}</p>
                                    </div>

                                    <div class="basketItemDetailsRight">
                                    <p>{%PRICE%}</p>
                                    <ion-icon name="close-circle-outline" data-id={%ID%} class="basketItemDetailsClose"></ion-icon>
                                    </div>

                                </div>
                                </li>

`

let basketShopingItemTemplate = `
                                <li class="dropdownContainerBasketListItem" data-id={%ID%}>
                                    <ion-icon name="bag-outline" aria-hidden="true"></ion-icon>
                                    <p>Basket: <strong data-id ={%ID%}>{%PRICE%}</strong></p>
                                    <span><ion-icon class="trashCart"  name="trash"  data-id={%ID%}></ion-icon></span>
                                </li>
`


    // <div class="addSubItemContainer {%ID%}">
                            //     <span class="subBtn">-</span>
                            //     <span class="cartNumValue">{%CARTNUM%}</span>
                            //     <span class ="addBtn">+</span>
                            // </div>

export  {productDetailsIMageHtml, cartHtmlTemplate, productLoaderHtml, htmlTemplate, trendHtmlProductItem , basketItemHtmlTemplate, basketShopingItemTemplate}