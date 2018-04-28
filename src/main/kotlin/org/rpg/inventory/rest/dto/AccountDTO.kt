package org.rpg.inventory.rest.dto

class AccountDTO(
  val username: String?,
  val authenticated: Boolean,
  val roles: List<String?>
)
