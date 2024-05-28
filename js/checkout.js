let listCart = [];
 
//lay data tu cookie
function checkCart(){
    var cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('listCart='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);   
    }
} 
checkCart();

addCartToHTML();
function addCartToHTML(){
    let listCartHTML = document.querySelector('.returnCart .list');
    listCartHTML.innerHTML = '';
    let totalQuantityHTML = document.querySelector('.totalQuantity1');
    let totalPriceHTML = document.querySelector('.totalPrice');

    let totalQuantity = 0;
    let totalPrice = 0;

    //co sp trong cart
    if(listCart){
        listCart.forEach(product => {
           if(product){
                let newP = document.createElement('div');
                newP.classList.add('item');
                newP.innerHTML=
                `<img src="${product.image}" alt="">
                <div class="info">
                    <h2>${product.name}</h2>
                    <div class="price">${product.price}<sup>đ</sup>/1 sản phẩm</div>
                </div>
                <div class="quantity">${product.quantity}</div>
                <div class="returnPrice">
                ${product.price * product.quantity}<sup>đ</sup>
                </div>`;
                listCartHTML.appendChild(newP);
                totalQuantity = totalQuantity + product.quantity;
                totalPrice = totalPrice + (product.price * product.quantity);
            }
        })
    }
    totalQuantityHTML.innerText = totalQuantity+'';
    totalPriceHTML.innerText = totalPrice + 'đ';
}