package org.rpg.inventory.conf

import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.context.annotation.Configuration

@Configuration
@ConfigurationProperties(prefix = "application", ignoreUnknownFields = true)
class ApplicationProperties {
}
