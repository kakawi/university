package com.hlebon.dbcoursework.repository.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.web.controller.views.DepartmentViews;
import com.hlebon.dbcoursework.web.controller.views.FacultyViews;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "faculty", schema = "university", catalog = "postgres")
@Getter
@Setter
public class FacultyEntity {

    @Id
    @JsonView({FacultyViews.FacultyWithoutDepartment.class, DepartmentViews.DepartmentWithFaculty.class})
    private Long id;

    @JsonView({FacultyViews.FacultyWithoutDepartment.class, DepartmentViews.DepartmentWithFaculty.class})
    private String name;

    @OneToMany(mappedBy = "faculty")
    @JsonView(FacultyViews.FacultyWithDepartment.class)
    private List<DepartmentEntity> departments;

}
