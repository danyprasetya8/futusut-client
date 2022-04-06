const state = {
  isMobile: false,
  isSmallMobile: false,
  isSmallDesktop: false,
  isSmallDesktopAndUp: false,
  isMediumDesktop: false,
  isMediumDesktopAndDown: false,
  isMediumDesktopAndUp: false
}

const mutations = {
  setIsMobile (state, value) {
    state.isMobile = value
  },
  setIsSmallDesktop (state, value) {
    state.isSmallDesktop = value
  },
  setIsSmallDesktopAndUp (state, value) {
    state.isSmallDesktopAndUp = value
  },
  setIsMediumDesktop (state, value) {
    state.isMediumDesktop = value
  },
  setIsMediumDesktopAndDown (state, value) {
    state.isMediumDesktopAndDown = value
  },
  setIsMediumDesktopAndUp (state, value) {
    state.isMediumDesktopAndUp = value
  },
  setIsSmallMobile (state, value) {
    state.isSmallMobile = value
  }
}

const getters = {
  isMobile (state) {
    return state.isMobile
  },
  isMediumDesktop (state) {
    return state.isMediumDesktop
  },
  isMediumDesktopAndDown (state) {
    return state.isMediumDesktopAndDown
  },
  isMediumDesktopAndUp (state) {
    return state.isMediumDesktopAndUp
  },
  isSmallDesktop (state) {
    return state.isSmallDesktop
  },
  isSmallDesktopAndUp (state) {
    return state.isSmallDesktopAndUp
  },
  isSmallMobile (state) {
    return state.isSmallMobile
  }
}

export default {
  state,
  mutations,
  getters
}
