package com.github.integration.backend.common;

import lombok.*;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
public enum EnumLanguages {

    C("c"),
    PHP("php"),
    JAVA("java"),
    PYTHON("python"),
    JAVA_SCRIPT("javascript");

    @NonNull
    private String name;

    public static EnumLanguages getByString(String language) {
        for (EnumLanguages enumLanguage : values()) {
            if (enumLanguage.getName().equalsIgnoreCase(language)) {
                return enumLanguage;
            }
        }
        return null;
    }
}
