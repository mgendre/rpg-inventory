package org.rpg.inventory.service

import org.jooq.DSLContext
import org.rpg.inventory.domain.data.UserEO
import org.rpg.inventory.domain.repository.UserRepository
import org.rpg.inventory.domain.tables.Users.USERS
import org.rpg.inventory.util.SecurityUtils
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class UserService(val dsl: DSLContext,
                  val userRepository: UserRepository) {

  fun createIfNotExist(username: String) {
    if (dsl.selectCount().from(USERS).where(USERS.USERNAME.eq(username)).fetchOne(0) == 0) {
      dsl.insertInto(USERS).set(USERS.USERNAME, username).execute()
    }
  }

  fun getCurrentUser(): UserEO {
    return userRepository.getByUsername(SecurityUtils.getCurrentUserUsername()!!)
  }

  fun getCurrentUserId(): Long {
    return getCurrentUser().id!!
  }
}
