package com.hlebon.dbcoursework.web.controller;

import com.hlebon.dbcoursework.repository.dao.NativeDao;
import com.hlebon.dbcoursework.repository.nativeEntity.CanGetScholarShipStudent;
import com.hlebon.dbcoursework.repository.nativeEntity.DontPassStudent;
import com.hlebon.dbcoursework.repository.nativeEntity.GroupAverageMark;
import com.hlebon.dbcoursework.repository.nativeEntity.SubjectAverageMark;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;

@RestController
@CrossOrigin("*")
@RequestMapping(Constants.API_URL)
public class ReportController {

    @Autowired
    private NativeDao nativeDao;

    @GetMapping(path = "/reports/dontPassStudents", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Collection<DontPassStudent> getStudentMarks(
            @RequestParam("idSession") long idSession,
            @RequestParam("idDepartment") long idDepartment
    ) {
        return nativeDao.dontPassExam(idSession, idDepartment);
    }

    @GetMapping(path = "/reports/groupAverageMarks", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Collection<GroupAverageMark> getGroupAverageMarks(
            @RequestParam("idSession") long idSession,
            @RequestParam("idFaculty") long idFaculty
    ) {
        return nativeDao.groupAverageMarks(idSession, idFaculty);
    }

    @GetMapping(path = "/reports/subjectAverageMarks", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Collection<SubjectAverageMark> getGroupAverageMarks(@RequestParam("idSession") long idSession) {
        return nativeDao.subjectAverageMarks(idSession);
    }

    @GetMapping(path = "/reports/canGetScholarShipStudents", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public Collection<CanGetScholarShipStudent> canGetScholarShipStudents(@RequestParam("idSession") long idSession) {
        return nativeDao.canGetScholarShipStudents(idSession);
    }

}
