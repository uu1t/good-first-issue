export const state = () => ({
  issueResults: []
})

export const mutations = {
  receiveIssues(state, items) {
    state.issueResults = items
  }
}

export const actions = {
  async searchIssues({ commit }) {
    const response = await fetch(
      'https://api.github.com/search/issues?q=is:open+is:issue+label:%22good%20first%20issue%22'
    )
    const json = await response.json()
    commit('receiveIssues', json.items)
  }
}
