import firebase, { githubProvider } from '@/plugins/firebase'

import { GITHUB_ACCESS_TOKEN } from '~/utils/constants'

export const strict = false

export const state = () => ({
  user: null
})

export const getters = {
  loggedIn: state => Boolean(state.user)
}

export const mutations = {
  setToken(_, token) {
    if (token) {
      localStorage.setItem(GITHUB_ACCESS_TOKEN, token)
    } else {
      localStorage.removeItem(GITHUB_ACCESS_TOKEN)
    }
  },
  setUser(state, user) {
    state.user = user
  }
}

export const actions = {
  login() {
    return new Promise(resolve => {
      firebase
        .auth()
        .signInWithRedirect(githubProvider)
        .then(resolve)
    })
  },
  async logout({ commit }) {
    await new Promise(resolve => {
      firebase
        .auth()
        .signOut()
        .then(resolve)
    })
    commit('setUser', null)
    commit('setToken', null)
  }
}
