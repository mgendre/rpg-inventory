package org.rpg.inventory.domain.repository

import org.rpg.inventory.domain.data.InventoryEO
import org.springframework.data.jpa.repository.JpaRepository

interface InventoryRepository : JpaRepository<InventoryEO, Long> {
  fun findByCharacterId(characterId: Long): List<InventoryEO>
}
