package org.rpg.inventory.conf

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.AuthenticationException
import org.springframework.security.core.userdetails.User
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import org.springframework.security.crypto.password.PasswordEncoder
import javax.servlet.http.HttpServletResponse
import javax.servlet.ServletException
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler
import org.springframework.security.web.authentication.AuthenticationFailureHandler
import java.io.IOException
import javax.servlet.http.HttpServletRequest
import com.sun.xml.internal.ws.spi.db.BindingContextFactory.LOGGER
import org.springframework.security.web.AuthenticationEntryPoint




@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, jsr250Enabled = true, securedEnabled = true)
@EnableWebSecurity
class SecurityConfig : WebSecurityConfigurerAdapter() {

  override fun configure(http: HttpSecurity) {
    http
      .csrf().disable()
      .authorizeRequests().antMatchers("/**").permitAll().and()
      .exceptionHandling().authenticationEntryPoint(UnauthorizedEntryPoint()).and()
      .formLogin()
        .loginPage("/#/login")
        .usernameParameter("user")
        .passwordParameter("secret")
        .loginProcessingUrl("/auth/login")
        .failureUrl("/#/login?error=true")
        .defaultSuccessUrl("/#/home")
        .permitAll().and()
      .logout()
        .clearAuthentication(true)
        .logoutUrl("/auth/logout")
        .logoutSuccessUrl("/#/login?logout=true")
        .deleteCookies("JSESSIONID")
        .invalidateHttpSession(true)
        .permitAll()
  }

  inner class UnauthorizedEntryPoint : AuthenticationEntryPoint {
    @Throws(IOException::class)
    override fun commence(request: HttpServletRequest, response: HttpServletResponse,
                          authException: AuthenticationException) {
      response.sendError(HttpServletResponse.SC_UNAUTHORIZED)
    }
  }

  private fun failureHandler(): AuthenticationFailureHandler {
    return object : SimpleUrlAuthenticationFailureHandler() {
      @Throws(IOException::class, ServletException::class)
      override fun onAuthenticationFailure(request: HttpServletRequest,
                                  response: HttpServletResponse, exception: AuthenticationException) {
        response.contentType = "text/html;charset=UTF-8"
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Authentication Failed. Wrong username or password or both")
      }
    }
  }

  @Autowired
  @Throws(Exception::class)
  fun configureGlobal(auth: AuthenticationManagerBuilder) {
    val encoder = PasswordEncoderFactories.createDelegatingPasswordEncoder()
    auth
      .inMemoryAuthentication()
      .withUser("test").password(encoder.encode("test")).roles("USER")
  }
}
