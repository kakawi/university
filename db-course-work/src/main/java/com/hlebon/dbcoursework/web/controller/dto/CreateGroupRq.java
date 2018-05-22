package com.hlebon.dbcoursework.web.controller.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateGroupRq {

    private String groupNumber;

    private Long specialityId;

    private int yearOfEstablishment;

}
