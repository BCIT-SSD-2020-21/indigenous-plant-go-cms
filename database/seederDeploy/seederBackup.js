const {usersList} = require('./users')
const {categoriesList} = require('./categories')
const {tagsList } = require('./tags')
const {locationsList} = require("./locations")
const {imagesList} = require('./images')
const {audiosList} = require('./audios')
const {videosList} = require('./videos')

const {MongoClient, ObjectID, Timestamp} = require('mongodb')
require('dotenv').config()

const url = process.env.MONGO_DB_URL_DEV
const dbName = process.env.MONGO_DB_NAME_DEV
const client = new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true})

const seed = async () => {

  await client.connect()
  const db = client.db(dbName)

  // Drop Database | Clean Slate
  await db.dropDatabase()

  // List of  collections
  const users = db.collection('users')
  const images = db.collection('images')
  const audios = db.collection('audios')
  const videos = db.collection('videos')
  const locations = db.collection('locations')
  const categories = db.collection('categories')
  const tags = db.collection('tags')
  const waypoints = db.collection('waypoints')
  const plants = db.collection('plants')
  const revisions = db.collection('revisions')

  // INSERT DATA TO MONGODB
  await users.insertMany(usersList)
  await images.insertMany(imagesList)
  await videos.insertMany(videosList)
  await audios.insertMany(audiosList)
  await locations.insertMany(locationsList)
  await categories.insertMany(categoriesList)
  await tags.insertMany(tagsList)

  

  // Insert Plants
  const lavenderImage1 = await images.findOne({"caption": "lavender"})
  const kinnikinnickImage1 = await images.findOne({"caption": "kinnikinnick"})
  const coastalImage1 = await images.findOne({"caption": "coastal strawberry"})
  const salalImage1 = await images.findOne({"caption": "salal"})
  const snowberryImage1 = await images.findOne({"caption": "snowberry"})
  const swordfernImage1 = await images.findOne({"caption": "swordfern"})
  const westerncedarImage1 = await images.findOne({"caption": "western cedar"})
  
  
  
  const lavenderLocation1 = await locations.findOne({"location_name": "Lavender 1",})
  const kinnikinnickLocation1 = await locations.findOne({"location_name": "Kinnikinnick 1"})
  const coastalLocation1 = await locations.findOne({"location_name": "Coastal Strawberry 1"})
  const salalLocation1 = await locations.findOne({"location_name": "Salal 1"})
  const snowberryLocation1 = await locations.findOne({"location_name": "Snowberry 1"})
  const swordfernLocation1 = await locations.findOne({ "location_name": "Sword Ferns 1"})
  const westerncedarLocation = await locations.findOne({"location_name" : "Western Red Cedar 1"})
  const lotOLocation1 = await locations.findOne({"location_name": "Lot O (general)"})
  const englishwalkLocation1 = await locations.findOne({"location_name": "English Walk (general)"})
  
  const user1 = await users.findOne({"user_name": "admin"})
  await revisions.insertMany([
    { 
      "user": user1._id,
      "date": 1619651670890
    },
    {
      "user": user1._id,
      "date": 1619650526501
    },
    {
      "user": user1._id,
      "date": 1619650526502
    },
    {
      "user": user1._id,
      "date": 1619650526503
    },
    {
      "user": user1._id,
      "date": 1619650526504
    },
    {
      "user": user1._id,
      "date": 1619650526505
    },
    {
      "user": user1._id,
      "date": 1619650526506
    },
    {
      "user": user1._id,
      "date": 1619650526507
    },
    {
      "user": user1._id,
      "date": 1619650526508
    },
    {
      "user": user1._id,
      "date": 1619650526509
    },
    {
      "user": user1._id,
      "date": 1619650526510
    },
    {
      "user": user1._id,
      "date": 1619650526511
    },
    {
      "user": user1._id,
      "date": 1619650526512
    },
    {
      "user": user1._id,
      "date": 1619650526513
    },
    {
      "user": user1._id,
      "date": 1619650526514
    },
    {
      "user": user1._id,
      "date": 1619650526515
    },
    {
      "user": user1._id,
      "date": 1619650526516
    },
    {
      "user": user1._id,
      "date": 1619650526517
    },
    {
      "user": user1._id,
      "date": 1619650526518
    },
    {
      "user": user1._id,
      "date": 1619650526519
    },
    {
      "user": user1._id,
      "date": 1619650526520
    },
    
  ])
  const revision_history1 = await revisions.findOne({"date": 1619651670890})
  const revision_history2 = await revisions.findOne({"date": 1619650526501})
  const revision_history3 = await revisions.findOne({"date": 1619650526502})
  const revision_history4 = await revisions.findOne({"date": 1619650526503})
  const revision_history5 = await revisions.findOne({"date": 1619650526504})

  const revision_history6 = await revisions.findOne({"date": 1619650526505})
  const revision_history7 = await revisions.findOne({"date": 1619650526506})
  const revision_history8 = await revisions.findOne({"date": 1619650526507})
  const revision_history9 = await revisions.findOne({"date": 1619650526508})
  const revision_history10 = await revisions.findOne({"date": 1619650526509})

  const revision_history11 = await revisions.findOne({"date": 1619650526510})
  const revision_history12 = await revisions.findOne({"date": 1619650526511})
  const revision_history13 = await revisions.findOne({"date": 1619650526512})
  const revision_history14 = await revisions.findOne({"date": 1619650526513})
  const revision_history15 = await revisions.findOne({"date": 1619650526514})

  const revision_history16 = await revisions.findOne({"date": 1619650526515})
  const revision_history17 = await revisions.findOne({"date": 1619650526516})
  const revision_history18 = await revisions.findOne({"date": 1619650526517})
  const revision_history19 = await revisions.findOne({"date": 1619650526518})
  const revision_history20 = await revisions.findOne({"date": 1619650526519})


  await plants.insertMany([
    {
      "plant_name": "lavender",
      "scientific_name": "lavandula",
      "description": "Lavender is a perennial shrub with purple flowers that bloom during the summer",
      "images" : [lavenderImage1._id],
      "locations" : [lavenderLocation1._id],
      "isPublish" : true,
      "videos" : [],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history1._id],
      "custom_fields" : []
    },
    {
      "plant_name": "kinnikinnick",
      "scientific_name": "arctostaphylos uva-ursi",
      "description": "Kinnikinnick is an evergreen ground cover. It has small white or pink flowers that typically bloom in May and June, and red berries later in the season. Kinnikinnick attracts butterflies and other pollinators. It’s a food source for wildlife all year round.",
      "images" : [kinnikinnickImage1._id],
      "locations" : [kinnikinnickLocation1._id],
      "isPublish" : true,
      "videos" : [],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history2._id],
      "custom_fields" : []
    },
    {
      "plant_name": "Coastal Strawberry",
      "scientific_name": "Coastal Strawberry",
      "description": "This evergreen ground cover has three leaves, and white flowers that bloom in the summer. The coastal strawberry attracts pollinators. It’s a food source for wildlife in the spring and summer.",
      "locations" : [coastalLocation1._id],
      "images" : [coastalImage1._id],
      "isPublish" : true,
      "videos" : [],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history3._id],
      "custom_fields" : []
    },
    {
      "plant_name": "Salal",
      "scientific_name": "Gaultheria shallon ",
      "description": "Salal is a perennial evergreen shrub. Salal attracts pollinators and hummingbirds. It’s a food source for wildlife all year round.",   
      "locations" : [salalLocation1._id],
      "isPublish" : true,
      "images" : [salalImage1._id],
      "videos" : [],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history4._id],
      "custom_fields" : []
    },
    {
      "plant_name": "Snowberry",
      "scientific_name": "Symphoricarpos albus",
      "description": "These shrubs have white flowers in spring, and white berries through the fall and winter.",   
      "locations" : [snowberryLocation1._id],
      "isPublish" : true,
      "images" : [snowberryImage1._id],
      "videos" : [],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history5._id],
      "custom_fields" : []
    },
    {
      "plant_name": "Snow Fern" ,
      "scientific_name": "Polystichum munitum",
      "description": "Sword fern gets its name from its elongated blade-like fronds. The robust, handsome leaves can grow several feet long and the plant can have as many as a hundred leaves. This evergreen fern can be used to prevent erosion on slopes. Sword ferns are a food source for wildlife all year round.",   
      "locations" : [swordfernLocation1._id],
      "isPublish" : true,
      "images" : [swordfernImage1._id],
      "videos" : [],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history6._id],
      "custom_fields" : []
    },
    {
      "plant_name": "Western Red Cedar",
      "scientific_name": "Thuja plicata",
      "description": "Western Red Cedar is a large evergreen tree, they can grow to 120 – 150 feet. Western Red cedar are a food source for wildlife all year round. Because cedar is resistant to decay it was used for building long houses, canoes and other items. The bark can be shredded and used to weave.",   
      "locations" : [westerncedarLocation._id, lotOLocation1._id],
      "isPublish" : true,
      "images" : [westerncedarImage1._id],
      "videos" : [],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history7._id],
      "custom_fields" : []
    },
    {
      "plant_name": "Stika Spruce",
      "scientific_name": "Picea sitchensis",
      "description": "The Sitka Spruce is a conifer tree that can grow to 180 – 225 feet tall. ",   
      "locations" : [lotOLocation1._id],
      "isPublish" : true,
      "videos" : [],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history8._id],
      "custom_fields" : []
    },
    {
      "plant_name": "Big Maple Leaf",
      "scientific_name": "Acer macrophyllum",
      "description": "Big Leaf Maples typically grow to 30 – 75 feet, and may live to be 200 years old. It is a food source for wildlife. ",   
      "locations" : [lotOLocation1._id],
      "isPublish" : true,
      "videos" : [],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history9._id],
      "custom_fields" : []
    },
    {
      "plant_name": "Salmonberry",
      "scientific_name": "Rubus Spectabilis",
      "description": "Salmonberry have pink flowers with five petals in April - May, and yellow-orange berries through May - July. The flowers are attractive to hummingbirds, and the plant is a food source for wildlife in summer.",   
      "locations" : [lotOLocation1._id],
      "isPublish" : true,
      "videos" : [],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history10._id],
      "custom_fields" : []
    },
    {
      "plant_name": "Red Elderberry",
      "scientific_name": "Sambucus racemosa",
      "description": "Red Elderberry have white flowers in April - July, and bright red berries through July – August. Red Elderberry is used for erosion control. The plant is a food source for wildlife and pollinators.",   
      "locations" : [lotOLocation1._id],
      "isPublish" : true,
      "videos" : [],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history11._id],
      "custom_fields" : []
    },
    {
      "plant_name": "Red-Osier Dogwood",
      "scientific_name": "cornus sericea arctic",
      "description": "Placeholder description",   
      "locations" : [lotOLocation1._id, englishwalkLocation1._id],
      "isPublish" : true,
      "videos" : [],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history12._id],
      "custom_fields" : []
    },
    {
      "plant_name": "Thimbleberry",
      "scientific_name": "Rubus parviflorus",
      "description": "Thimbleberry have white flowers in May - June, and small red berries through July – September. The plant is a food source for wildlife and pollinators during summer.",   
      "locations" : [lotOLocation1._id],
      "isPublish" : true,
      "videos" : [],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history13._id],
      "custom_fields" : []
    },
    {
      "plant_name": "Evergreen Huckleberry",
      "scientific_name": "Vaccinium ovatum",
      "description": "Evergreen Huckleberry have pinkish-white flowers in April - May, and purplish-black berries through August – September. The plant is a food source for wildlife and pollinators.",   
      "locations" : [englishwalkLocation1._id],
      "isPublish" : true,
      "videos" : [],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history14._id],
      "custom_fields" : []
    },
  ])


  //Insert Waypoints
  // 12. Insert Waypoint
  const threeSistersLocation = await locations.findOne({ "location_name": "The Three Sisters"})
  const gatheringPlaceLocation = await locations.findOne({"location_name": "The Indigenous Initiatives Gathering Place"})
  const housePostLocation = await locations.findOne({ "location_name": "The House Post"})
  const sweatLodgeLocation = await locations.findOne({ "location_name": "The Sweat Lodge"})
  const gatheringVideo1 = await videos.findOne({"caption": "The Indigenous Initiatives Gathering Place"})
  const housePostVideo1 = await videos.findOne({"caption": "The House Post"})
  
  const threesistersImage1 = await images.findOne({ "caption": "three sisters"})
  const gatheringplaceImage1 = await images.findOne({"caption": "gathering place"})
  const housepostImage1 = await images.findOne({"caption": "house post"})
  const sweatlodgeImage1 = await images.findOne({"caption": "sweat lodge"})
  
  await waypoints.insertMany([
    {
      "waypoint_name": "The Three Sisters",
      "description": "Coming Soon – Corn, Beans and Squash are the Three Sisters.",
      "locations": [threeSistersLocation._id],
      "isPublish" : true,
      "videos" : [],
      "images":[threesistersImage1._id],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history15._id],
      "custom_fields" : [],
      "plants":[],
    },
    {
      "waypoint_name": "The Indigenous Initiatives Gathering Place",
      "description": "The Indigenous Gathering Place is a comfortable, welcoming and safe space for students, families and staff. Mi Chap Tukw, the BCIT Indigenous Gathering Place (IGP) is located on the Burnaby campus at SW1-1521.",
      "locations": [gatheringPlaceLocation._id],
      "videos":[gatheringVideo1._id],
      "isPublish" : true,
      "images":[gatheringplaceImage1._id],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history16._id],
      "custom_fields" : [],
      "plants":[],
    },
    {
      "waypoint_name": "The House Post",
      "description": "This Indigenous house post was created by Aaron Nelson-Moody. House posts were part of traditional Coat Salish longhouses. This house post was commissioned to mark BCIT's 50th anniversary.",
      "locations": [housePostLocation._id],
      "videos" : [housePostVideo1._id],
      "isPublish" : true,
      "images":[housepostImage1._id],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history17._id],
      "plants":[],
      "custom_fields" : [
        { 
          "_id" : new ObjectID(),
          "field_title": "Website",
          "content": "https://housepost.commons.bcit.ca/"
        }
      ]
    },
    {
      "waypoint_name": "The Sweat Lodge",
      "description": "A sweat lodge ceremony is a gentle and caring approach to the cleansing of your mind, body, and spirit. Through the experience, your body is cleansed of the toxins within your body, which aids in the de-stressing of your mental, emotional, physical and spiritual well-being.",
      "locations": [sweatLodgeLocation._id],
      "isPublish" : true,
      "images":[sweatlodgeImage1._id],
      "audio_files" : [],
      "categories" : [],
      "tags" : [],
      "revision_history" : [revision_history18._id],
      "custom_fields" : [
        { 
          "_id" : new ObjectID(),
          "field_title": "Website",
          "content": "https://www.bcit.ca/indigenous-services/events/traditional-ceremonies/"
        }
      ]
    },
   
  ])

}

// IV. Run function
;(async ()=> {
  await seed()
  console.log("Mongo Connected!!");
  await client.close();
}
)()

