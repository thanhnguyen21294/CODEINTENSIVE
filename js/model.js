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
