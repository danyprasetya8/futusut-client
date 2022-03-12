import { useStore } from 'vuex'

export default function useResponsive() {
  const store = useStore()
  const {
    isMobile,
    isSmallMobile,
    isSmallDesktop,
    isSmallDesktopAndUp,
    isMediumDesktop,
    isMediumDesktopAndDown,
    isMediumDesktopAndUp
  } = store.state.responsiveModule

  return {
    isMobile,
    isSmallMobile,
    isSmallDesktop,
    isSmallDesktopAndUp,
    isMediumDesktop,
    isMediumDesktopAndDown,
    isMediumDesktopAndUp
  }
}
