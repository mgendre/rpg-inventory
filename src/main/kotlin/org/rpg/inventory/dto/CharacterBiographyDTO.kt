package org.rpg.inventory.dto

import com.fasterxml.jackson.databind.ObjectMapper
import org.rpg.inventory.domain.data.CharacterBiographyEO
import org.rpg.inventory.domain.data.MediaEO

class CharacterBiographyDTO (
  val id: Long?,
  val portraitMediaId: Long?,
  val pictureMediaId: Long?
  ) {
    fun toEO(mapper: ObjectMapper, picture: MediaEO?, portrait: MediaEO?): CharacterBiographyEO {
      return CharacterBiographyEO(id = this.id, picture = picture, portrait = portrait)
    }

    companion object {
      fun from(eo: CharacterBiographyEO): CharacterBiographyDTO {
        return CharacterBiographyDTO(id = eo.id, pictureMediaId = eo.picture?.id, portraitMediaId = eo.portrait?.id)
      }
    }
  }
