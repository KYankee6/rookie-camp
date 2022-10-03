package com.kt.edu.thirdproject.utils;

import java.text.SimpleDateFormat;
import java.util.Date;

public class DateUtil {
	
	/**
	 * 날짜 유효성 검사, 
	 * @param pattern
	 * @param source
	 * @return source
	 * @exception 현재 시각을 리턴
	 */
	public static String getValidatedDateString(String pattern, String source) {
		try {
			new SimpleDateFormat(pattern).parse(source);
			return source;
		} catch (Exception e) {
			return new SimpleDateFormat(pattern).format(new Date());
		}
	}
}
