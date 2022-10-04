package com.kt.edu.thirdproject.interceptor;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Enumeration;

/**
 * Request 정보 로깅을 위한 인터셉터
 *
 * @author yankee6
 */
@Component
public class WebLoggingInterceptor implements HandlerInterceptor {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if (logger.isInfoEnabled()) {
            String reqInfo = StringUtils.join(
                    "[  REQUEST METHOD      ] : ", request.getMethod(), " \n"
                    , "[  REQUEST URL         ] : ", request.getRequestURL().toString(), " \n"
                    , "[  REFERER URL         ] : ", request.getHeader("referer"), " \n");
            String params = new String();
            Enumeration<String> en = request.getParameterNames();
            while (en.hasMoreElements()) {
                String key = en.nextElement();
                params = StringUtils.join(params, "     ", key, " : ", request.getParameter(key), " \n");
            }
            if (StringUtils.isBlank(params)) {
                params = "        : EMPTY";
            }

            logger.info("\n ######################## [    REQUEST INFO    ] ######################## \n"
                            + "{}"
                            + "[  REQUEST PARAMETERS  ] \n"
                            + "{}"
                            + "\n"
                            + " * Interceptor : system.interceptor.WebLoggingInterceptor.java \n"
                            + "######################## [    REQUEST INFO END    ] ######################## \n"
                    , reqInfo, params);
        }
        return HandlerInterceptor.super.preHandle(request, response, handler);
    }

}