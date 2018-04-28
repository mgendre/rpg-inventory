package org.rpg.inventory.conf

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = true)
class ApplicationProperties {
  var keycloakClient: KeycloakClient? = null
}

class KeycloakClient {
  lateinit var uri: String
  lateinit var realm: String
  lateinit var secret: String
  lateinit var clientId: String
  lateinit var sslRequired: String
  var confidentialPort: Int = 0
}
