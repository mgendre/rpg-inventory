package org.rpg.inventory.rest

import org.rpg.inventory.conf.ApplicationProperties
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RestController

@RestController
class ConfController(
  val applicationProperties: ApplicationProperties) {
  @GetMapping("/keycloak.json")
  fun getKeycloakConfig(): Map<String, Any?> {
    val keycloak = applicationProperties?.keycloakClient
    return mapOf(
      "realm" to keycloak?.realm,
      "auth-server-url" to keycloak?.uri,
      "ssl-required" to keycloak?.sslRequired,
      "resource" to keycloak?.clientId,
      "public-client" to true,
      "confidential-port" to keycloak?.confidentialPort)
  }
}
