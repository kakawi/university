package com.hlebon.dbcoursework.repository.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.web.controller.views.SubjectViews;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "subject", schema = "university", catalog = "postgres")
@Getter
@Setter
public class SubjectEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "subjectGenerator")
    @SequenceGenerator(name = "subjectGenerator", sequenceName = "S_SUBJECT", schema = "university", allocationSize = 1)
    @JsonView(SubjectViews.Subject.class)
    private Long id;

    @JsonView(SubjectViews.Subject.class)
    private String name;

}
