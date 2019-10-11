const component = {}
component.register = `

<section class="register-container">
        <form id="register-form" class="register-form">
            <div class="form-header">
                <h3>MindX Chat</h3>
            </div>
            <div class="form-content">
                <div class="name-wrapper">
                    <div class="input-wrapper">
                        <input id="input-firstname" type="text" name="firstname" placeholder="Firstname">
                        <div id="firstname-error" class="message-error"></div>
                    </div>
                    
                    <div class="input-wrapper">
                        <input id="input-lastname" type="text" name="lastname" placeholder="Lastname">
                        <div id="lastname-error" class="message-error"></div>
                    </div>
                    
                </div>
                <div class="email-wrapper">
                    <div class="input-wrapper">
                        <input id="input-email" type="text" name="email" placeholder="Email">
                    </div>
                    <div id="email-error" class="message-error"></div>
                </div>
                <div class="password-wrapper">
                    <div class="input-wrapper">
                        <input id="input-password" type="password" name="password" placeholder="Password">
                    </div>
                    <div id="password-error" class="message-error"></div>
                    <div class="input-wrapper">
                        <input id="input-repassword" type="password" name="confirmPassword" placeholder="Confirm Password">
                    </div>
                    <div id="repassword-error" class="message-error"></div>
                </div>

            </div>
            <div id="register-error" class="message-error"></div>
            <div id="register-success" class="message-success"></div>
            <div class="form-footer">
                <a id="register-link">Already have an account? Login.</a>
                <button type="submit" id="register-submit-btn">Register</button>
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
                        <div id='email-error' class="message-error"></div>
                    </div>
                </div>
                <div class="password-wrapper">
                    <div class="input-wrapper">
                        <input id="input-password" type="password" name="password" placeholder="Password">
                        <div id='password-error' class="message-error"></div>
                    </div>

                </div>
            </div>
            
            <div id="log-in-error" class="message-error"></div>

            <div id="log-in-success" class="message-success"></div>

            


            <div class="login-footer">
                <a id="login-link">Not yet have an account? Register.</a>
                <button type="submit" id="login-submit-btn">Login</button>
            </div>
        </form>
    </section>

    `
component.chat = `
    <section class="chat-container">
    <div class="aside-left">
        <div id="list-conversation" class="list-conversation">
           
            
        </div>
        <form id="add-conversation-form" class="add-conversation-form">
            <div class="input-wrapper">
                <input id="form-add-input-title" type="text" name="title" placeholder="Conversation-title">
                <div id="title-error" class="message-error"></div>
            </div>
            <div class="input-wrapper">
            <input id="form-add-input-email" type="email" name="friendEmail" placeholder="Your friend mail">
            <div id="friend-email-error" class="message-error"></div>
            </div>
            <button id="form-add-btn-submit" class="btn-icon" type="submit"><i class="fas fa-plus"></i></button>
        </form>
    </div>
    <div class="current-conversation">
      <div id='message-container' class="message-container">
        
      </div>
      <form id="form-chat" class="form-chat">
        <div class="input-wrapper">
          <input id="form-chat-input" type="text" name="message" placeholder="Enter your message">
        </div>
        <button id="form-chat-submit-btn" type="submit">Send</button>
      </form>
    </div>
    <div class="aside-right">
    <div class="details-current-conversation">
        <div id="list-users" class="list-users">
            
            

        </div>
        <div id="created-at" class="created-at">
        </div>
        <div class="leave-conversation-wrapper">
        <div id="leave-conversation-error" class="error-message"></div>
            <button id="leave-conversation-btn">Exit room chat
            </button>
        </div>
    </div>
    </div>
  </section>
    `

component.loading = `
    <div class = 'loading-container'> 
    <img src="../img/loading.jpg">
    </div>`


component.nav = `
    <nav class="main-nav">
    <div class="user-profile">
      <span class="user-display-name" id="user-display-name"></span>
      <button class="btn-icon" id="btn-sign-out"><i class="fas fa-sign-out-alt"></i></button>
    </div>
  </nav>
  `

