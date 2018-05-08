package org.rpg.inventory.domain.repository

import org.rpg.inventory.domain.data.CharacterSheetEO
import org.springframework.data.jpa.repository.JpaRepository

interface CharacterSheetRepository : JpaRepository<CharacterSheetEO, Long> {
  fun findByCharacterId(characterId: Long): List<CharacterSheetEO>
}
