import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri)

export async function GET() {
  try {
    await client.connect()
    const database = client.db('healio')
    
    // Fetch data from all four collections
    const collection1Data = await database.collection('discussions').find({}).toArray()
    const collection2Data = await database.collection('goalentries').find({}).toArray()
    const collection3Data = await database.collection('gratitudeentries').find({}).toArray()
    const collection4Data = await database.collection('moodentries').find({}).toArray()

    // Combine all data
    const allData = {
      discussions: collection1Data,
      goalentries: collection2Data,
      gratitudeentries: collection3Data,
      moodentries: collection4Data,
    }

    return Response.json(allData)
  } catch (error) {
    console.error('Error fetching data from MongoDB:', error)
    return Response.json({ error: 'Failed to fetch data' }, { status: 500 })
  } finally {
    await client.close()
  }
}

