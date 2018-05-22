package com.hlebon.dbcoursework.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.repository.entity.SubjectEntity;
import com.hlebon.dbcoursework.web.controller.requests.GetSubjectBySessionAndStudentRequest;
import com.hlebon.dbcoursework.web.controller.views.SubjectViews;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(Constants.API_URL)
public class SubjectController {

    @PersistenceContext
    private EntityManager entityManager;

    @JsonView({SubjectViews.Subject.class})
    @GetMapping(path = "/subjects", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<SubjectEntity> getSubjects() {
        delay();
        List<SubjectEntity> subjects = entityManager.createQuery("select d from SubjectEntity d", SubjectEntity.class).getResultList();
        return subjects;
    }

    @JsonView({SubjectViews.Subject.class})
    @GetMapping(path = "/subjects/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public SubjectEntity getSubject(@PathVariable("id") long id) {
        delay();
        return entityManager.find(SubjectEntity.class, id);
    }

    @JsonView({SubjectViews.Subject.class})
    @GetMapping(path = "/subjects/bySessionAndSet", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<SubjectEntity> getSubjectForSessionAndSet(@RequestParam("idSession") long idSession, @RequestParam("idSet") long idSet) {
        delay();
        List<SubjectEntity> resultList = entityManager.createQuery("select schedule.subject from ScheduleEntity schedule where schedule.session.id = :idSession and schedule.set.id = :idSet", SubjectEntity.class)
                .setParameter("idSession", idSession)
                .setParameter("idSet", idSet).getResultList();
        return resultList;
    }

    @JsonView({SubjectViews.Subject.class})
    @PostMapping(path = "/subjects/forSessionAndStudent", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<SubjectEntity> getSubjectForSessionAndStudent(@RequestBody GetSubjectBySessionAndStudentRequest request) {
        delay();
        List<SubjectEntity> resultList = entityManager
                .createQuery("select schedule.subject from ScheduleEntity schedule join schedule.set.groups g join g.students st where schedule.session.id = :idSession and st.id  = :idStudent", SubjectEntity.class)
                .setParameter("idSession", request.getSessionId())
                .setParameter("idStudent", request.getStudentId()).getResultList();
        return resultList;
    }

    private void delay() {
        try {
            Thread.sleep(700);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }


}
