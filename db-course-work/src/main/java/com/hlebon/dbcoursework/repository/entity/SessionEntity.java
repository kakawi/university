package com.hlebon.dbcoursework.repository.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.web.controller.views.SessionViews;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Basic;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import java.util.Collection;


@Entity
@Table(name = "session", schema = "university", catalog = "postgres")
@Getter
@Setter
public class SessionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sessionGenerator")
    @SequenceGenerator(name = "sessionGenerator", sequenceName = "S_SESSION", allocationSize = 1)
    @JsonView(SessionViews.SessionWithoutSet.class)
    private Long id;

    @JsonView(SessionViews.SessionWithoutSet.class)
    private String name;

    @JsonView(SessionViews.SessionWithoutSet.class)
    private Integer yearOfSession;

    @Basic(optional = false)
    @JsonView(SessionViews.SessionWithoutSet.class)
    private boolean isFinished;

    @OneToMany(mappedBy = "session")
    private Collection<ScheduleEntity> schedules;

}
