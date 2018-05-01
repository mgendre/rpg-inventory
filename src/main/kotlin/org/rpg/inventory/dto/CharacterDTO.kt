package org.rpg.inventory.dto

import org.rpg.inventory.domain.data.CharacterEO
import org.rpg.inventory.domain.data.UserEO

class CharacterDTO(
  val id: Long?,
  val userId: Long?,
  val name: String
) {

  fun toEo(user: UserEO): CharacterEO {
    val char = CharacterEO(id = id,
      name = name)
    char.user = user
    return char
  }

  companion object {
    fun from(eo: CharacterEO): CharacterDTO {
      return CharacterDTO(
        id = eo.id,
        userId = eo.user.id,
        name = eo.name
        )
    }
  }
}
