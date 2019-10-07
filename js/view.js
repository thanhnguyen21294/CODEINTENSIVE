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


        
            function allPassed(validateResult) {
                for (let result of validateResult) {
                    if (!result) {
                        return false
                    }

                }
                return true
            }

        case 'chat': {
            app.innerHTML = component.nav + component.chat
            controller.loadConversations()
            controller.setupConversationsOnSnapshot()
            let nameDom = document.getElementById('user-display-name')
            nameDom.innerText = firebase.auth().currentUser.displayName;

            let btnSignOut = document.getElementById('btn-sign-out')
            btnSignOut.onclick = signOutHandler

            let formChat = document.getElementById('form-chat')
            formChat.onsubmit = formChatSubmitHandler

            let formAdd = document.getElementById('add-conversation-form')
            formAdd.onsubmit = formAddSubmitHandler

            function signOutHandler() {
                firebase.auth().signOut() // onAuthStateChange => show login
            }

            function formAddSubmitHandler(e){
                e.preventDefault()
                let title = formAdd.title.value
                let friendEmail = formAdd.friendEmail.value.trim().toLowerCase()

                let validateResult = [
                    view.validate(title, validators.require, 'title-error', 'Invalid title'),
                    view.validate(friendEmail, validators.email, 'friend-email-error', 'Invalid friend email')
                ]
                if (allPassed(validateResult)) {
                    let conversation = {
                        title: title,
                        createdAt: new Date().toISOString(),
                        messages: [],
                        users: [
                            friendEmail,
                            firebase.auth().currentUser.email
                        ]
                    }
                    controller.addConversation(conversation, friendEmail)
                    
                }
            }

            function formChatSubmitHandler(e){
                e.preventDefault()
                let content = formChat.message.value.trim()
                if (content) {
                    let message = {
                        owner: firebase.auth().currentUser.email,
                        createdAt: new Date().toISOString(),
                        content: content
                    }
                    
                    
                    controller.addMessage(message)
                }
            }
            break
        }

        case 'loading': {
            app.innerHTML = component.loading
            break
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

view.disable = function(id){
    document.getElementById(id).setAttribute('disabled', true)
}

view.enable = function(id){
    document.getElementById(id).removeAttribute('disabled')
}


view.showCurrentConversation = function () {
    console.log(model.currentConversation);

    if (model.currentConversation) {
        // show all message of currentConversation
        let messages = model.currentConversation.messages
        let messageContainer = document.getElementById('message-container')
        messageContainer.innerHTML = ""
        for (let message of messages) {
            let className = "message-chat"
            let content = message.content
            if (message.owner == firebase.auth().currentUser.email) {
                className += " your"
            }
            let html = `
            <div class="${className}">
            <span>${content}</span>
            </div>
            `
            messageContainer.innerHTML += html
        }
        messageContainer.scrollTop = messageContainer.scrollHeight

    }
}

view.showListConversations = function(){
    if (model.conversations) {
        let listConversation = document.getElementById('list-conversation')
        listConversation.innerHTML=''
        for (let conversation of model.conversations) {
            let className = "conversation"
            if (model.currentConversation && conversation.id == model.currentConversation.id) {
                className += " current"
            }
            let html = `
            <div class="${className}">
            <div id="title-${conversation.id}" class="conversation-title">${conversation.title}</div>
            <div class="conversation-member">${conversation.users.length} members</div>
            </div>
            `
            listConversation.innerHTML += html
        }
        //dat su kien click vao conversation-title
        for (let conversation of model.conversations) {
            let titleId = `title-${conversation.id}`
            let titleDiv = document.getElementById(titleId)
            titleDiv.onclick = onClickTitleHandler

            function onClickTitleHandler(){
                model.saveCurrentConversation(conversation)
                view.showCurrentConversation()
                view.showListConversations()
            }
        }
    }
}
