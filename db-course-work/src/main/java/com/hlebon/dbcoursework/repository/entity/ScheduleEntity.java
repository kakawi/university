package com.hlebon.dbcoursework.repository.entity;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.web.controller.views.ScheduleViews;
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
@Table(name = "schedule", schema = "university", catalog = "postgres")
@Getter
@Setter
public class ScheduleEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "scheduleGenerator")
    @SequenceGenerator(name = "scheduleGenerator", sequenceName = "S_SCHEDULE", schema = "university", allocationSize = 1)
    @JsonView(ScheduleViews.ScheduleWithout.class)
    private Long id;

    @ManyToOne
    @JsonView(ScheduleViews.ScheduleWithSession.class)
    private SessionEntity session;

    @ManyToOne
    @JsonView(ScheduleViews.ScheduleWithSubject.class)
    private SubjectEntity subject;

    @ManyToOne
    @JsonView(ScheduleViews.ScheduleWithSet.class)
    private SetEntity set;
}
