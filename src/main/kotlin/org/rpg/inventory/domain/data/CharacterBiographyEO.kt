package org.rpg.inventory.domain.data

import javax.persistence.*
import javax.persistence.CascadeType.REMOVE
import javax.validation.constraints.NotNull

@Entity
@Table(name = "character_biographies")
class CharacterBiographyEO(
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  val id: Long?,

  @ManyToOne(cascade = [REMOVE])
  @JoinColumn(name = "portrait_id", nullable = true)
  var portrait: MediaEO?,

  @ManyToOne(cascade = [REMOVE])
  @JoinColumn(name = "picture_id", nullable = true)
  var picture: MediaEO?
) {

  @NotNull
  @ManyToOne
  @JoinColumn(name = "character_id", nullable = false)
  lateinit var character: CharacterEO
}
