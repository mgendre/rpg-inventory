package org.rpg.inventory.rest

import com.fasterxml.jackson.databind.ObjectMapper
import org.rpg.inventory.dto.CharacterSheetDTO
import org.rpg.inventory.service.CharacterService
import org.rpg.inventory.service.CharacterSheetService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/characters/{characterId}/sheet")
@PreAuthorize("isAuthenticated()")
class CharacterSheetController(val characterService: CharacterService,
                               val characterSheetService: CharacterSheetService,
                               val mapper: ObjectMapper) {
  @PostMapping
  fun save(@RequestBody body: CharacterSheetDTO,
           @PathVariable("characterId")characterId: Long): CharacterSheetDTO {
    val eo = body.toEO(mapper, characterService.getCharacter(characterId))
    return CharacterSheetDTO.from(characterSheetService.save(eo), mapper)
  }

  @GetMapping
  fun get(@PathVariable("characterId") characterId: Long): CharacterSheetDTO {
    return CharacterSheetDTO.from(characterSheetService.getSheetOfCharacter(characterId), mapper)
  }
}
