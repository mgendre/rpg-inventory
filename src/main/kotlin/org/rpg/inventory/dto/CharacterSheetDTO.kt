package org.rpg.inventory.dto

import com.fasterxml.jackson.databind.JsonNode
import com.fasterxml.jackson.databind.ObjectMapper
import org.rpg.inventory.domain.data.CharacterEO
import org.rpg.inventory.domain.data.CharacterSheetEO

class CharacterSheetDTO (
  val id: Long?,
  val data: JsonNode?
  ) {
    fun toEO(mapper: ObjectMapper, character: CharacterEO): CharacterSheetEO {
      val data = mapper.writeValueAsString(this.data)
      val eo = CharacterSheetEO(
        data = data,
        id = id
      )
      eo.character = character
      return eo
    }

    companion object {
      fun from(eo: CharacterSheetEO, mapper: ObjectMapper): CharacterSheetDTO {
        var jsonNode : JsonNode? = null
        if (eo.data != null) {
          jsonNode = mapper.readTree(eo.data)
        }
        return CharacterSheetDTO(data = jsonNode, id = eo.id)
      }
    }
  }
