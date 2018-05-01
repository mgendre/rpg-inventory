package org.rpg.inventory.domain.data

import org.hibernate.validator.constraints.Length
import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
@Table(name = "characters")
class CharacterEO(
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  val id: Long?,

  @NotNull
  @Column(name = "name")
  @Length(max = 50)
  val name: String
) {

  @NotNull
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  lateinit var user: UserEO

}
