package org.rpg.inventory.dto

import org.rpg.inventory.domain.data.MediaEO
import org.rpg.inventory.domain.data.UserEO
import org.rpg.inventory.domain.data.enums.MediaType
import java.time.ZonedDateTime

class MediaDTO(
  val id: Long?,
  val filename: String,
  val contentType: String,
  val creationDate: ZonedDateTime,
  val confirmed: Boolean,
  val type: MediaType
) {
  fun toEo(data: ByteArray, user: UserEO): MediaEO {
    val media = MediaEO(
      id = this.id,
      contentType = this.contentType,
      filename = this.filename,
      data = data,
      creationDate = creationDate,
      confirmed = confirmed,
      type = type
    )
    media.user = user
    return media
  }

  companion object {
    fun from(media: MediaEO): MediaDTO {
      return MediaDTO(
        id = media.id,
        contentType = media.contentType,
        filename = media.filename,
        type = media.type,
        confirmed = media.confirmed,
        creationDate = media.creationDate
      )
    }
  }
}
