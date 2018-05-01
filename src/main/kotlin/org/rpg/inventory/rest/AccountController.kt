package org.rpg.inventory.rest

import org.rpg.inventory.dto.AccountDTO
import org.rpg.inventory.util.SecurityUtils
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.servlet.http.HttpServletRequest


@RestController
@RequestMapping("/api/v1/account")
class AccountController {
  @GetMapping
  fun myAccount(): AccountDTO {
    return AccountDTO(
      authenticated = SecurityUtils.isCurrentUserAuthenticated(),
      username = SecurityUtils.getCurrentUserUsername(),
      roles = SecurityUtils.getCurrentUserRoles()
    )
  }

  @GetMapping("/logout")
  fun logout(request: HttpServletRequest) {
    request.getSession(false)?.invalidate()
    SecurityContextHolder.clearContext()
  }
}
