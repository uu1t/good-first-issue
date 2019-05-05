import Vue from 'vue'
import firebase, { githubProvider } from '@/plugins/firebase'

import { GITHUB_ACCESS_TOKEN, API_ORIGIN, PER_PAGE } from '~/utils/constants'

export const strict = false

export const state = () => ({
  issueResults: [],
  repositories: {},
  totalCount: null,
  user: null
})

export const getters = {
  getRepository: state => key => state.repositories[key],
  loggedIn: state => Boolean(state.user)
}

export const mutations = {
  /* eslint-disable camelcase */
  receiveIssues(state, { items, total_count }) {
    state.issueResults = items
    state.totalCount = total_count
  },
  /* eslint-enable */
  receiveRepository(state, { key, repository }) {
    Vue.set(state.repositories, key, {
      isLoading: false,
      ...repository
    })
  },
  fetchRepository(state, key) {
    Vue.set(state.repositories, key, { isLoading: true })
  },
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
  },
  async fetchRepository({ commit, state }, url) {
    if (state.repositories[url]) {
      return
    }
    commit('fetchRepository', url)
    const response = await fetch(url)
    const json = await response.json()
    commit('receiveRepository', { key: url, repository: json })
  },
  async searchIssues({ commit }, { label, language, page }) {
    let q = 'is:open is:issue'
    q += ` label:"${label}"`
    if (language) {
      q += ` language:${language}`
    }
    const params = new URLSearchParams({
      page,
      per_page: PER_PAGE,
      q
    })
    const response = await fetch(`${API_ORIGIN}/search/issues?${params.toString()}`)
    const json = await response.json()
    commit('receiveIssues', json)
  }
}
