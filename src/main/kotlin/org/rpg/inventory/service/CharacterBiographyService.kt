package org.rpg.inventory.service

import org.rpg.inventory.domain.data.CharacterBiographyEO
import org.rpg.inventory.domain.repository.CharacterBiographyRepository
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

    // Un-confirm existing media
    if (existing.picture != null) {
      mediaService.setConfirmed(existing.picture!!.id!!, false)
    }
    if (existing.portrait != null) {
      mediaService.setConfirmed(existing.portrait!!.id!!, false)
    }

    // Confirm new media
    if (bio.picture != null) {
      mediaService.setConfirmed(bio.picture!!.id!!, true)
    }
    if (bio.portrait != null) {
      mediaService.setConfirmed(bio.portrait!!.id!!, true)
    }

    return characterBiographyRepository.save(bio)
  }

  @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
  fun getBiographyOfCharacter(characterId: Long): CharacterBiographyEO {
    characterService.checkCharacterSecurity(characterId)

    val inventoryList = characterBiographyRepository.findByCharacterId(characterId)
    if (inventoryList.isEmpty()) {
      return CharacterBiographyEO(null, null, null)
    }
    return inventoryList[0]
  }
}
