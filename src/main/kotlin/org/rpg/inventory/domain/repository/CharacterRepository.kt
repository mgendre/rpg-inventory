package org.rpg.inventory.domain.repository

import org.rpg.inventory.domain.data.CharacterEO
import org.springframework.data.jpa.repository.JpaRepository

interface CharacterRepository : JpaRepository<CharacterEO, Long> {
  fun findByUserId(userId: Long): List<CharacterEO>
}
