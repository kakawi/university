package com.hlebon.dbcoursework.web.controller.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateScheduleRequest {
    private long idSession;
    private long idSet;
    private long idSubject;
}
