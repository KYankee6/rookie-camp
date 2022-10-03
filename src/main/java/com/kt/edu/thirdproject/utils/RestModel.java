package com.kt.edu.thirdproject.utils;

public class RestModel {
    private RestStatusEnum status;
    private String message;
    private Object data;

    private RestModel(Builder builder) {
        this.status = builder.status;
        this.data = builder.data;
        this.message = builder.message;
    }

    public RestStatusEnum getStatus() {
        return status;
    }

    public void setStatus(RestStatusEnum status) {
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public static class Builder {
        private RestStatusEnum status = RestStatusEnum.OK;
        private String message = "";
        private Object data = null;

        public Builder status(RestStatusEnum value) {
            status = value;
            return this;
        }
        public Builder message(String value) {
            message = value;
            return this;
        }
        public Builder data(Object value) {
            data = value;
            return this;
        }

        public RestModel build() {
            return new RestModel(this);
        }
    }
}
