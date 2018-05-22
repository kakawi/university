package com.hlebon.dbcoursework.repository.dao;

import com.hlebon.dbcoursework.repository.entity.FacultyEntity;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

@Service
public class FacultyDao {
    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public FacultyEntity update(FacultyEntity facultyEntity) {
        return entityManager.merge(facultyEntity);
    }
}
