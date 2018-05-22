package com.hlebon.dbcoursework.web.controller.views;

public interface GroupViews {

    interface GroupWithoutSet {}

    interface GroupWithSet extends GroupWithoutSet, SetViews.SetWithSpeciality {}

}
