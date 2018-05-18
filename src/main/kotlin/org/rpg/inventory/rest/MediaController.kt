package org.rpg.inventory.rest

import org.rpg.inventory.domain.data.MediaEO
import org.rpg.inventory.dto.MediaDTO
import org.rpg.inventory.rest.util.ResponseUtils
import org.rpg.inventory.service.MediaService
import org.rpg.inventory.service.UserService
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.*
import org.springframework.web.multipart.MultipartFile
import javax.servlet.http.HttpServletResponse


@RestController
@RequestMapping("/api/v1/media")
@PreAuthorize("isAuthenticated()")
class MediaController(val mediaService: MediaService,
                      val userService: UserService
) {
  @PostMapping("/upload")
  fun upload(@RequestParam("file") file: MultipartFile): MediaDTO {
    val eo = MediaEO(
      id = null,
      filename = if (file.originalFilename != null) file.originalFilename else "",
      contentType = if (file.contentType != null) file.contentType else "image/jpeg",
      data = file.bytes
    )
    eo.user = userService.getCurrentUser()

    return MediaDTO.from(mediaService.save(eo))
  }

  @GetMapping("/{mediaId}")
  fun get(@PathVariable("mediaId") mediaId: Long): MediaDTO {
    return MediaDTO.from(mediaService.getMedia(mediaId))
  }

  @GetMapping("/{mediaId}/data")
  fun get(@PathVariable("mediaId") mediaId: Long, response: HttpServletResponse) {
    val media = mediaService.getMedia(mediaId)
    try {
      ResponseUtils.writeData(response, media.data, media.contentType)
    } catch (e: Exception) {
      response.status = HttpServletResponse.SC_INTERNAL_SERVER_ERROR
    }
  }
}
