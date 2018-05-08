package org.rpg.inventory.domain.data

import javax.persistence.*
import javax.validation.constraints.NotNull

@Entity
@Table(name = "character_sheets")
class CharacterSheetEO(
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  val id: Long?,

  @NotNull
  @Column(name = "data")
  var data: String?
) {

  @NotNull
  @ManyToOne
  @JoinColumn(name = "character_id", nullable = false)
  lateinit var character: CharacterEO

}
