package com.hlebon.dbcoursework.repository.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.web.controller.views.DepartmentViews;
import com.hlebon.dbcoursework.web.controller.views.FacultyViews;
import com.hlebon.dbcoursework.web.controller.views.SpecialityViews;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "department", schema = "university", catalog = "postgres")
@Getter
@Setter
public class DepartmentEntity {

    @Id
    @JsonView({
            DepartmentViews.DepartmentWithoutFaculty.class,
            FacultyViews.FacultyWithDepartment.class,
            SpecialityViews.SpecialityWithDepartment.class
    })
    private Long id;

    @JsonView({
            DepartmentViews.DepartmentWithoutFaculty.class,
            FacultyViews.FacultyWithDepartment.class,
            SpecialityViews.SpecialityWithDepartment.class
    })
    private String name;

    @ManyToOne
    @JsonView({DepartmentViews.DepartmentWithFaculty.class})
    private FacultyEntity faculty;

}
