package com.hlebon.dbcoursework.repository.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.web.controller.views.StudentMarkViews;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "student_mark", schema = "university", catalog = "postgres")
@Getter
@Setter
public class StudentMarkEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "studentMarkGenerator")
    @SequenceGenerator(name = "studentMarkGenerator", sequenceName = "S_STUDENT_MARK", schema = "university", allocationSize = 1)
    @JsonView(StudentMarkViews.StudentMarkList.class)
    private Long id;

    @JsonView(StudentMarkViews.StudentMarkList.class)
    private Integer mark;

    @ManyToOne
    @JsonView(StudentMarkViews.StudentMarkList.class)
    private ScheduleEntity schedule;

    @ManyToOne
    @JsonView(StudentMarkViews.StudentMarkList.class)
    private StudentEntity student;

}
