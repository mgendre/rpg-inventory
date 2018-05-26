package org.rpg.inventory.domain.repository

import org.rpg.inventory.domain.data.MediaEO
import org.springframework.data.jpa.repository.JpaRepository
import java.time.ZonedDateTime

interface MediaRepository : JpaRepository<MediaEO, Long> {
  fun findByConfirmedFalseAndCreationDateBefore(date: ZonedDateTime): List<MediaEO>
}
