package com.hlebon.dbcoursework.repository.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.web.controller.views.GroupViews;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.List;

@Entity
@Table(name = "group", schema = "university", catalog = "postgres")
@Getter
@Setter
public class GroupEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "groupGenerator")
    @SequenceGenerator(name = "groupGenerator", schema = "university", sequenceName = "S_GROUP")
    @JsonView({GroupViews.GroupWithoutSet.class})
    private Long id;

    @JsonView({GroupViews.GroupWithoutSet.class})
    private String groupNumber;

    @ManyToOne(optional = false)
    @JsonView({GroupViews.GroupWithSet.class})
    private SetEntity set;

    @OneToMany(mappedBy = "group")
    private List<StudentEntity> students;

}
