package com.kt.edu.thirdproject.utils;

public enum RestStatusEnum {
	OK(200, "ok"),
	BAD_REQUEST(400, "BAD REQUEST"),
	UNAUTHORIZED(401, "Unauthorized"),
	FORBIDDEN(401, "Forbidden"),
	NOT_FOUND(404, "Not Found"),
	INTERNAL_SERVER_ERROR(500, "INTERNAL SERVER ERROR"),
	SERVICE_UNAVAILABLE(503, "SERVICE UNAVAILABLE");
	
	int statusCode;
	String message;
	
	RestStatusEnum(int statusCode, String message) {
		this.statusCode = statusCode;
		this.message = message;
	}
}
