package com.kt.edu.thirdproject.utils;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * Util 메소드 모음
 * @author yankee6
 */
public class CommonUtils {

	/**
	 * 특수문자 치환
	 * @param ipt Input String
	 * @return String
	 */
	public static String replaceSpecialChars(String ipt) {
		return StringUtils.replaceEach(ipt, new String[]{"&", "\"", "'", "<", ">"}, new String[]{"&amp;", "&quot;", "&#039", "&lt;", "&gt;"});
	}

	/**
	 * Safe List
	 * @param <T>
	 * @param list
	 * @return
	 */
	public static <T> List<T> emptyListIfNull(List<T> list) {
		return list == null ? Collections.<T>emptyList() : list;
	}

	/**
	 * PHP time() 함수 대응
	 * @return long
	 */
	public static long getPhpTime() {
		return (new Date().getTime() / 1000);
	}

	/**
	 * Request 얻기
	 * @return HttpServletRequest
	 */
	public static HttpServletRequest getCurrentRequest() {
		return ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
	}

	/**
	 * Client의 IP 주소 얻기
	 * @return String ip
	 */
	public static String getRemoteAddr() {
		String ip = new String();
		HttpServletRequest request = CommonUtils.getCurrentRequest();
		ip = request.getHeader("X-Forwarded-For");
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("WL-Proxy-Client-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_CLIENT_IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("HTTP_X_FORWARDED_FOR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-Real-IP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("X-RealIP");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getHeader("REMOTE_ADDR");
        }
        if (ip == null || ip.length() == 0 || "unknown".equalsIgnoreCase(ip)) {
            ip = request.getRemoteAddr();
        }
		return ip;
	}

}
