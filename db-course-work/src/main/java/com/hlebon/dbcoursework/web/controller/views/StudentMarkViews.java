package com.hlebon.dbcoursework.web.controller.views;

public interface StudentMarkViews {

    interface StudentMarkList extends
            ScheduleViews.ScheduleWithSubject,
            StudentViews.StudentWithoutGroup,
            ScheduleViews.ScheduleWithSession,
            SessionViews.SessionWithoutSet,
            SubjectViews.Subject
    {}

}
