export const getUnreadNotifications=(notifications)=>{

    const unreadNotifications=notifications?.filter((note)=>{
        return note.isRead===false;
    })

    return unreadNotifications
}