package org.rpg.inventory.conf.util

import org.rpg.inventory.service.UserService
import org.rpg.inventory.util.SecurityUtils
import org.springframework.security.core.Authentication
import org.springframework.security.web.authentication.AuthenticationSuccessHandler
import org.springframework.stereotype.Component
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse

@Component
class AppSuccessAuthentication(val userService: UserService) : AuthenticationSuccessHandler {
  override fun onAuthenticationSuccess(request: HttpServletRequest?,
                                       response: HttpServletResponse?,
                                       auth: Authentication?) {
    val username = SecurityUtils.getCurrentUserUsername()
    if (username != null) {
      userService.createIfNotExist(username)
    }
    else {
      throw IllegalArgumentException("Username not set !")
    }
    response!!.sendRedirect("/")
  }
}
