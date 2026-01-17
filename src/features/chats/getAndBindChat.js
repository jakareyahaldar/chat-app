const api = process.env.REACT_APP_API_URL


function getAndBindChats(chats) {
    return new Promise(async (resolve) => {
        try {
            const ReturnChats = []
            // Validate data 
            const isValid = chats ? (chats.length ? chats : null) : null
            if (!isValid) throw Error("invalid data !")

            // Now start geting messsages 
            for (const chat of chats) {
                console.log(chat)
                const isHaveMessage = chat ? (chat.messages ? (chat.messages.length ? chat.messages : null) : null) : null
                if (isHaveMessage) {
                    // sent request to server 
                    let response = await fetch(api + "/message/get-message/", {
                        method: "POST",
                        headers: { "content-type": "application/json" },
                        body: JSON.stringify(isHaveMessage)
                    })
                    if (response.ok) {
                        response = await response.json()
                        // Extract messages 
                        const onlineMessages = response.map(e => e.message_data)
                        ReturnChats.push({ ...chat, messages: onlineMessages })
                    } else {
                        ReturnChats.push({ ...chat, messages: [] })
                    }
                } else {
                    ReturnChats.push(chat)
                }
            }
            console.log(ReturnChats)
            resolve(ReturnChats)
        } catch (err) {
            console.log(err)
            resolve(null)
        }
    })
}

export default getAndBindChats