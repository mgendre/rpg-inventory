package org.rpg.inventory.domain.repository

import org.rpg.inventory.domain.data.CharacterBiographyEO
import org.springframework.data.jpa.repository.JpaRepository

interface CharacterBiographyRepository : JpaRepository<CharacterBiographyEO, Long> {
  fun findByCharacterId(characterId: Long): List<CharacterBiographyEO>
}
