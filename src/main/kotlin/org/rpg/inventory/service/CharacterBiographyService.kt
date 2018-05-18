package org.rpg.inventory.service

import org.rpg.inventory.domain.data.CharacterBiographyEO
import org.rpg.inventory.domain.data.InventoryEO
import org.rpg.inventory.domain.repository.CharacterBiographyRepository
import org.rpg.inventory.domain.repository.InventoryRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class CharacterBiographyService(val characterService: CharacterService,
                                val characterBiographyRepository: CharacterBiographyRepository,
                                val mediaService: MediaService) {

  fun save(bio: CharacterBiographyEO): CharacterBiographyEO {
    characterService.checkCharacterSecurity(bio.character.id!!)

    val existing = getBiographyOfCharacter(bio.character.id!!)

    if (existing.picture != null && bio.picture != null) {
      if (existing.picture!!.id != bio.picture!!.id) {
        mediaService.deleteMedia(existing.picture!!.id)
      }
    }
    if (existing.portrait != null && bio.portrait != null) {
      if (existing.portrait!!.id != bio.portrait!!.id) {
        mediaService.deleteMedia(existing.portrait!!.id)
      }
    }

    return characterBiographyRepository.save(existing)
  }

  @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
  fun getBiographyOfCharacter(characterId: Long): CharacterBiographyEO {
    characterService.checkCharacterSecurity(characterId)

    val inventoryList = characterBiographyRepository.findByCharacterId(characterId)
    if (inventoryList.isEmpty()) {
      return CharacterBiographyEO(null)
    }
    return inventoryList[0]
  }
}
