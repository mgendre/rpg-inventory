package org.rpg.inventory.dto

class AccountDTO(
  val username: String?,
  val authenticated: Boolean,
  val roles: List<String?>
)
