package org.rpg.inventory.domain.data

import org.hibernate.validator.constraints.Length
import org.rpg.inventory.domain.data.enums.SupportedRPGType
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
  @Length(max = 100)
  val name: String,

  @Enumerated(EnumType.STRING)
  @NotNull
  @Column(name = "rpg_type", nullable = false)
  val rpgType: SupportedRPGType
) {

  @NotNull
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  lateinit var user: UserEO

}
