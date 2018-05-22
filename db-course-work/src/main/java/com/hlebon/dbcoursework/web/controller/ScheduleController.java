package com.hlebon.dbcoursework.web.controller;

import com.hlebon.dbcoursework.repository.entity.ScheduleEntity;
import com.hlebon.dbcoursework.repository.entity.SessionEntity;
import com.hlebon.dbcoursework.repository.entity.SetEntity;
import com.hlebon.dbcoursework.repository.entity.SubjectEntity;
import com.hlebon.dbcoursework.web.controller.requests.CreateScheduleRequest;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@RestController
@CrossOrigin("*")
@RequestMapping(Constants.API_URL)
public class ScheduleController {

    @PersistenceContext
    private EntityManager entityManager;

    @PostMapping(path = "/schedule/add", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @Transactional
    public ScheduleEntity getAdd(@RequestBody CreateScheduleRequest createScheduleRequest) {
        SessionEntity sessionEntity = entityManager.find(SessionEntity.class, createScheduleRequest.getIdSession());
        SetEntity setEntity = entityManager.find(SetEntity.class, createScheduleRequest.getIdSet());
        SubjectEntity subjectEntity = entityManager.find(SubjectEntity.class, createScheduleRequest.getIdSubject());
        ScheduleEntity scheduleEntity = new ScheduleEntity();
        scheduleEntity.setSet(setEntity);
        scheduleEntity.setSession(sessionEntity);
        scheduleEntity.setSubject(subjectEntity);

        entityManager.persist(scheduleEntity);
        delay();
        return scheduleEntity;
    }

    private void delay() {
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
