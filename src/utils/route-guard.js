import config from '@/constant/config'
import store from '@/store'

const { page } = config

export const validateRoute = (to, from, next) => {
  /**
   * Destination path is not protected
   */
  if (!to.meta.roles.length && to.path !== page.adminLogin) {
    next()
    return
  }

  if (store.getters.isGettingUser) {
    setTimeout(() => validateRoute(to, from, next), 50)
    return
  }

  /**
   * currentUser.null === user is not logged in
   */
  const currentUser = store.getters.currentUser

  /**
   * Unauthenticated user trying to access protected route
   */
  if (to.path !== page.adminLogin && currentUser.null) {
    next({
      path: page.adminLogin,
      query: {
        redirect: Buffer.from(to.fullPath)
          .toString('base64')
      }
    })
    return
  }

  /**
   * Unauthorized user trying to access protected route with certain roles
   */
  if (to.meta.roles && to.meta.roles.length && !currentUser.null && !to.meta.roles.includes(currentUser.role)) {
    next({ name: 'NotFound' })
    return
  }

  /**
   * Authenticated and authorized user trying to access black listed page 
   */
  if (!currentUser.null && config.userBlackListedPage.includes(to.path)) {
    next({ path: page.admin })
    return
  }

  next()
}
