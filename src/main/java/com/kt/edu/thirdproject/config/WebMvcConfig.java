package com.kt.edu.thirdproject.config;

import com.kt.edu.thirdproject.interceptor.WebLoggingInterceptor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {
    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new WebLoggingInterceptor())
                .addPathPatterns("/*")
                .excludePathPatterns("/images/**","/css/**", "/fonts/**", "/plugin/**", "/scripts/**","/error");
    }
}