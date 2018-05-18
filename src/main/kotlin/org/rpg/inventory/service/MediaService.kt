package org.rpg.inventory.service

import org.rpg.inventory.domain.data.MediaEO
import org.rpg.inventory.domain.repository.MediaRepository
import org.rpg.inventory.error.DataNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class MediaService(val mediaRepository: MediaRepository,
                   val userService: UserService) {

  fun save(media: MediaEO): MediaEO {
    return mediaRepository.save(media)
  }

  @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
  fun getMedia(mediaId: Long): MediaEO {
    return checkMediaSecurity(mediaId)
  }

  @Transactional(propagation = Propagation.SUPPORTS, readOnly = true)
  fun checkMediaSecurity(mediaId: Long): MediaEO {
    val media = mediaRepository.getOne(mediaId)
    if (media.user.id != userService.getCurrentUserId()) {
      throw DataNotFoundException(
        "User is not authorized to access media $mediaId owned by ${media.user.id}")
    }
    return media
  }
}
