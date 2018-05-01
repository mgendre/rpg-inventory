package org.rpg.inventory.rest

import org.rpg.inventory.dto.CharacterDTO
import org.rpg.inventory.service.CharacterService
import org.rpg.inventory.service.UserService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*


@RestController
@RequestMapping("/api/v1/characters")
@PreAuthorize("isAuthenticated()")
class CharacterController(val characterService: CharacterService,
                          val userService: UserService) {
  @PostMapping
  fun save(@RequestBody body: CharacterDTO): CharacterDTO {
    val eo = body.toEo(userService.getCurrentUser())
    return CharacterDTO.from(characterService.save(eo))
  }

  @GetMapping
  fun get(): List<CharacterDTO> {
    return characterService.getCharactersOfConnectedUser().map {
      CharacterDTO.from(it)
    }
  }
}
