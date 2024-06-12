package com.example.demo.model.enums;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum RentalStatusValueEnum {
    OUT, RETURNED, LOST, WITHDRAWN;

    public static List<String> getRentalStatuses() {
        return Arrays.stream(RentalStatusValueEnum.values())
            .map(Enum::name)
            .collect(Collectors.toList());
    }
}
