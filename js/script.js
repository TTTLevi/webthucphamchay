
// video section
let listVideo = document.querySelectorAll('.video-list .vid');
let mainVideo = document.querySelector('.main-video video');
let title = document.querySelector('.main-video .video-title');

listVideo.forEach(video => {
    video.onclick = () =>{
        listVideo.forEach(vid => vid.classList.remove('active'));
        video.classList.add('active')
        if(video.classList.contains('active')){
            let src = video.children[0].getAttribute('src');
            console.log(src)
            mainVideo.src =src;
            let text = video.children[1].innerHTML;
            title.innerHTML = text;
        };
    };
}); 

/**
 * NAV LINK INDICATOR
 */

const patName = window.location.pathname;

const pageName = patName.split("/").pop();

if(pageName === "index.html"){
    document.querySelector(".trangchu").classList.add('active');
}
if(pageName === "introduction.html"){
    document.querySelector(".gioithieu").classList.add('active');
}
if(pageName === "product.html"){
    document.querySelector(".sanpham").classList.add('active');
}
if(pageName === "portfolio.html"){
    document.querySelector(".thanhtuumain").classList.add('active');
}
if(pageName === "service.html"){
    document.querySelector(".banggia").classList.add('active');
}
if(pageName === "contact.html"){
    document.querySelector(".lienhe").classList.add('active');
}


//thanh tuu section number increase
let valueDisplays = document.querySelectorAll(".num");
let interval = 10000;
valueDisplays.forEach(valueDisplay => {
    let startValue = 0;
    let endValue = parseInt(valueDisplay.getAttribute("data-val"));
    let duration = Math.floor(interval/endValue);
    let counter = setInterval(function() {
        startValue +=3;
        valueDisplay.textContent = startValue;
        if(startValue === endValue){
            clearInterval(counter);
        }  
    },duration);
})

/**
 *  HIỆN THỊ CART
 * 
 */
let iconCart = document.querySelector('.iconCart')
let cart = document.querySelector('.cart')
let container =  document.querySelector('.container-product')
let close = document.querySelector('.close')


iconCart.addEventListener('click', () => {
    if(cart.style.display == 'none')
        cart.style.display = 'inline-grid'
    else {
        cart.style.display = 'none'
    }
})

close.addEventListener('click', ()=>{
    cart.style.display ='none'
})

let products = null;
//lay data tu json
fetch('../json/product.json')
.then(response => response.json())
.then(data => {
    products = data;
    addDataToHTML();
})

//hien thi du lieu trong list html
function addDataToHTML(){
    //xoa data default 
    let listProductHTML = document.querySelector('.listProduct')
    listProductHTML.innerHTML = '';
    
    //them new data
    if(products != null){
        products.forEach(product => {
            let newProduct = document.createElement('div');
            newProduct.classList.add('item');
            newProduct.innerHTML = 
            `<a href="${product.link}"><img src="${product.image}" alt="" data-aos="fade-up"
            data-aos-duration="1000"></a>
            <h2>${product.name}</h2>
            <div class="price">${product.price}<sup>đ</sup></div>
            <button onclick="addCart(${product.id})"><i class="fa-solid fa-bag-shopping"></i>Thêm</button>`;
            listProductHTML.appendChild(newProduct)
        })
    }
}

let listCart = [];
//get cookie data
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }
}

checkCart();

function addCart($idProduct){
    let productCopy = JSON.parse(JSON.stringify(products));
    //neu sp khong co trong cart
    if(!listCart[$idProduct]){
        let dataProduct = productCopy.filter(
            product => product.id == $idProduct
        )[0];
        //them data vao cart
        listCart[$idProduct] = dataProduct
        listCart[$idProduct].quantity = 1
    }
    else {
        //neu sp co trong cart roi
        //chi tang so luong
        listCart[$idProduct].quantity++

    }

    //save data cart vao cookie
    let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC"
    document.cookie = "listCart="+JSON.stringify(listCart)+"; "+timeSave+"; path=/;";
    addCartToHTML();
}
addCartToHTML();
function addCartToHTML(){
    //clear data
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML=''

    let totalHTML = document.querySelector('.totalQuantity');
    let toalQuantity = 0;

    if(listCart){
        listCart.forEach(product => {
            if(product){
                let newCart = document.createElement('div');
                newCart.classList.add('item');
                newCart.innerHTML = 
                `<img src="${product.image}" alt="">
                <div class="content">
                    <div class="name">
                    ${product.name}
                    </div>
                     <div class="price">
                     ${product.price}<sup>đ</sup>/1 sản phẩm
                     </div>
                </div>
                <div class="quantity">
                    <button onclick="changeQuantity(${product.id}, '-')" type="button" class="btn btn-light">-</button>
                    <span class="value">${product.quantity}</span>
                    <button onclick="changeQuantity(${product.id}, '+')" type="button" class="btn btn-light">+</button>
                </div>`
                listCartHTML.appendChild(newCart);
                toalQuantity = toalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = toalQuantity;
}

function changeQuantity($idProduct,$type){
    switch ($type) {
        case '+':
            listCart[$idProduct].quantity++;
            break;
        case '-':
            listCart[$idProduct].quantity--;
            if(listCart[$idProduct].quantity <= 0){
                delete listCart[$idProduct];
            }
            break;
        default:
            break;
    }

    //save new data vao cookie
    let timeSave = "expires=Thu, 31 Dec 2025 23:59:59 UTC"
    document.cookie = "listCart="+JSON.stringify(listCart)+"; "+timeSave+"; path=/;";

    //tai lai cart
    addCartToHTML();
}


/**
 * Chuyển img trong product detail
 */

var MainImg = document.getElementById('MainImg');
var smallimg = document.getElementsByClassName('small-img');

smallimg[0].onclick = function(){
    MainImg.src = smallimg[0].src;
}
smallimg[1].onclick = function(){
    MainImg.src = smallimg[1].src;
}
smallimg[2].onclick = function(){
    MainImg.src = smallimg[2].src;
}
smallimg[3].onclick = function(){
    MainImg.src = smallimg[3].src;
}

/**
 * Chi tiết sản phẩm
 */

const baoquan = document.querySelector(".baoquan")
const chitiet = document.querySelector(".chitiet")
const chebien = document.querySelector(".chebien")
if(baoquan){
    baoquan.addEventListener("click", function(){
        document.querySelector(".bottom-big-content-chitiet").style.display = "none"
        document.querySelector(".bottom-big-content-baoquan").style.display = "block"
        document.querySelector(".bottom-big-content-chebien").style.display = "none"
    })
}

if(chitiet){
    chitiet.addEventListener("click", function(){
        document.querySelector(".bottom-big-content-chitiet").style.display = "block"
        document.querySelector(".bottom-big-content-baoquan").style.display = "none"
        document.querySelector(".bottom-big-content-chebien").style.display = "none"
    })
}

if(chebien){
    chebien.addEventListener("click", function(){
        document.querySelector(".bottom-big-content-chitiet").style.display = "none"
        document.querySelector(".bottom-big-content-baoquan").style.display = "none"
        document.querySelector(".bottom-big-content-chebien").style.display = "block"
    })
}

const buttonXuong = document.querySelector(".product-content-bottom-top")
if(buttonXuong){
    buttonXuong.addEventListener("click",function(){
        document.querySelector(".product-content-bottom-big").classList.toggle("activeB")

    })
}