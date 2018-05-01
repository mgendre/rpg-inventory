package org.rpg.inventory.rest

import com.fasterxml.jackson.databind.ObjectMapper
import org.rpg.inventory.domain.data.InventoryEO
import org.rpg.inventory.dto.CharacterDTO
import org.rpg.inventory.dto.InventoryDTO
import org.rpg.inventory.error.DataNotFoundException
import org.rpg.inventory.service.CharacterService
import org.rpg.inventory.service.InventoryService
import org.rpg.inventory.service.UserService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/v1/characters/{characterId}/inventory")
@PreAuthorize("isAuthenticated()")
class InventoryController(val characterService: CharacterService,
                          val inventoryService: InventoryService,
                          val mapper: ObjectMapper) {
  @PostMapping
  fun save(@RequestBody body: InventoryDTO,
           @PathVariable("characterId")characterId: Long): InventoryDTO {
    val eo = body.toEO(mapper, characterService.getCharacter(characterId))
    return InventoryDTO.from(inventoryService.save(eo), mapper)
  }

  @GetMapping
  fun get(@PathVariable("characterId") characterId: Long): InventoryDTO {
    return InventoryDTO.from(inventoryService.getInventoryOfCharacter(characterId), mapper)
  }
}
