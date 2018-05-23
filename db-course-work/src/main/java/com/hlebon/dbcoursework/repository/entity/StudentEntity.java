package com.hlebon.dbcoursework.repository.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.web.controller.views.StudentViews;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "student", schema = "university", catalog = "postgres")
@Getter
@Setter
public class StudentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "studentGenerator")
    @SequenceGenerator(name = "studentGenerator", sequenceName = "S_STUDENT", schema = "university", allocationSize = 1)
    @JsonView(StudentViews.StudentWithoutGroup.class)
    private Long id;

    @JsonView(StudentViews.StudentWithoutGroup.class)
    private String lastName;

    @JsonView(StudentViews.StudentWithoutGroup.class)
    private String firstName;

    @JsonView(StudentViews.StudentWithoutGroup.class)
    private String middleName;

    @JsonView(StudentViews.StudentWithoutGroup.class)
    private String recordBook;

    @JsonView(StudentViews.StudentWithoutGroup.class)
    private String addressOfPermanentResidence;

    @JsonView(StudentViews.StudentWithoutGroup.class)
    private String addressOfResidence;

    @JsonView(StudentViews.StudentWithoutGroup.class)
    private boolean isGetScholarship;

    @JsonView(StudentViews.StudentWithoutGroup.class)
    private Integer premium;

    @JsonView(StudentViews.StudentWithoutGroup.class)
    private boolean isLocal;

    @ManyToOne
    @JsonView(StudentViews.StudentWithGroup.class)
    private GroupEntity group;

}
