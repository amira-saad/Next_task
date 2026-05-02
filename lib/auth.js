import dns from "node:dns/promises"
dns.setDefaultResultOrder("ipv4first")
dns.setServers(["8.8.8.8", "1.1.1.1"])

import { betterAuth } from "better-auth"
import { mongodbAdapter } from "better-auth/adapters/mongodb"
import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI

const client = new MongoClient(uri)
const db = client.db("beehoney")

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  database: mongodbAdapter(db),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
})