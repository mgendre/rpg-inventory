package org.rpg.inventory.domain.repository

import org.rpg.inventory.domain.data.UserEO
import org.springframework.data.jpa.repository.JpaRepository

interface UserRepository : JpaRepository<UserEO, Long> {
  fun getByUsername(username: String): UserEO
}
