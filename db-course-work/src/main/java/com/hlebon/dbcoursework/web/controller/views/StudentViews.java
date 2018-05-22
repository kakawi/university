package com.hlebon.dbcoursework.web.controller.views;

public interface StudentViews {

    interface StudentWithoutGroup {}

    interface StudentWithGroup extends StudentWithoutGroup, GroupViews.GroupWithoutSet {}

}
