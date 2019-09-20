const view = {}

const validators = {
    require(str){
        return str
    },
    email(str){
        return str.includes('@')
    },
    password(str){
        return str.length > 6
    }
}

view.showComponent = function(name){
    let app = document.getElementById('app');
    switch (name){
        case `register`:{
            app.innerHTML = component.register
            let link = document.getElementById('register-link');
            link.onclick = linkClickHandler;

            let form = document.getElementById('register-form')
            form.onsubmit = formSubmitHandler

            function linkClickHandler(){
                view.showComponent('login')
            }

            function formSubmitHandler(event){
                event.preventDefault()
                let registerInfo = {
                    firstname: form.firstname.value,
                    lastname: form.lastname.value,
                    email: form.email.value,
                    password: form.password.value,
                    confirmPassword: form.confirmPassword.value
                }
                // if (registerInfo.firstname) {
                //     document.getElementById('firstname-error').innerHTML = ''
                    
                // }else{
                //     document.getElementById('firstname-error').innerHTML = 'Invalid firstname!'
                // }
                view.validate(registerInfo.firstname, validators.require, 'firstname-error', 'Invalid firstname')

                // if (registerInfo.lastname) {
                //     document.getElementById('lastname-error').innerHTML = ''
                // }else{
                //     document.getElementById('lastname-error').innerHTML = 'Invalid lastname!'
                // }
                view.validate(registerInfo.lastname, validators.require, 'lastname-error', 'Invalid lastname')

                if (!((registerInfo.email).includes('@'))) {
                    document.getElementById('email-error').innerHTML = 'Invalid email!'
                }else{
                    document.getElementById('email-error').innerHTML = ''
                }

                if ((registerInfo.password).length < 6) {
                    document.getElementById('password-error').innerHTML = 'Password must have more than 6 characters'
                }else{
                    document.getElementById('password-error').innerHTML = ''
                }

                if (registerInfo.confirmPassword === registerInfo.password) {
                    document.getElementById('repassword-error').innerHTML = ''
                }else{
                    document.getElementById('repassword-error').innerHTML = 'Enter password again!'
                }
                
            }
            break
        }
    
        case `login`:{
            app.innerHTML = component.login
            let link = document.getElementById('login-link');
            link.onclick = linkClickHandler;
            function linkClickHandler(){
                view.showComponent('register')
                
            }
            break
        }
    }
}

view.setText = function(id, text){
    document.getElementById(id).innerHTML = text
}

view.validate = function(value, validators, idErrorMessage, errorMessage){
    if (validators(value)) {
        view.setText(idErrorMessage,'')
        return true
    }else{
        view.setText(idErrorMessage, errorMessage)
        return false
    }
}