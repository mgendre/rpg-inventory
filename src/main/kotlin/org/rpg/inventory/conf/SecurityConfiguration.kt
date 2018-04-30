package org.rpg.inventory.conf

import org.rpg.inventory.conf.util.AppSuccessAuthentication
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.AuthenticationException
import org.springframework.security.web.AuthenticationEntryPoint
import java.io.IOException
import javax.servlet.http.HttpServletRequest
import javax.servlet.http.HttpServletResponse


@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, jsr250Enabled = true, securedEnabled = true)
@EnableWebSecurity
class SecurityConfig(
  val successHandler: AppSuccessAuthentication
) : WebSecurityConfigurerAdapter() {

  override fun configure(http: HttpSecurity) {
    http
      .csrf().disable()
      .authorizeRequests().antMatchers("/**").permitAll().and()
      .exceptionHandling().authenticationEntryPoint(UnauthorizedEntryPoint()).and()
      .oauth2Login()
      .successHandler(successHandler)
        .permitAll().and()
  }

  inner class UnauthorizedEntryPoint : AuthenticationEntryPoint {
    @Throws(IOException::class)
    override fun commence(request: HttpServletRequest, response: HttpServletResponse,
                          authException: AuthenticationException) {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED)
    }
  }
}
