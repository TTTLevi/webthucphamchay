const buyBtns = document.querySelectorAll('.js-buy-services')
const modal = document.querySelector('.js-modal')
const modalClose = document.querySelector('.js-modal-close')
const modalContainer = document.querySelector('.js-modal-container')

function showBuyServices() {
    modal.classList.add('open')
}

function hideBuyTickets() {
    modal.classList.remove('open')
}

for(const buyBtn of buyBtns) {
    buyBtn.addEventListener('click',showBuyServices)
}

modalClose.addEventListener('click',hideBuyTickets)

modal.addEventListener('click',hideBuyTickets)

modalContainer.addEventListener('click', function(event) {
    event.stopPropagation()
})


Validator({
    form: '#form-1',
    errorSelector: '.form-message',
    rules: [
        Validator.isName('#service-hoten',20),
        Validator.isNumber('#service-sdt'),
        Validator.isEmail('#service-mail'),
        Validator.isRequired('#service-request',20),
    ]
})


document.getElementById("buy-service").addEventListener("click", function(event) {
    var checkboxes = document.querySelectorAll('input[name="service[]"]');
    var isChecked = false;
    
  
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            isChecked = true;
      }
    });
  
    if (!isChecked) {
      alert("Phải chọn ít nhất một loại dịch vụ.");
      event.preventDefault(); // Ngăn chặn form được gửi nếu không có checkbox nào được chọn
    }
  });
  