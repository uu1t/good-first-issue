import firebase from './firebase'

export default async ({ store }) => {
  const user = await new Promise(resolve => {
    firebase.auth().onAuthStateChanged(resolve)
  })
  store.commit('setUser', user)
}
