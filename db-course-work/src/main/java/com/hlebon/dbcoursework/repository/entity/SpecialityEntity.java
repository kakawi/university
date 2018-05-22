package com.hlebon.dbcoursework.repository.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.web.controller.views.SpecialityViews;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "speciality", schema = "university", catalog = "postgres")
@Getter
@Setter
public class SpecialityEntity {

    @Id
    @JsonView({
            SpecialityViews.SpecialityWithoutDepartment.class
    })
    private Long id;

    @JsonView({SpecialityViews.SpecialityWithoutDepartment.class})
    private String name;

    @ManyToOne
    @JsonView({SpecialityViews.SpecialityWithDepartment.class})
    private DepartmentEntity department;

}
