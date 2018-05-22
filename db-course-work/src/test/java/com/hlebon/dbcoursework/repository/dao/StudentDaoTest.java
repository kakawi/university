package com.hlebon.dbcoursework.repository.dao;

import com.hlebon.dbcoursework.repository.entity.GroupEntity;
import com.hlebon.dbcoursework.repository.entity.StudentEntity;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class StudentDaoTest {

    @Autowired
    private StudentDao studentDao;

    @PersistenceContext
    private EntityManager entityManager;

    @Test
    public void dontPassExam() {
        System.out.println(entityManager);

        CriteriaBuilder criteriaBuilder = entityManager.getCriteriaBuilder();
        CriteriaQuery<StudentEntity> criteriaQuery = criteriaBuilder.createQuery(StudentEntity.class);
        Root<StudentEntity> root = criteriaQuery.from(StudentEntity.class);
        Join<StudentEntity, GroupEntity> studentEntityGroupEntityJoin = root.join("group");
        criteriaQuery.select(root);
        List<Predicate> criteria = new ArrayList<>();
//criteria.add(criteriaBuilder.equal(studentEntityGroupEntityJoin.get("id"), 1));
        criteria.add(criteriaBuilder.equal(studentEntityGroupEntityJoin.get("groupNumber"), "1_1_1-1"));
        criteriaQuery.where(criteria.toArray(new Predicate[0]));
        entityManager
                .createQuery(criteriaQuery)
                .getResultList();
    }
}