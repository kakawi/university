package com.hlebon.dbcoursework.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.repository.dao.MarkDao;
import com.hlebon.dbcoursework.repository.entity.ScheduleEntity;
import com.hlebon.dbcoursework.repository.entity.StudentEntity;
import com.hlebon.dbcoursework.repository.entity.StudentMarkEntity;
import com.hlebon.dbcoursework.web.controller.requests.CreateMarkRequest;
import com.hlebon.dbcoursework.web.controller.views.StudentMarkViews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(Constants.API_URL)
public class MarkController {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private MarkDao markDao;

    @GetMapping(path = "/marks", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @JsonView({StudentMarkViews.StudentMarkList.class})
    public List<StudentMarkEntity> getStudentMarks() {
        delay();
        List<StudentMarkEntity> marks = entityManager.createQuery("select d from StudentMarkEntity d", StudentMarkEntity.class).getResultList();
        return marks;
    }

    @GetMapping(path = "/marks/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @JsonView({StudentMarkViews.StudentMarkList.class})
    public StudentMarkEntity getStudentMark(@PathVariable("id") long id) {
        delay();
        return entityManager.find(StudentMarkEntity.class, id);
    }

    @DeleteMapping(path = "/marks/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    @JsonView({StudentMarkViews.StudentMarkList.class})
    @Transactional
    public StudentMarkEntity deleteStudentMark(@PathVariable("id") long id) {
        delay();
        StudentMarkEntity studentMarkEntity = entityManager.find(StudentMarkEntity.class, id);
        entityManager.remove(studentMarkEntity);
        return studentMarkEntity;
    }

    @PostMapping(path = "/marks/create", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public StudentMarkEntity saveStudentMark(@RequestBody CreateMarkRequest request) {
        delay();
        StudentMarkEntity studentMarkEntity = new StudentMarkEntity();
        ScheduleEntity scheduleEntity = entityManager
                .createQuery("select schedule from ScheduleEntity schedule join schedule.set.groups g join g.students st where schedule.session.id = :sessionId and schedule.subject.id = :subjectId and st.id = :studentId", ScheduleEntity.class)
                .setParameter("sessionId", request.getSessionId())
                .setParameter("subjectId", request.getSubjectId())
                .setParameter("studentId", request.getStudentId())
                .getSingleResult();
        StudentEntity student = entityManager.find(StudentEntity.class, request.getStudentId());
        studentMarkEntity.setMark(request.getMark());
        studentMarkEntity.setSchedule(scheduleEntity);
        studentMarkEntity.setStudent(student);
        markDao.save(studentMarkEntity);
        return studentMarkEntity;
    }

    private void delay() {
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
