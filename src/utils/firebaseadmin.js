import * as admin from "firebase-admin";
import { adminFirebaseConfig } from "@/firebase.config";
import { firebaseStorageBucket } from "@/firebase.config";
const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";

if(admin.apps.length === 0){
    admin.initializeApp({
        credential: admin.credential.cert(adminFirebaseConfig),
        storageBucket: firebaseStorageBucket
    })
}

export const db = admin.firestore();
export const storage = admin.storage();

export async function verifyUser(username, password) {
    try {
      const entryRef = db.collection("verification").doc(username);
      const doc = await entryRef.get();
  
      if (doc.exists) {
        const entryData = doc.data();
        const fetchedPassword = entryData.password;
  
        // Use bcrypt.compare to securely compare passwords
        const matchPassword = await bcrypt.compare(password, fetchedPassword);
  
        return matchPassword;
      } else {
        console.log("Entry does not exist");
        return false; // Return false instead of null
      }
    } catch (error) {
      console.error("Error fetching entry:", error.message); // Log the specific error message
      throw error; // You can handle the error as needed
    }
  }

export async function createUser(username, password){
    const salt_round = 10;
    const hased_password = bcrypt.hashSync(password, salt_round);

    return db.collection('verification').doc(username).set({
        password: hased_password
    }, {merge: false})
}