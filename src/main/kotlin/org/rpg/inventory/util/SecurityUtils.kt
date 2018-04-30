package org.rpg.inventory.util

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser
import kotlin.streams.toList

class SecurityUtils {
  companion object {
    fun getCurrentUserUsername() : String? {
      val auth = SecurityContextHolder.getContext().authentication
      if (auth != null) {
        if(auth.principal is UserDetails) {
          return (auth.principal as UserDetails).username
        }
        else if(auth.principal is DefaultOidcUser) {
          val user = auth.principal as DefaultOidcUser
          return user.claims["email"] as String
        }
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

    fun getCurrentUserRoles() : List<String> {
      if (isCurrentUserAuthenticated()) {
        val auth = SecurityContextHolder.getContext().authentication
        return auth.authorities.stream().map({ a -> a.authority }).toList()
      }
      return emptyList()
    }
  }
}
