package org.rpg.inventory.dto

import com.fasterxml.jackson.databind.ObjectMapper
import org.rpg.inventory.domain.data.CharacterEO
import org.rpg.inventory.domain.data.InventoryEO

class InventoryDTO(
  val id: Long?,
  val inventory: RootCategoryDTO
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
        var cat = RootCategoryDTO(null, null)
        if (eo.data != null) {
          cat = mapper.readValue(eo.data, RootCategoryDTO::class.java)
        }
        return InventoryDTO(inventory = cat, id = eo.id)
      }
  }
}

class RootCategoryDTO(
  val categories: List<CategoryDTO>?,
  val items: List<ItemDTO>?
)

class CategoryDTO(
  val name: String?,
  val categories: List<CategoryDTO>?,
  val items: List<ItemDTO>?
)

class ItemDTO(
  val name: String,
  val weight: Float?,
  val count: Int?,
  val comments: String?
)
