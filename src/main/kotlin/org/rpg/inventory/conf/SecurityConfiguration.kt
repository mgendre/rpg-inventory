package org.rpg.inventory.conf

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.core.userdetails.User
import org.springframework.security.crypto.factory.PasswordEncoderFactories
import org.springframework.security.crypto.password.PasswordEncoder




@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true, jsr250Enabled = true, securedEnabled = true)
@EnableWebSecurity
class SecurityConfig : WebSecurityConfigurerAdapter() {

  override fun configure(http: HttpSecurity) {
    http
      .csrf().disable()
      .authorizeRequests().antMatchers("/**").permitAll().and()
      .formLogin()
        .loginPage("/#/login")
        .usernameParameter("user")
        .passwordParameter("secret")
        .loginProcessingUrl("/auth/login")
        .failureUrl("/#/login?error")
        .defaultSuccessUrl("/#/main")
        .permitAll().and()
      .logout()
        .clearAuthentication(true)
        .logoutUrl("/auth/logout")
        .permitAll()
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
