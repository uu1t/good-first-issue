export default function({ store, redirect, route }) {
  if (!store.getters.loggedIn && route.name !== 'login') {
    redirect('/login')
  } else if (store.getters.loggedIn && route.name === 'login') {
    redirect('/')
  }
}
