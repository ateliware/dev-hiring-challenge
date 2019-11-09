package com.github.integration.backend.business.validator;

import com.github.integration.backend.common.EnumLanguages;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class LanguageValidator implements ConstraintValidator<ValidLanguage, String> {

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        return EnumLanguages.getByString(value) != null;
    }
}
