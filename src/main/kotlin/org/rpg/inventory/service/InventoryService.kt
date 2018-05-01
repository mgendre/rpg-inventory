package org.rpg.inventory.service

import org.rpg.inventory.domain.data.InventoryEO
import org.rpg.inventory.domain.repository.InventoryRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class InventoryService(val characterService: CharacterService,
                       val inventoryRepository: InventoryRepository) {

  fun save(inventory: InventoryEO): InventoryEO {
    characterService.checkCharacterSecurity(inventory.character.id!!)

    val existing = getInventoryOfCharacter(inventory.character.id!!)
    existing.data = inventory.data
    existing.character = inventory.character

    return inventoryRepository.save(existing)
  }

  @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
  fun getInventoryOfCharacter(characterId: Long): InventoryEO {
    characterService.checkCharacterSecurity(characterId)

    val inventoryList = inventoryRepository.findByCharacterId(characterId)
    if (inventoryList.isEmpty()) {
      return InventoryEO(null, null)
    }
    return inventoryList[0]
  }
}
