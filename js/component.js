const component = {}
component.register = `
<section class="register-container">
        <form class="register-form">
            <div class="form-header">
                <h3>MindX Chat</h3>
            </div>
            <div class="form-content">
                <div class="name-wrapper">
                    <div class="input-wrapper">
                        <input id="input-firstname" type="text" name="firstname" placeholder="Firstname">
                    </div>
                    <div class="input-wrapper">
                        <input id="input-lastname" type="text" name="lastname" placeholder="Lastname">
                    </div>
                </div>
                <div class="email-wrapper">
                    <div class="input-wrapper">
                        <input id="input-email" type="text" name="email" placeholder="Email">
                    </div>
                </div>
                <div class="password-wrapper">
                    <div class="input-wrapper">
                        <input id="input-password" type="password" name="password" placeholder="Password">
                    </div>
                    <div class="input-wrapper">
                        <input id="input-repassword" type="password" name="confirmPassword" placeholder="Confirm Password">
                    </div>
                </div>

            </div>
            <div class="form-footer">
                <a id="register-link">Already have an account? Login.</a>
                <button type="submit">Register</button>
            </div>
        </form>
    </section>
    `

    component.login = `
    <section class="login-container">
        <form id="login-container" class="login-form">
            <div class="login-header">
                <h3>MindX Login</h3>
            </div>
            <div class="form-content">
                <div class="email-wrapper">
                    <div class="input-wrapper">
                        <input id="input-email" type="text" name="email" placeholder="Email">
                    </div>
                </div>
                <div class="password-wrapper">
                    <div class="input-wrapper">
                        <input id="input-password" type="password" name="password" placeholder="Password">
                    </div>

                </div>
            </div>


            <div class="login-footer">
                <a id="login-link">Not yet have an account? Register.</a>
                <button type="submit">Login</button>
            </div>
        </form>
    </section>
</body>
`