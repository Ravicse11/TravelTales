const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/ravi');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 100);
        const random100 = Math.floor(Math.random() * 50);
        const camp = new Campground({
            author: '642054cf5ba4f18bd3f7cc43',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,

            price: random100,
            description: "this ia description this is now a hardcode but i will change just when i get into it",
            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude, cities[random1000].latitude]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dxqa0hv73/image/upload/v1679972356/YelpCamp/e48obxehttzvz7ovbjn5.jpg',
                    filename: 'YelpCamp/e48obxehttzvz7ovbjn5',

                },
                {
                    url: 'https://res.cloudinary.com/dxqa0hv73/image/upload/v1679972358/YelpCamp/usmu1sy3dqonhinx4j7u.jpg',
                    filename: 'YelpCamp/usmu1sy3dqonhinx4j7u',

                }
            ]

        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})