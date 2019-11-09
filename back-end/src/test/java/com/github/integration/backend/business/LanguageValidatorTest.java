package com.github.integration.backend.business;

import com.github.integration.backend.business.validator.LanguageValidator;
import com.github.integration.backend.common.EnumLanguages;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
public class LanguageValidatorTest {

    @InjectMocks
    private LanguageValidator languageValidator;

    private TestSpec testSpec;

    private String validValue;

    private String invalidValue;

    private Boolean isValid;

    @Before
    public void setupTestSpec() {
        testSpec = new TestSpec();
    }

    @Test
    public void test_isValid_shall_return_true_to_a_valid_input() {
        testSpec.givenAValidValue()
                .whenLanguageValidatorIsValid(validValue)
                .thenShallReturnTrue();
    }

    @Test
    public void test_isValid_shall_return_false_to_a_invalid_input() {
        testSpec.givenAnInvalidValue()
                .whenLanguageValidatorIsValid(invalidValue)
                .thenShallReturnFalse();
    }

    private class TestSpec {

        TestSpec givenAValidValue() {
            validValue = EnumLanguages.JAVA.getName();
            return this;
        }

        TestSpec givenAnInvalidValue() {
            invalidValue = "assembly";
            return this;
        }

        TestSpec whenLanguageValidatorIsValid(String value) {
            isValid = languageValidator.isValid(value, null);
            return this;
        }

        TestSpec thenShallReturnTrue() {
            assertThat(isValid).isTrue();
            return this;
        }

        TestSpec thenShallReturnFalse() {
            assertThat(isValid).isFalse();
            return this;
        }
    }
}