const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground.js');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '618b4094117f55982275fdc9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [-113.1331, 47.0202]
            },
            images: [
              {
                url: 'https://res.cloudinary.com/dwvuwcr5u/image/upload/v1636666916/YelpCamp/qssh4dhjqczg6igyr2j7.png',
                filename: 'YelpCamp/qssh4dhjqczg6igyr2j7',
              },
              {
                url: 'https://res.cloudinary.com/dwvuwcr5u/image/upload/v1636666927/YelpCamp/q5dh4ql1mjxyavmystci.png',
                filename: 'YelpCamp/q5dh4ql1mjxyavmystci',
              }
            ],
        })
        await camp.save();
    }
}

seedDB().then(() => {
  mongoose.connection.close();
})
