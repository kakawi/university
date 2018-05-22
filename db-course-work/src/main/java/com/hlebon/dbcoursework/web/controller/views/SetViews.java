package com.hlebon.dbcoursework.web.controller.views;

public interface SetViews {

    interface SetWithoutSpeciality{}

    interface SetWithSpeciality extends SetWithoutSpeciality, SpecialityViews.SpecialityWithoutDepartment {}

}
