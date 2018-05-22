package com.hlebon.dbcoursework.web.controller.requests;

import lombok.Data;

@Data
public class GetSubjectBySessionAndStudentRequest {
    private long sessionId;
    private long studentId;
}
