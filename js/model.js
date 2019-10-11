const model = {
    conversations: null, // tat ca hoi thoai cua nguoi dung
    currentConversation: null // hoi thoai dang duoc hien thi
}

model.saveConversations = function(conversations) {
    model.conversations = conversations
}

model.saveCurrentConversation = function(conversation){
    model.currentConversation = conversation
}

model.updateConversation = function(conversation){
    //1. conversation already exist in model.conversations >> update to model.conversations
    //2. conversation not yet exist in model.conversations >> push to model.conversations
    let existedIndex = model.conversations.findIndex(function(element){
        return element.id == conversation.id
    })
    if (existedIndex >= 0) {
        model.conversations[existedIndex] = conversation
    }else{
        model.conversations.push(conversation)
    }
}

model.removeConversation = function(conversation){
    let existedIndex = model.conversations.findIndex(function(ele){
        return ele.id == conversation.id
    })
    if (existedIndex >= 0) {
        model.conversations.splice(existedIndex, 1)
    }
}