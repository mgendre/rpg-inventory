package org.rpg.inventory.rest

import org.rpg.inventory.rest.dto.AccountDTO
import org.rpg.inventory.util.SecurityUtils
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController


@RestController
@RequestMapping("/api/v1/account")
@PreAuthorize("hasAnyRole('ROLE_USER')")
class AccountController {
  @GetMapping
  fun myAccount(): AccountDTO {
    return AccountDTO(
      authenticated = SecurityUtils.isCurrentUserAuthenticated(),
      username = SecurityUtils.getCurrentUserUsername(),
      roles = SecurityUtils.getCurrentUserRoles()
    )
  }
}
