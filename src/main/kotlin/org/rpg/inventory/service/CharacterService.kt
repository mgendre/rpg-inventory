package org.rpg.inventory.service

import org.rpg.inventory.domain.data.CharacterEO
import org.rpg.inventory.domain.repository.CharacterRepository
import org.rpg.inventory.error.DataNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class CharacterService(val characterRepository: CharacterRepository,
                       val userService: UserService) {

  fun save(character: CharacterEO): CharacterEO {
    return characterRepository.save(character)
  }

  @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
  fun getCharactersOfConnectedUser(): List<CharacterEO> {
    return characterRepository.findByUserId(userService.getCurrentUserId())
  }

  @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
  fun getCharacter(characterId: Long): CharacterEO {
    return checkCharacterSecurity(characterId)
  }

  @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
  fun checkCharacterSecurity(characterId: Long): CharacterEO {
    val character = characterRepository.getOne(characterId)
    if (character.user.id != userService.getCurrentUserId()) {
      throw DataNotFoundException(
        "User is not authorized to access character $characterId owned by ${character.user.id}")
    }
    return character
  }
}
