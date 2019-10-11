const controller = {}

controller.initAuth = function () {
    view.showComponent('loading')
    firebase.auth().onAuthStateChanged(onAuthStateChangedHandler)

    function onAuthStateChangedHandler(user) {
        if (user && user.emailVerified) {
            view.showComponent('chat')
        } else {
            view.showComponent('login')
        }
    }
}


controller.register = async function (registerInfo) {
    let email = registerInfo.email;
    let password = registerInfo.password;
    let displayName = registerInfo.firstname + " " + registerInfo.lastname;
    let button = document.getElementById('register-submit-btn')
    button.setAttribute('disabled', true)
    view.setText('register-error', '')
    view.setText('register-success', '')

    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        await firebase.auth().currentUser.updateProfile({
            displayName: displayName
        })
        await firebase.auth().currentUser.sendEmailVerification()
        view.setText('log-in-success', 'An verification email has been sended to your email address!')
    } catch (error) {
        view.setText('register-error', error.message)
    }
    button.removeAttribute('disabled')
}


controller.login = async function (logInInfo) {
    let email = logInInfo.email;
    let password = logInInfo.password;
    let button = document.getElementById('login-submit-btn')
    button.setAttribute('disabled', true)
    view.setText('log-in-error', "")
    view.setText('log-in-success', '')

    try {
        let result = await firebase.auth().signInWithEmailAndPassword(email, password)

        // if (result.user && result.user.emailVerified) {
        //     view.showComponent('chat');
        // } else {
        //     throw Error("You must verified your email!")
        // }
        if (!result.user.emailVerified || !result.user) {
            throw new Error('You must verified your email !')
        }

    } catch (error) {
        view.setText('log-in-error', error.message)
        button.removeAttribute('disabled')
    }
}

controller.loadConversations = async function () {
    //1. get docs from firebase.firestore().collection('conversations')
    //2. convert docs to conversations
    //3. save conversations to model
    //4. view show conversations
    let result = await firebase
        .firestore()
        .collection('conversations')
        .where('users', 'array-contains', firebase.auth().currentUser.email)
        .get()
    let conversations = []
    for (let doc of result.docs) {
        let conversation = doc.data()
        conversation.id = doc.id
        conversations.push(conversation)


    }


    model.saveConversations(conversations)
    if (conversations.length) {
        model.saveCurrentConversation(conversations[0])
    }
    view.showCurrentConversation()
    view.showListConversations()
}


controller.addMessage = async function (message) {

    let input = document.getElementById('form-chat-input')
    view.disable('form-chat-submit-btn')

    await firebase
        .firestore()
        .collection('conversations')
        .doc(model.currentConversation.id)
        .update({
            messages: firebase.firestore.FieldValue.arrayUnion(message)
        })
    view.enable('form-chat-submit-btn')
    input.value = ''
}

controller.setupConversationsOnSnapshot = function () {
    firebase
        .firestore()
        .collection('conversations')
        .where('users', 'array-contains', firebase.auth().currentUser.email)
        .onSnapshot(snapshotHandler)

    function snapshotHandler(snapshot) {
        let docChanges = snapshot.docChanges()
        for (let docChange of docChanges) {
            let conversation = docChange.doc.data()
            conversation.id = docChange.doc.id
            if (docChange.type == 'modified') {
                model.updateConversation(conversation)
                if (conversation.id == model.currentConversation.id) {
                    model.saveCurrentConversation(conversation)
                    view.showCurrentConversation()
                }
            }
            if (docChange.type = 'added') {
                model.updateConversation(conversation)
            }
            console.log('>>', conversation)
            console.log('>>', docChange)
            if (docChange.type == 'removed') {
                model.removeConversation(conversation)
                if (model.currentConversation && model.currentConversation.id == conversation.id) {
                    if (model.conversations.length) {
                        model.saveCurrentConversation(model.conversation[0])
                    }else{
                        model.saveCurrentConversation(null)
                    }
                    view.showCurrentConversation()
                }
            }

        }
        view.showListConversations()

    }
}

controller.addConversation = async function(conversation, friendEmail){
    //1. validate if friend email exist in system
    //2. add conversation to collection 'conversations'
    //3. disable error message + disable button submit when processing // TODO
    view.disable("form-add-btn-submit")
    try {
        let signInMethods = await firebase.auth().fetchSignInMethodsForEmail(friendEmail)
        console.log(signInMethods);
        
        if (!signInMethods.length) {
            throw new Error('Friend email do not exist in system!')
        }
        if (friendEmail == firebase.auth().currentUser.email) {
            throw new Error('Please enter new email!')
        }

        await firebase
            .firestore()
            .collection('conversations')
            .add(conversation)
            document.getElementById('form-add-input-title').value = ""
            document.getElementById('form-add-input-email').value = ""

            
    } catch (error) {
        view.setText("friend-email-error", error.message)
        
    }
    view.enable('form-add-btn-submit')
}

controller.leaveConversation = async function() {
    if (model.currentConversation) {
        let conversationId = model.currentConversation.id
        let email = firebase.auth().currentUser.email
        view.setText('leave-conversation-error','')
        view.disable('leave-conversation-btn')
        try {
            await firebase
            .firestore()
            .collection('conversations')
            .doc(conversationId)
            .update({
                users: firebase.firestore.FieldValue.arrayRemove(email)
            }) 
        } catch (err) {
            view.setText('leave-conversation-error', err.message)
        }
        
        view.enable('leave-conversation-btn')
            
    }
}