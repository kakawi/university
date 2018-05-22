package com.hlebon.dbcoursework.web.controller.requests;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateMarkRequest {
    private long sessionId;
    private long studentId;
    private long subjectId;
    private int mark;
}
