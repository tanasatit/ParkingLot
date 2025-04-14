import mongoose, { Connection} from 'mongoose';

class Database {
  private static instance: Database| null = null;
  private uri: string;
  private connection: Connection | null = null;
  
  private constructor() {
    if (!process.env.MONGODB_URI) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }
    this.uri = process.env.MONGODB_URI;
  }

  public async connect(): Promise<Connection> {
    if (this,this.connection) {
      return this.connection;
    }
    try {
      const mongooseInstance = await mongoose.connect(this.uri, {
        dbName: 'Parking_Lot'
      } as mongoose.ConnectOptions);

      this.connection = mongooseInstance.connection;
      console.log('Connect to MongoDB');
      return this.connection;
    } catch (error) {
      console.error('MongoDB connection error: ', error);
      throw error;
    }
  }

  public static getinstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
     }
    return Database.instance;
  } 
}

export default Database;