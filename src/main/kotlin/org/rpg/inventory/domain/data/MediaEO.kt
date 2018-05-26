package org.rpg.inventory.domain.data

import org.hibernate.validator.constraints.Length
import org.rpg.inventory.domain.data.enums.MediaType
import java.time.ZonedDateTime
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
  @Column(name = "data", nullable = false)
  val data: ByteArray,

  @NotNull
  @Column(name = "creation_date", nullable = false)
  val creationDate: ZonedDateTime,

  @NotNull
  @Column(name = "confirmed", nullable = false)
  var confirmed: Boolean,

  @NotNull
  @Enumerated(EnumType.STRING)
  @Column(name = "type", nullable = false)
  val type: MediaType
) {
  @NotNull
  @ManyToOne
  @JoinColumn(name = "user_id", nullable = false)
  lateinit var user: UserEO
}
