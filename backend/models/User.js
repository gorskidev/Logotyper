const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        uploads: {
            type: Array,
            required: false
        },
        dailyUploads: {
            type: Number,
            required: false
        },
        dailyUploadsLimit: {
            type: Number,
            required: true
        },
        lastUploadDate: {
            type: Date,
            required: false
        },
        bookmarks: {
            type: Array,
            required: false
        },
    },
    {
        timestamps: true
    },
    {
        collection: 'users'
    }
)

module.exports = mongoose.model("User", UserSchema)
*/

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        uploads: {
            type: Array,
            required: false
        },
        dailyUploads: {
            type: Number,
            required: false
        },
        dailyUploadsLimit: {
            type: Number,
            required: true
        },
        lastUploadDate: {
            type: Date,
            required: false
        },
        bookmarks: {
            type: Array,
            required: false
        },
        chatparties: {
            type: Array,
            required: false
        }
    },
    {
        timestamps: true
    },
    {
        collection: 'global'
    }
)

const db = mongoose.connection.useDb('test');
const UserInfo = db.model('user', UserSchema)
module.exports = UserInfo