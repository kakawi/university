package com.hlebon.dbcoursework.web.controller.views;

public interface SessionViews {

    interface SessionWithoutSet {}

    interface SessionWithScheduleAndSet extends ScheduleViews.ScheduleWithSet, SetViews.SetWithSpeciality {}

}
