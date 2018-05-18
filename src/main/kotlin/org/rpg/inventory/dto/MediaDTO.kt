package org.rpg.inventory.dto

import org.rpg.inventory.domain.data.MediaEO
import org.rpg.inventory.domain.data.UserEO

class MediaDTO(
  val id: Long?,
  val filename: String,
  val contentType: String
) {
  fun toEo(data: ByteArray, user: UserEO): MediaEO {
    val media = MediaEO(
      id = this.id,
      contentType = this.contentType,
      filename = this.filename,
      data = data
    )
    media.user = user
    return media
  }

  companion object {
    fun from(media: MediaEO): MediaDTO {
      return MediaDTO(
        id = media.id,
        contentType = media.contentType,
        filename = media.filename
      )
    }
  }
}
