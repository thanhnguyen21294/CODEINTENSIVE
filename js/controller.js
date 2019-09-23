const controller = {}


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
        if (result.user && result.user.emailVerified) {
            alert('Login success')
        } else {
            throw Error("You must verified your email!")
        }

    } catch (error) {
        view.setText('login-error', error.message)
        button.removeAttribute('disabled')
    }
}