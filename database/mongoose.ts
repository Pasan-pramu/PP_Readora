import mongoose from 'mongoose';
import dns from 'node:dns';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) throw new Error('Please define the MONGODB_URI environment variable');

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null
        promise: Promise<typeof mongoose> | null
    }
}

let cached = global.mongooseCache || (global.mongooseCache = { conn: null, promise: null });

export const connectToDatabase = async () => {
    // FIX: Must set DNS servers INSIDE the function, not at module level.
    // Next.js bundles server modules in a way that top-level side effects
    // (like dns.setServers) may not persist across requests.
    // mongodb+srv:// requires DNS SRV lookups; Windows default DNS often
    // can't resolve these, causing "querySrv ECONNREFUSED".
    dns.setServers(['8.8.8.8', '8.8.4.4']);

    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, {
            bufferCommands: false,
            family: 4, // Force IPv4 — avoids IPv6 DNS resolution failures on Windows
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        console.error('MongoDB connection error. Please make sure MongoDB is running. ' + e);
        throw e;
    }

    console.info('Connected to MongoDB');
    return cached.conn;
}