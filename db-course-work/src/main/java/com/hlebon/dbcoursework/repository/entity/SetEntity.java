package com.hlebon.dbcoursework.repository.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.web.controller.views.SetViews;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "set", schema = "university", catalog = "postgres")
public class SetEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "setGenerator")
    @SequenceGenerator(name = "setGenerator", schema = "university", sequenceName = "S_SET")
    @JsonView({SetViews.SetWithoutSpeciality.class})
    private Long id;

    @JsonView({SetViews.SetWithoutSpeciality.class})
    private Long yearOfEstablishment;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JsonView({SetViews.SetWithSpeciality.class})
    private SpecialityEntity speciality;

    @OneToMany(mappedBy = "set")
    private List<GroupEntity> groups;

}
