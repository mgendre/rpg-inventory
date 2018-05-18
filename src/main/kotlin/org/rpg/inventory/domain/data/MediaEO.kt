package org.rpg.inventory.domain.data

import org.hibernate.validator.constraints.Length
import javax.persistence.*
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

@Entity
@Table(name = "media")
class MediaEO(

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id")
  val id: Long?,

  @Length(max = 255)
  @Column(name = "filename")
  val filename: String,

  @Length(max = 255)
  @Column(name = "content_type")
  val contentType: String,

  @Size(max = 50 * 1024 * 1024)
  @NotNull
  @Lob
  @Column(nullable = false)
  val data: ByteArray

) {
  @NotNull
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  lateinit var user: UserEO
}
