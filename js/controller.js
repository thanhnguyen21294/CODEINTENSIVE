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
        view.setText('register-success', 'An verification email has been sended to your email address!')
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
    view.setText('login-error', "")

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
        view.setText('login-error', error.message)
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

        }
        view.showListConversations()

    }
}