import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '../../tailwind.config'

const config = resolveConfig(tailwindConfig)

const parse = screen => +screen.slice(0, screen.length - 2)

const MOBILE_BRAKPOINT = parse(config.theme.screens.md)
const SMALL_MOBILE_BREAKPOINT = parse(config.theme.screens.sm)
const MEDIUM_DESKTOP_BREAKPOINT = parse(config.theme.screens['2xl'])
const SMALL_DESKTOP_BREAKPOINT = parse(config.theme.screens.xl)

export const isMobile = () => {
  const { clientWidth } = window.document.documentElement
  return clientWidth <= MOBILE_BRAKPOINT
}

export const isSmallMobile = () => {
  const { clientWidth } = window.document.documentElement
  return clientWidth <= SMALL_MOBILE_BREAKPOINT
}

export const isMediumDesktop = () => {
  const { clientWidth } = window.document.documentElement
  return clientWidth <= MEDIUM_DESKTOP_BREAKPOINT && clientWidth > SMALL_DESKTOP_BREAKPOINT
}

export const isMediumDesktopAndUp = () => {
  const { clientWidth } = window.document.documentElement
  return clientWidth >= MEDIUM_DESKTOP_BREAKPOINT
}

export const isMediumDesktopAndDown = () => {
  const { clientWidth } = window.document.documentElement
  return clientWidth <= MEDIUM_DESKTOP_BREAKPOINT && clientWidth > MOBILE_BRAKPOINT
}

export const isSmallDesktop = () => {
  const { clientWidth } = window.document.documentElement
  return clientWidth <= SMALL_DESKTOP_BREAKPOINT && clientWidth > MOBILE_BRAKPOINT
}

export const isSmallDesktopAndUp = () => {
  const { clientWidth } = window.document.documentElement
  return clientWidth > MOBILE_BRAKPOINT
}
