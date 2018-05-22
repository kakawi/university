package com.hlebon.dbcoursework.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.hlebon.dbcoursework.repository.dao.StudentDao;
import com.hlebon.dbcoursework.repository.entity.SessionEntity;
import com.hlebon.dbcoursework.repository.entity.StudentEntity;
import com.hlebon.dbcoursework.web.controller.views.StudentViews;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping(Constants.API_URL)
public class StudentController {

    @PersistenceContext
    private EntityManager entityManager;

    @Autowired
    private StudentDao studentDao;

    @JsonView({StudentViews.StudentWithGroup.class})
    @GetMapping(path = "/students", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<StudentEntity> getStudents() {
        delay();

        List<StudentEntity> students = entityManager.createQuery("select d from StudentEntity d", StudentEntity.class).getResultList();
        return students;
    }

    @JsonView({StudentViews.StudentWithoutGroup.class})
    @GetMapping(path = "/students/{id}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public StudentEntity getStudent(@PathVariable("id") long id) {
        delay();
        return entityManager.find(StudentEntity.class, id);
    }

    @PostMapping(path = "/students/create", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public StudentEntity saveStudent(@RequestBody StudentEntity student) {
        delay();
        studentDao.save(student);
        return student;
    }

    @JsonView({StudentViews.StudentWithGroup.class})
    @PostMapping(path = "/students/bySession", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public List<StudentEntity> getStudentsBySession(@RequestBody SessionEntity session) {
        delay();

        List<StudentEntity> students = entityManager
                .createQuery("select distinct st from SessionEntity s join s.schedules sch join sch.set.groups g join g.students st where s = :session", StudentEntity.class)
                .setParameter("session", session)
                .getResultList();

        return students;
    }

    private void delay() {
        try {
            Thread.sleep(500);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
