package org.rpg.inventory.service

import org.rpg.inventory.domain.data.CharacterSheetEO
import org.rpg.inventory.domain.repository.CharacterSheetRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class CharacterSheetService(val characterService: CharacterService,
                            val characterSheetRepository: CharacterSheetRepository) {

  fun save(sheet: CharacterSheetEO): CharacterSheetEO {
    characterService.checkCharacterSecurity(sheet.character.id!!)

    val existing = getSheetOfCharacter(sheet.character.id!!)
    existing.data = sheet.data
    existing.character = sheet.character

    return characterSheetRepository.save(existing)
  }

  @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
  fun getSheetOfCharacter(characterId: Long): CharacterSheetEO {
    characterService.checkCharacterSecurity(characterId)

    val sheetsList = characterSheetRepository.findByCharacterId(characterId)
    if (sheetsList.isEmpty()) {
      return CharacterSheetEO(null, null)
    }
    return sheetsList[0]
  }
}
