import org.springframework.beans.factory.annotation.Value
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.oauth2.client.web.OAuth2AuthorizationRequestRedirectFilter.DEFAULT_AUTHORIZATION_REQUEST_BASE_URI

/**
 * The "core" of this demo
 */
@Configuration
@EnableGlobalMethodSecurity(prePostEnabled = true)
internal class SecurityConfig {

    /**
     * Configures OAuth Login with Spring Security 5.
     * @return
     */
    @Bean
    fun webSecurityConfigurer(
            @Value("\${keycloak-client.realm}") realm: String
    ): WebSecurityConfigurerAdapter {
        return object : WebSecurityConfigurerAdapter() {
            @Throws(Exception::class)
            public override fun configure(http: HttpSecurity) {
                http.sessionManagement()
                        .sessionCreationPolicy(SessionCreationPolicy.IF_REQUIRED)
                        .and()
                            .authorizeRequests()
                            .antMatchers("/*").authenticated()
                        .and()
                            .oauth2Login()
                            .loginPage("$DEFAULT_AUTHORIZATION_REQUEST_BASE_URI/$realm")
            }
        }
    }
}