exports.handleIndex = (req, res)=>{
    if(req.user){
        res.redirect('/chat')
        return;
    }
    res.render('index',{
        title:"Home"
    })
}

exports.handleChat = ()=>{
    res.render('chat',{
        title:'Chat'
    })
}