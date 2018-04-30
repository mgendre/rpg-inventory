package org.rpg.inventory

import org.jooq.DSLContext
import org.rpg.inventory.domain.tables.User.USER
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
@Transactional
class UserService(val dsl: DSLContext) {

  @Transactional
  fun createIfNotExist(username: String) {
    if (dsl.selectCount().from(USER).where(USER.USERNAME.eq(username)).fetchOne(0) == 0) {
      dsl.insertInto(USER).set(USER.USERNAME, username).execute()
    }
  }
}
