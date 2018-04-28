package org.rpg.inventory.util

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser
import kotlin.streams.toList

class SecurityUtils {
  companion object {
    fun getCurrentUserPrincipal() : DefaultOidcUser? {
      val auth = SecurityContextHolder.getContext().authentication
      if(auth.principal is DefaultOidcUser) {
        return auth.principal as DefaultOidcUser
      }
      return null
    }

    fun isCurrentUserAuthenticated() : Boolean {
      return SecurityContextHolder.getContext().authentication.isAuthenticated
    }

    fun getCurrentUserUsername() : String? {
      return getCurrentUserPrincipal()?.name
    }

    fun getCurrentUserRoles() : List<String> {
      val auth = SecurityContextHolder.getContext().authentication
      if (auth.isAuthenticated) {
        return auth.authorities.stream().map({ a -> a.authority }).toList()
      }
      return emptyList()
    }
  }
}
