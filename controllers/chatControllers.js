const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.handleIndex = (req, res)=>{
    if(req.user){
        res.redirect('/chat')
        return;
    }
    res.render('index',{
        title:"Home"
    })
}

exports.handleChat = async (req,res)=>{
    const users = await User.aggregate({
        $project:{
            _id:1,
            name:1
        }
    });
    res.render('chat',{
        title:'Chat',
        users
    })
}