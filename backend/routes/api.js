const api = require('express').Router();
const Order = require('../models/order');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode')
const keys = require('../config/keys')

const {validateLogin, validateRegister} = require('../utils/Validation')
module.exports = api;

api.get('/getData', (req, res) => {
    Order.find((err, data) => {
        if (err) {
            return res.json({ 
                success: false, error: err 
            });
        }

        return res.json({ 
            success: true, data: data 
        });
    });
});

api.get('/getData/:id', (req, res) => {
    Order.find((err, data) => {
        if (err) {
            return res.json({ 
                success: false, error: err 
            });
        }

        let findId = data.find(element => element._id == req.params.id)

        return res.json({ 
            success: true, data: findId
        });
    });
});

// this is our update method
// this method overwrites existing data in our database
api.post('/updateData', (req, res) => {
    const { id, update } = req.body;
    Order.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

// this is our delete method
// this method removes existing data in our database
api.delete('/deleteData', (req, res) => {
    const { id } = req.body;
    Order.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
});

// this is our create methid
// this method adds new data in our database
api.post('/putOrder', (req, res) => {
    let data = new Order();
    const {id, brandname, brandspec, description, price, imgs, byUser} = req.body;
    if ((!id && id !== 0)) {
        return res.json({
            success: false,
            error: 'INVALID INPUTS',
        });
    }
    data.price = price;
    data.description = description;
    data.brandspec = brandspec;
    data.brandname = brandname;
    data.id = id;
    data.imgs = imgs;
    data.byUser = byUser;
    console.log(req.body);
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
});

const User = require('../models/User')

api.get('/getuser/:id', (req, res) => {
    User.find((err, data) => {
        if (err) {
            return res.json({ 
                success: false, error: err 
            });
        }

        let findId = data.find(element => element._id == req.params.id)

        if(findId) {
            return res.json({ 
                success: true, data: {
                    _id: findId._id,
                    name: findId.name,
                    email: findId.email,
                    uploads: findId.uploads,
                    bookmarks: findId.bookmarks,
                    chatparties: findId.chatparties
                }
            });
        } else {
            return res.json({
                success: false, error: "Profile doesn't exist."
            })
        }
    });
})

api.post('/addtobookmarks', (req, res) => {
    const { _id, imgPath, userID } = req.body;

    let decodedUserId = userID
    if (userID.includes("Bearer")) {
        const decoded = jwt_decode(userID);
        decodedUserId = decoded.id;
    }

    User.findById(decodedUserId)
    .then(user => {
        if (!user.bookmarks.some(element => element._id == _id)) {
            User.updateOne({bookmarks: user.bookmarks.concat({_id, imgPath})}, (err, res) => {
                if (err) {
                    return `err: ${err}`
                } else if (res) {
                    return 'Bookmarks updated'
                }
            })

            return res.status(201).json({
                success: true,
                bookmarks: user.bookmarks.concat({_id, imgPath})
            })
        
        } else {
            throw new Error("Selected work is already in bookmarks!")
        }
    })
    .catch(err => console.log(err))

})

api.post('/removebookmark/:id', (req, res) => {
    const { userID } = req.body;
    const { id } = req.params
    User.findById(userID)
    .then(user => {
        const bookmarkIndex = user.bookmarks.findIndex(element => element._id == id)
        if (bookmarkIndex !== -1) {
            user.bookmarks.splice(bookmarkIndex, 1);
            User.updateOne({bookmarks: user.bookmarks}, (err, res) => {
                if (err) {
                    return ({
                        error: "Bookmark not found."
                    })
                } else {
                    return ({
                        response: user.bookmarks
                    })
                }
            })
            return res.status(201).json({
                success: true,
                    bookmarks: user.bookmarks,
                    bookmarkAdded: "Bookmark removed."
            })
        } else {
            return res.status(412).json({
                notFound: "Bookmark's ID not found."
            })
        }
    })
    .catch(err => res.status(412).json({
        error: "Operation couldn't be done."
    }))

})

api.post('/login', (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
        return res.status(412).json(errors);
    }

    User.findOne({email})
    .then(user => {
        if (!user) {
            return res.status(412).json({emailnotfound: "Email not found!"})
        }
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    name: user.name
                };

                jwt.sign(payload, keys.secretOrKey, {expiresIn: 31536000}, (err, token) => {
                    res.json({
                        success: true,
                        token: `Bearer ${token}`
                    })
                })
            } else {
                return res.status(412).json({passwordIncorrect: "Password incorrect" });
            }
        })
    })
})

api.post('/register', (req, res) => {
    const {name, email, password, key} = req.body;
    const {errors, isValid} = validateRegister(req.body)

    if (!isValid) {
        return res.status(412).json(errors);
    }
    
    User.findOne({email})
    .then(user => {
        if (user) {
            res.status(412).json({email: "Email already exists!"})
        } else {
            const newUser = new User({
                name,
                email,
                password,
                dailyUploadsLimit: 2,
                dailyUploads: 0,
                lastUploadDate: 0
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) {
                        throw err;
                    } 
                    newUser.password = hash;
                    newUser.save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err))
                })
            })
        }
    })
    //res.status(200).send(req.body)
})