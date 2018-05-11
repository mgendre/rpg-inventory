package org.rpg.inventory

import org.springframework.boot.SpringApplication
import org.springframework.boot.autoconfigure.EnableAutoConfiguration
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.context.annotation.ComponentScan
import org.springframework.context.annotation.Configuration

@Configuration
@ComponentScan
@EnableAutoConfiguration
@SpringBootApplication
class Application

fun main(args: Array<String>) {
  SpringApplication.run(Application::class.java, *args)
}
