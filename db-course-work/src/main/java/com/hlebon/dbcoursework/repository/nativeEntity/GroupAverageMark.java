package com.hlebon.dbcoursework.repository.nativeEntity;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class GroupAverageMark {

    private String groupNumber;

    private BigDecimal averageMark;

}
