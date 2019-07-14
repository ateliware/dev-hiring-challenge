package br.com.ateliware.challenge;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

import nz.net.ultraq.thymeleaf.LayoutDialect;

@SpringBootApplication
@ComponentScan(basePackages = "br.com.ateliware")
public class AteliwareChallengeApplication {

    public static void main(String[] args) {
        SpringApplication.run(AteliwareChallengeApplication.class, args);
    }

    @Bean
    public LayoutDialect layoutDialect() {
        return new LayoutDialect();
    }

}
