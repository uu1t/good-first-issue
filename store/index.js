import Vue from 'vue'

import { API_ORIGIN, PER_PAGE } from '~/utils/constants'

export const state = () => ({
  issueResults: [],
  repositories: {},
  totalCount: null
})

export const getters = {
  getRepository: state => key => state.repositories[key]
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
  }
}

export const actions = {
  async fetchRepository({ commit, state }, url) {
    if (state.repositories[url]) {
      return
    }
    commit('fetchRepository', url)
    const response = await fetch(url)
    const json = await response.json()
    commit('receiveRepository', { key: url, repository: json })
  },
  async searchIssues({ commit }, { page }) {
    const params = new URLSearchParams({
      page,
      per_page: PER_PAGE,
      q: 'is:open is:issue label:"good first issue"'
    })
    const response = await fetch(`${API_ORIGIN}/search/issues?${params.toString()}`)
    const json = await response.json()
    commit('receiveIssues', json)
  }
}
