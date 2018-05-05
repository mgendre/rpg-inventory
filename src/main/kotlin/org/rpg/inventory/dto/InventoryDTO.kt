package org.rpg.inventory.dto

import com.fasterxml.jackson.databind.ObjectMapper
import org.rpg.inventory.domain.data.CharacterEO
import org.rpg.inventory.domain.data.InventoryEO

class InventoryDTO(
  val id: Long?,
  val inventory: InventoryDataDTO
) {
  fun toEO(mapper: ObjectMapper, character: CharacterEO): InventoryEO {
    val data = mapper.writeValueAsString(inventory)
    val eo = InventoryEO(
      data = data,
      id = id
    )
    eo.character = character
    return eo
  }

  companion object {
      fun from(eo: InventoryEO, mapper: ObjectMapper): InventoryDTO {
        var cat = InventoryDataDTO(null)
        if (eo.data != null) {
          cat = mapper.readValue(eo.data, InventoryDataDTO::class.java)
        }
        return InventoryDTO(inventory = cat, id = eo.id)
      }
  }
}

class InventoryDataDTO (
  val categories: List<CategoryDTO>?
)

class CategoryDTO(
  val label: String?,
  val categories: List<CategoryDTO>?,
  val items: List<ItemDTO>?
)

class ItemDTO(
  val label: String,
  val weight: Float?,
  val count: Int?,
  val comments: String?,
  val reference: String?
)
