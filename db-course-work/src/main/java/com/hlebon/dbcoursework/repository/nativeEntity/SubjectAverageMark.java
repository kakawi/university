package com.hlebon.dbcoursework.repository.nativeEntity;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class SubjectAverageMark {

    private String subjectName;

    private BigDecimal averageMark;

}
