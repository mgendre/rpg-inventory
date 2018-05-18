package org.rpg.inventory.domain.repository

import org.rpg.inventory.domain.data.MediaEO
import org.springframework.data.jpa.repository.JpaRepository

interface MediaRepository : JpaRepository<MediaEO, Long>
