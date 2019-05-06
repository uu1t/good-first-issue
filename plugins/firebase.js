import * as firebase from 'firebase/app'
import 'firebase/auth'

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: process.env.NUXT_ENV_FIREBASE_API_KEY,
    authDomain: `${process.env.NUXT_ENV_FIREBASE_PROJECT_ID}.firebaseapp.com`,
    projectId: process.env.NUXT_ENV_FIREBASE_PROJECT_ID
  })
}

export default firebase

export const githubProvider = new firebase.auth.GithubAuthProvider()
