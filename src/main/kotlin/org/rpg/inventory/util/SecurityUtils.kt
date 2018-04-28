package org.rpg.inventory.util

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser
import kotlin.streams.toList

class SecurityUtils {
  companion object {
    fun getCurrentUserPrincipal() : DefaultOidcUser? {
      if (isCurrentUserAuthenticated()) {
        val auth = SecurityContextHolder.getContext().authentication
        if (auth.principal is DefaultOidcUser) {
          return auth.principal as DefaultOidcUser
        }
      }
      return null
    }

    fun isCurrentUserAuthenticated() : Boolean {
      if(SecurityContextHolder.getContext().authentication != null) {
        return SecurityContextHolder.getContext().authentication.isAuthenticated
      }
      return false
    }

    fun getCurrentUserUsername() : String? {
      if (isCurrentUserAuthenticated()) {
        return getCurrentUserPrincipal()?.name
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
