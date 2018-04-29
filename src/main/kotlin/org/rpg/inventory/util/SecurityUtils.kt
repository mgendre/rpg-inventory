package org.rpg.inventory.util

import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import kotlin.streams.toList

class SecurityUtils {
  companion object {
    fun getCurrentUserPrincipal() : UserDetails? {
      val auth = SecurityContextHolder.getContext().authentication
      if (auth != null && auth.principal is UserDetails) {
        return auth.principal as UserDetails
      }
      return null
    }

    fun isCurrentUserAuthenticated() : Boolean {
      if(SecurityContextHolder.getContext().authentication != null) {
        return SecurityContextHolder.getContext().authentication.isAuthenticated &&
          !getCurrentUserUsername().isNullOrBlank()
      }
      return false
    }

    fun getCurrentUserUsername() : String? {
      val ud = getCurrentUserPrincipal()
      if (ud != null) {
        return ud.username
      }
      return null
    }

    fun getCurrentUserRoles() : List<String> {
      if (isCurrentUserAuthenticated()) {
        val auth = SecurityContextHolder.getContext().authentication
        return auth.authorities.stream().map({ a -> a.authority }).toList()
      }
      return emptyList()
    }
  }
}
