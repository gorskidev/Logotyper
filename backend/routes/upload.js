let express = require('express'),
multer = require('multer'),
mongoose = require('mongoose'),
uuidv4 = require('uuid/v4'),
router = express.Router();
mkdirp = require('mkdirp');

const DIR = './imgs/';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(Object.keys(file))
        cb(null, DIR);
    }, filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-');
    cb(null, uuidv4() + '-' + fileName)
    }
});

let upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// Image model
let Image = require('../models/uploadimage');
// User model
let User = require('../models/User');

router.post('/image', upload.single('imgPath'), (req, res, next) => {
    const { title, price, tags, author, author_id } = req.body;
    const url = req.protocol + '://' + req.get('host')
    
    User.findById(author_id)
    .then(user => {
        // Check if 12h passed
        const timeCondition = (Date.now() - user.lastUploadDate)/3600000 >= 12   
        // Check if 12h passed
        if (timeCondition) {
            // If passed, change dailyUploads to 0 and updateLastUploadDate | (Reset)
            User.update({dailyUploads: 0, lastUploadDate: Date.now()}, (err, res) => {
                if (err) {
                    console.log("Error! " + err)
                } else {
                    console.log(res)
                }
            })
        }
        // Check for daily upload limit. If 12h passed then check if user is eligible to upload new picture.
        if (user && (user.dailyUploads < user.dailyUploadsLimit)) {
            const uploadImage = new Image({
                _id: new mongoose.Types.ObjectId(),
                imgPath: url + '/imgs/' + req.file.filename,
                author,
                author_id,
                title,
                price,
                tags,
            });

            uploadImage.save().then(result => {
                const uploads = user.uploads || []
                const element = {_id: result._id, imgPath: result.imgPath}
                User.update({uploads: uploads.concat(element), lastUploadDate: Date.now(), dailyUploads: user.dailyUploads + 1}, (err, res) => {
                    if (err) {
                        console.log("Error! Couldn't update user's uploads' array.")
                    } else {
                        console.log("User's uploads' array updated.")
                    }
                })

                res.status(201).json({
                    message: "Image uploaded successfully!",
                    uploadedImage: {
                        _id: result._id,
                        imgPath: result.imgPath
                    },
                    title: result.title
                })
            })
            .catch(err => {
                console.log(err),
                res.status(500).json({
                    error: err
                });
            })
        } else {
            return res.status(412).json({error: 'You have exceeded the limit of daily uploads!'})
        }
    })

    /*const uploadImage = new Image({
        _id: new mongoose.Types.ObjectId(),
        imgPath: url + '/imgs/' + req.file.filename,
        author,
        author_id,
        title,
        price,
        tags,
    });*/
    /*uploadImage.save().then(result => {
        res.status(201).json({
            message: "Image uploaded successfully!",
            uploadedImage: {
                _id: result._id,
                imgPath: result.imgPath
            },
            title: result.title
        })*/
    /*.catch(err => {
        console.log(err),
        res.status(500).json({
            error: err
        });
    })*/
})

router.get("/getUploads", (req, res, next) => {
    Image.find().then(data => {
   res.status(200).json({
       message: "User list retrieved successfully!",
       users: data
   });
});
});

router.get('/getUploads/:id', (req, res, next) => {
    Image.find((err, data) => {
        if (err) {
            return res.json({
                success: false,
                error: err
            })
        }

        const findId = data.find(element => element._id == req.params.id)
        if(findId) {
            return res.json({
                success: true,
                _id: findId._id,
                imgPath: findId.imgPath,
                title: findId.title,
                author: findId.author,
                author_id: findId.author_id,
                price: findId.price,
            })
        } else {
            console.log("Not found")
            return res.json({
                success: false,
                error: "Data not found."
            })
        }
    })
})

module.exports = router;