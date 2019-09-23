const view = {}


const validators = {
    require(str) {
        return str
    },
    email(str) {
        return str.includes('@')
    },
    password(str) {
        return str.length >= 6
    }
}

view.showComponent = function (name) {
    let app = document.getElementById('app');
    switch (name) {
        case `register`: {
            app.innerHTML = component.register
            let link = document.getElementById('register-link');
            link.onclick = linkClickHandler;

            let form = document.getElementById('register-form')
            form.onsubmit = formSubmitHandler

            function linkClickHandler() {
                view.showComponent('login')
            }

            function formSubmitHandler(event) {
                event.preventDefault()
                let registerInfo = {
                    firstname: form.firstname.value,
                    lastname: form.lastname.value,
                    email: form.email.value,
                    password: form.password.value,
                    confirmPassword: form.confirmPassword.value
                }

                let validateResult = [

                    view.validate(registerInfo.firstname, validators.require, 'firstname-error', 'Invalid firstname'),


                    view.validate(registerInfo.lastname, validators.require, 'lastname-error', 'Invalid lastname'),
                    view.validate(registerInfo.email, validators.email, 'email-error', 'Invalid email!'),
                    view.validate(registerInfo.password, validators.password, 'password-error', 'Invalid password!'),
                    view.validate(registerInfo.confirmPassword, function (str) {
                        return str === registerInfo.password
                    }, 'repassword-error', 'Invalid confirm password')
                ]
                if (allPassed(validateResult)) {
                    controller.register(registerInfo)
                }
                console.log(validateResult);
                
            }
            

            break
        }

        case `login`: {
            app.innerHTML = component.login
            let link = document.getElementById('login-link');
            link.onclick = linkClickHandler;
            function linkClickHandler() {
                view.showComponent('register')

            }
            let form = document.getElementById('login-container')
            form.onsubmit = formSubmitHandler

            function formSubmitHandler(event) {
                event.preventDefault();
                let loginInfo = {
                    email: form.email.value,
                    password: form.password.value
                }
                let validateResult = [
                view.validate(loginInfo.email, validators.email, 'email-error', 'Invalid email'),
                view.validate(loginInfo.password, validators.password, 'password-error', 'Invalid password')
                ]
                if (allPassed(validateResult)) {
                    controller.login(loginInfo)
                }
            }
            
            
                
            break
        }
        function allPassed(validateResult){
            for (let result of validateResult) {
                if (!result) {
                    return false
                }
                
            }
            return true
        }
    }
}

view.setText = function (id, text) {
    document.getElementById(id).innerHTML = text
}

view.validate = function (value, validators, idErrorMessage, errorMessage) {
    if (validators(value)) {
        view.setText(idErrorMessage, '')
        return true
    } else {
        view.setText(idErrorMessage, errorMessage)
        return false
    }
}

