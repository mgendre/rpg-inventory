package org.rpg.inventory.domain.data

import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
@Table(name = "user_rpgi")
data class UserEO(
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  val id: Long?,

  @NotNull
  @Column(name = "username")
  val username: String
) {
  constructor() : this(null, "")
}
