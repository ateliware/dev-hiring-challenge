package com.github.integration.backend.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ServiceException extends Exception {

    private final String message;

}
