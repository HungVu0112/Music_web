module.exports = {
    multipleMongooseToObject: function (mongoose) {
        return mongoose.map(mongoose => mongoose.toObject())
    },

    mongooseToobject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose
    }
}
