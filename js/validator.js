

function Validator(options) {

    function validate(inputElement,rule) {
        var errorElement = inputElement.parentElement.querySelector('.form-message')
        
        var errorMessage = rule.test(inputElement.value)
         
        if(errorMessage) {
            errorElement.innerText = errorMessage;
           inputElement.parentElement.classList.add('invalid')
        }
        else {
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid')
        }
    }

    var formElement = document.querySelector(options.form)

    if(formElement){

        options.rules.forEach(function(rule) {
            var inputElement = formElement.querySelector(rule.selector)
            if(inputElement) {
                inputElement.onblur = function(){
                    validate(inputElement,rule)  
                }
            }
        })
    }
}

Validator.isRequired = function(selector,min) {
    return {
        selector: selector,
        test: function(value){
            if(value.trim() && value.length >= min)
                return undefined 
            else {
                if(!value.trim())
                    return 'Vui lòng nhập field này'
                else return 'Độ dài tối thiểu là 20 kí tự'
            }
        }
    }
}

Validator.isEmail = function(selector) {
    return {
        selector: selector,
        test: function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            if(value.trim() && regex.test(value))
                return undefined
            else {
                if(!value.trim())
                    return 'Vui lòng nhập vào field'
                else return 'Vui lòng nhập đúng định dạng mail'
            }
        }
    }
}

Validator.isNumber = function(selector) {
    return {
        selector: selector,
        test: function(value){
            var regex = /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/
            if(value.trim() && regex.test(value))
                return undefined
            else{
                if(value.trim() == '') {
                    return 'Vui lòng nhập vào field'
                }
                else return 'Vui lòng nhập đúng số'
            } 
        }
    }
}

Validator.isName = function(selector, min) {
    return {
        selector: selector,
        test: function(value){
            if(!value.trim())
                return 'Vui lòng nhập nhập tên'
            else if(/\d/.test(value))
                return 'Vui lòng nhập đúng format'
            else {
                if(value.length < min)
                    return 'Độ dài tối thiểu là 20 kí tự'
                else return undefined
            }
        }
    }
}

