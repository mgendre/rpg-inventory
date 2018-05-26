package org.rpg.inventory.service

import org.rpg.inventory.domain.data.MediaEO
import org.rpg.inventory.domain.repository.MediaRepository
import org.rpg.inventory.error.DataNotFoundException
import org.springframework.beans.factory.annotation.Value
import org.springframework.scheduling.annotation.Scheduled
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Propagation
import org.springframework.transaction.annotation.Transactional
import java.io.File
import java.time.ZonedDateTime
import javax.annotation.PostConstruct

@Service
@Transactional
class MediaService(val mediaRepository: MediaRepository,
                   val userService: UserService,
                   @Value("\${spring.servlet.multipart.location}")
                   val multipartLocation: String) {

  fun save(media: MediaEO): MediaEO {
    if (media.id != null) {
      checkMediaSecurity(media.id)
    }
    return mediaRepository.save(media)
  }

  @Transactional(propagation = Propagation.REQUIRED, readOnly = true)
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

  fun deleteMedia(mediaId: Long?) {
    if (mediaId != null) {
      mediaRepository.delete(checkMediaSecurity(mediaId))
    }
  }

  fun setConfirmed(mediaId: Long, confirmed: Boolean): MediaEO {
    val media = checkMediaSecurity(mediaId)
    media.confirmed = confirmed
    return save(media)
  }

  // Run all 12 hours
  @Scheduled(fixedDelay = 12 * 60 * 60 * 1000 / 60 / 60 / 12 * 20)
  fun deleteUnconfirmedMedia() {
    // Remove all media that are unconfirmed after 1 hour...
    val toDelete = mediaRepository.findByConfirmedFalseAndCreationDateBefore(ZonedDateTime.now().minusHours(1))
    mediaRepository.deleteAll(toDelete)
  }

  @PostConstruct
  fun init() {
    File(multipartLocation).mkdirs()
  }
}
