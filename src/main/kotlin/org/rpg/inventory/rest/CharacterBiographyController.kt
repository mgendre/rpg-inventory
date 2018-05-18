package org.rpg.inventory.rest

import com.fasterxml.jackson.databind.ObjectMapper
import org.rpg.inventory.dto.CharacterBiographyDTO
import org.rpg.inventory.service.CharacterBiographyService
import org.rpg.inventory.service.CharacterService
import org.rpg.inventory.service.MediaService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/characters/{characterId}/biography")
@PreAuthorize("isAuthenticated()")
class CharacterBiographyController(val characterService: CharacterService,
                                   val characterBiographyService: CharacterBiographyService,
                                   val mediaService: MediaService,
                                   val mapper: ObjectMapper) {
  @PostMapping
  fun save(@RequestBody body: CharacterBiographyDTO,
           @PathVariable("characterId") characterId: Long): CharacterBiographyDTO {
    val eo = body.toEO(mapper,
      if (body.pictureMediaId != null) mediaService.getMedia(body.pictureMediaId) else null,
      if (body.portraitMediaId != null) mediaService.getMedia(body.portraitMediaId) else null
    )
    eo.character = characterService.getCharacter(characterId)
    return CharacterBiographyDTO.from(characterBiographyService.save(eo))
  }

  @GetMapping
  fun get(@PathVariable("characterId") characterId: Long): CharacterBiographyDTO {
    return CharacterBiographyDTO.from(characterBiographyService.getBiographyOfCharacter(characterId))
  }
}
