const {MongoClient, ObjectID, Timestamp} = require('mongodb')
require('dotenv').config()

const url =  process.env.MONGO_DB_URL 
const dbName = process.env.MONGO_DB_NAME 
const client = new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true})

const seed = async () => {

  await client.connect()
  const db = client.db(dbName)

  // I. Drop Database | Clean Slate
  await db.dropDatabase()

  // II. List of  collections
  const users = db.collection('users')
  const plants = db.collection('plants')
  const images = db.collection('images')
  const audios = db.collection('audios')
  const videos = db.collection('videos')
  const locations = db.collection('locations')
  const categories = db.collection('categories')
  const tags = db.collection('tags')
  const revisions = db.collection('revisions')
  //const custom_fields = db.collection('custom_fields')
  const waypoint_categories = db.collection('waypoint_categories')
  const waypoints = db.collection('waypoints')
  const learn_more = db.collection('learn_more')
  const tours = db.collection('tours')

  // III. Insert Data to mongoDB
  // 1. Insert Users
  await users.insertMany([
    {
      "email" : "bob@test.ca",
      "user_name" : "bob",
      "password" : "$2a$12$V.slVAcWMlWxKNw7qbYEcO5UvkYBOvMMu2nKvkyPVZh5bE93EfCUu",
      "role" : "Admin"    
    },
    {
      "email" : "charli@test.ca",
      "user_name" : "charli",
      "password" : "$2a$12$exIUEGDgWU.l2mJU78JIBOJvwA1j/OHmp5OidfVVfrEiFBotD91.C",
      "role" : "Manager"
    
    }
  ])

  // 2. Insert Images
  await images.insertMany([
    {
      "image_url": "https://indigenous-plant.s3-us-west-2.amazonaws.com/lavender-1.png",
      "caption": "lavender"
    },
    {
      "image_url": "https://indigenous-plant.s3-us-west-2.amazonaws.com/kinnikinnick-1.png",
      "caption": "kinnikinnick"
    }
  ])

  // 3. Insert Videos
  await videos.insertMany([
    {
      "video_url": "https://www.youtube.com/watch?v=-EfK8OhRElI",
      "caption": "A lavender flower blooming timelapse"
    },
    {
      "video_url": "https://www.youtube.com/watch?v=lhqNduGgpC8",
      "caption": "A kinnikinnick flower blooming timelapse"
    }
  ])

  // 4. Insert Audios
  await audios.insertMany([
    {
      "audio_file_url": "https://indigenous-plant.s3-us-west-2.amazonaws.com/sound-1.mp3",
      "caption": "lavender"
    },
    {
      "audio_file_url": "https://indigenous-plant.s3-us-west-2.amazonaws.com/sound-2.mp3",
      "caption": "kinnikinnick"
    }
  ])

  // 5. Insert Locations
  await locations.insertMany([
    {
      "location_name": "SW1",
      "latitude": 49.251508,
      "longitude": -123.003891,
      "description": "infront of SW1"
    },
    {
      "location_name": "SW2",
      "latitude": 49.2516282,
      "longitude": -123.0003427,
      "description": "infront of SW2"
    }
  ])

  // 6. Insert Categories
  await categories.insertMany([
    {
      "category_name": "caryophyllaceae",
      "resource": "plant",
    },
    {
      "category_name": "asteraceae",
      "resource": "plant",
    },
    {
      "category_name": "medicinal",
      "resource": "plant",
    },
    {
      "category_name": "SE14",
      "resource": "waypoint",
    },
    {
      "category_name": "SW01",
      "resource": "waypoint",
    },
    {
      "category_name": "SW02",
      "resource": "waypoint",
    },
    {
      "category_name": "english walk",
      "resource": "tour",
    },
    {
      "category_name": "hidden gem",
      "resource": "tour",
    },
    {
      "category_name": "scenic",
      "resource": "tour",
    },
    {
      "category_name": "historic",
      "resource": "learn_more",
    },
    {
      "category_name": "legend",
      "resource": "learn_more",
    },
    {
      "category_name": "seasonal",
      "resource": "learn_more",
    }
  ])
  
  const plant_category1 = await categories.findOne({"category_name": "caryophyllaceae"})
  const plant_category2 = await categories.findOne({"category_name": "asteraceae"})
  const tour_category1 = await categories.findOne({"category_name" : "english walk"})
  const tour_category2 = await categories.findOne({"category_name" : "scenic"})
  const waypoint_category1 = await categories.findOne({"category_name": "SW01"})
  const waypoint_category2 = await categories.findOne({"category_name": "SW02"})
  
  // 7. Waypoint  Categories
  // await waypoint_categories.insertMany([
  //   {
  //     "categories" : [waypoint_category1._id, waypoint_category2._id] 
  //   }
  // ])
  
  // // 8. Insert Plant Categories
  // await plant_categories.insertMany([
  //   {
  //     "categories" : [plant_category1._id, plant_category2._id] 
  //   },
  // ])
  
  // // 9. Insert Tour Categories
  // await tour_categories.insertMany([
  //   {
  //     "categories" : [tour_category1._id, tour_category2._id] 
  //   }
  // ])
  
  // 10. Insert Tags
  await tags.insertMany([
    {
      "tag_name": "healing"
    },
    {
      "tag_name": "luck"
    }
  ])

  // 8. Insert Custom Fields
  // await custom_fields.insertMany([
  //   {
  //     "field_title" : "Water Intake",
  //     "content" : "Daily"
  //   },
  //   {
  //     "field_title" : "Color",
  //     "content" : "Indigo"
  //   }
  // ])

  // 9. Insert Revision Histroy
  const user1 = await users.findOne({"user_name": "bob"})
  const user2 = await users.findOne({"user_name": "charli"})

  await revisions.insertMany([
    { 
      "user": user1._id,
      "date": 1619552925
    },
    {
      "user": user2._id,
      "date": 1619552956
    },
    {
      "user": user1._id,
      "date": 1619561239
    },
    {
      "user": user1._id,
      "date": 1619129239
    },
    
  ])

  // 13. Insert Plants
  const image1 = await images.findOne({"caption": "lavender"})
  const image2 = await images.findOne({"caption": "kinnikinnick"})
  const video1 = await videos.findOne({"video_url": "https://www.youtube.com/watch?v=-EfK8OhRElI"})
  const video2 = await videos.findOne({"video_url": "https://www.youtube.com/watch?v=lhqNduGgpC8"})
  const audio1 = await audios.findOne({"caption": "lavender"})
  const audio2 = await audios.findOne({"caption": "kinnikinnick"})
  const location1 = await locations.findOne({"location_name": "SW1"})
  const location2 = await locations.findOne({"location_name": "SW2"})
  const category1 = await categories.findOne({"category_name": "caryophyllaceae",})
  const category2 = await categories.findOne({ "category_name": "asteraceae"})
  const tag1 = await tags.findOne({"tag_name": "healing"})
  const tag2 = await tags.findOne({"tag_name": "luck"})
  // const custom_field1 = await custom_fields.findOne({"field_title" : "Water Intake"})
  // const custom_field2 = await custom_fields.findOne({"content" : "Daily"})
  const revision_history1 = await revisions.findOne({"user": user1._id})
  const revision_history2 = await revisions.findOne({"user": user2._id})
  const revision_history3 = await revisions.findOne({"date": 1619561239})
  const revision_history4 = await revisions.findOne({"date": 1619129239})
  
  await plants.insertMany([
    {
      "plant_name": "lavender",
      "scientific_name": "lavandula",
      "description": "Lavender is a perennial shrub with purple flowers that bloom during the summer",
      "images" : [image1._id],
      "videos" : [video1._id],
      "audio_files" : [audio1._id],
      "locations" : [location1._id],
      "categories" : [plant_category1._id],
      "tags" : [tag1._id],
      //"custom_fields" : [custom_field1._id],
      "revision_history" : [
        revision_history1._id, 
        revision_history3._id, 
        revision_history4._id],
      "custom_fields" : [
        { 
          "_id" : new ObjectID(),
          "field_title": "Medicial Properties",
          "content": "Helps alleviate headaches and nausea"
        }
      ]
    },
    {
      "plant_name": "kinnikinnick",
      "scientific_name": "arctostaphylos uva-ursi",
      "description": "Kinnikinnick is an evergreen ground cover. It has small white or pink flowers that typically bloom in May and June, and red berries later in the season. Kinnikinnick attracts butterflies and other pollinators. It’s a food source for wildlife all year round. ",
      "images" : [image2._id],
      "videos" : [video2._id],
      "audio_files" : [audio2._id],
      "locations" : [location2._id],
      "categories" : [plant_category2._id],
      "tags" : [tag2._id],
      //"custom_fields" : [custom_field2._id],
      "revision_history" : [revision_history2._id],
      "custom_fields" : [
        { 
          "_id" : new ObjectID(),
          "field_title": "Medicial Properties",
          "content": "It contains the glycoside arbutin, which has antimicrobial properties and acts as a mild diuretic."
        }
        ,
        {
          "_id" : new ObjectID(),
          "field_title": "Color",
          "content": "White"
        }
      ]
    }

  ])

  // 11. Insert Waypoint Categories
  // await waypoint_categories.insertMany([
  //   {
  //     "categories" : [
  //       category1._id, 
  //       category2._id
  //     ]
  //   }

  // ])

  // 12. Insert Waypoint
  const category3 = await categories.findOne({"category_name": "SW01"})
  await waypoints.insertMany([
    {
      "waypoint_name": "Location A",
      "description": "Infront of SW1",
      "location": location1._id,
      //"custom_fields": [custom_field1._id],
      "images": [image1._id],
     "audio_files": [audio1._id],
      "videos": [video1._id],
      "tags": [tag1._id],
      "categories": [category3._id],
      "revision_history": [revision_history1._id],
    }
  ])

  // 13. Insert Learnmore
  const category5 = await categories.findOne({"category_name": "historic"})
  await learn_more.insertMany([
    {
      "learn_more_title": "Other information",
      "description": "Curabitur in libero ut massa volutpat convallis. Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo. ", // Should be stringified HTML
      //"custom_fields": [custom_field1._id] ,
      "revisions": [revision_history1._id],
      "categories": [category5._id],
    }
  ])
  
  // 14. Insert Tours

  const waypoint1 = await waypoints.findOne({"waypoint_name": "Location A"})
  const plant1 = await plants.findOne({ "plant_name": "lavender"})
 
  await tours.insertMany([
    {
      "tour_name": "The English Walk",
      "description:": "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      //"custom_fields" : [custom_field1._id, custom_field2._id],
      "images" : [image1._id, image2._id],
      "audio_files" : [audio1._id, audio2._id],
      "videos" : [video1._id, video2._id],
      "tags" : [tag1._id, tag2._id],
      "categories" : [category1._id, category2._id],
      "waypoints" : [waypoint1._id],
      "plants" : [plant1._id],
      "revision_history" : [revision_history1._id]
    }
  ])

}

// IV. Run function
;(async ()=> {
  await seed()
  console.log("Mongo Connected!!");
  await client.close();
}
)()
