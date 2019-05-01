import Vue from 'vue'

export const state = () => ({
  issueResults: [],
  repositories: {}
})

export const getters = {
  repositoryIsLoading: state => key => !state.repositories[key] || state.repositories[key].isLoading,
  getRepository: state => key => state.repositories[key]
}

export const mutations = {
  receiveIssues(state, items) {
    state.issueResults = items
  },
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
  async fetchRepository({ commit }, url) {
    commit('fetchRepository', url)
    const response = await fetch(url)
    const json = await response.json()
    commit('receiveRepository', { key: url, repository: json })
  },
  async searchIssues({ commit }) {
    const response = await fetch(
      'https://api.github.com/search/issues?q=is:open+is:issue+label:%22good%20first%20issue%22'
    )
    const json = await response.json()
    commit('receiveIssues', json.items)
  }
}
