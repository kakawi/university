-- # 1 - FINISHED
-- Собираем таблицу из Student + все предметы, которые он должен был сдать
-- Подзапросами оставляем только записи, где оценок нету или равны 1,2,3
SELECT student.last_name, student.first_name, student.middle_name, subject.name FROM university.student
  JOIN university.group g ON g.id = student.group_id
  JOIN university.set ON set.id = g.set_id
  JOIN university.schedule ON schedule.set_id = set.id
  -- 
  JOIN university.subject ON subject.id = schedule.subject_id
  JOIN university.session ON session.id = schedule.session_id
  -- Find department
  JOIN university.speciality ON speciality.id = set.speciality_id
  JOIN university.department ON department.id = speciality.department_id
  WHERE
  ( 
    NOT EXISTS (
      SELECT 1 FROM university.student_mark 
      WHERE student_mark.student_id = student.id and student_mark.schedule_id = schedule.id
    )
    OR
    4 > (
      SELECT student_mark.mark FROM university.student_mark 
      WHERE student_mark.student_id = student.id and student_mark.schedule_id = schedule.id
    )
  )
and session.year_of_session = '2017'
and department.name = 'Электрические системы';

-- # 2 - FINISHED
SELECT g.group_number, AVG(m.mark) FROM university.student st
  JOIN university.group g ON g.id = st.group_id
  JOIN university.student_mark m ON m.student_id = st.id
  -- Find faculty
  JOIN university.set ON set.id = g.set_id  
  JOIN university.speciality sp ON sp.id = set.speciality_id
  JOIN university.department d ON d.id =  sp.department_id
  JOIN university.faculty f ON f.id = d.faculty_id
  -- Session
  JOIN university.schedule sch ON set.id = sch.set_id
  JOIN university.session ses ON ses.id = sch.session_id
WHERE f.name = 'Энергетический факультет' 
and ses.year_of_session = '2017'
GROUP BY g.group_number
;

-- # 3 -- FINISHED
SELECT sub.name, AVG(m.marK) FROM university.student_mark m
  JOIN university.schedule sch ON sch.id = m.schedule_id
  JOIN university.subject sub ON sub.id = sch.subject_id
  -- SESSION
  JOIN university.session ses ON ses.id = sch.session_id
  WHERE ses.year_of_session = 2017
GROUP BY sub.name
;

-- # 4 -- FINISHED
-- Local students
SELECT st FROM university.student st 
WHERE 
  st.is_local = TRUE 
  and                
  (
    -- get all schedule for this student
    SELECT count(*) FROM university.schedule sch
      JOIN university.set s ON sch.set_id = s.id
      JOIN university.group g ON g.set_id = s.id and st.group_id = g.id
      JOIN university.session ses ON ses.id = sch.session_id
    WHERE 
      ses.year_of_session = 2017
  ) = (
    SELECT count(*) FROM university.student_mark m4
      JOIN university.schedule sch2 ON sch2.id = m4.schedule_id and m4.student_id = st.id
      JOIN university.session ses2 ON ses2.id = sch2.session_id
    WHERE 
      ses2.year_of_session = 2017
      and
      m4.mark > 3
  )
union
-- Foreign students
SELECT st FROM university.student st 
WHERE 
  st.is_local = FALSE 
  and 
  (
    -- get all schedule for this student
    SELECT count(*) FROM university.schedule sch
      JOIN university.set s ON sch.set_id = s.id
      JOIN university.group g ON g.set_id = s.id and st.group_id = g.id
      JOIN university.session ses ON ses.id = sch.session_id              
    WHERE               
      ses.year_of_session = 2017
  ) = (
    SELECT count(*) FROM university.student_mark m3
      JOIN university.schedule sch2 ON sch2.id = m3.schedule_id and m3.student_id = st.id
      JOIN university.session ses2 ON ses2.id = sch2.session_id
    WHERE 
      ses2.year_of_session = 2017
      and
      m3.mark > 3
  )
  and
  1 >= (
    SELECT count(*) FROM university.student_mark as m5
      JOIN university.schedule sch2 ON sch2.id = m5.schedule_id and m5.student_id = st.id
      JOIN university.session ses2 ON ses2.id = sch2.session_id
    WHERE 
      ses2.year_of_session = 2017
      and
      m5.mark = 4
  )
;

-- # 5 -- RECHECK
SELECT st.first_name, st.last_name, f.name FROM university.student st
JOIN university.group g ON st.group_id = g.id
JOIN university.set s ON s.id = g.set_id
JOIN university.speciality sp ON sp.id = s.speciality_id
JOIN university.department d ON d.id = sp.department_id
JOIN university.faculty f ON f.id = d.faculty_id
WHERE 
 st.id = 
( 
  SELECT st.id FROM university.schedule c
  LEFT JOIN university.student_mark m ON c.id = m.schedule_id
  JOIN university.set s ON s.id = c.set_id
  JOIN university.group g ON g.set_id = s.id
  JOIN university.student st2 ON st2.group_id = g.id
  WHERE 
  ( 
    (m.mark < 4 and m.student_id = st2.id) 
    OR 
    NOT EXISTS (select 1 from university.student_mark m2 where m2.student_id = st2.id and m2.schedule_id = c.id)
  )
  GROUP BY st.id
  HAVING count(st2) > 2
) and f.name = 'Энергетический факультет'
;

-- # 6 - FINISHED
SELECT 'Без стипендии', 
  case when exists (select 1 from university.student st2 where st2.is_get_scholarship = 0) then 
  (select count(st2.id) from university.student st2 where st2.is_get_scholarship = 0 group by st2.id) else 0 end
UNION
SELECT 'Стипендия без надбавки', 
  case when exists (select 1 from university.student st2 where st2.is_get_scholarship = 1 and st2.premium = 0) then 
  (select count(st2.id) from university.student st2 where st2.is_get_scholarship = 1 and st2.premium = 0 group by st2.id) else 0 end
UNION
SELECT 'Стипендия с 50% надбавкой', 
  case when exists (select 1 from university.student st2 where st2.is_get_scholarship = 1 and st2.premium = 50) then 
  (select count(st2.id) from university.student st2 where st2.is_get_scholarship = 1 and st2.premium = 50 group by st2.id) else 0 end
UNION
SELECT 'Стипендия с 100% надбавкой', 
  case when exists (select 1 from university.student st2 where st2.is_get_scholarship = 1 and st2.premium = 100) then 
  (select count(st2.id) from university.student st2 where st2.is_get_scholarship = 1 and st2.premium = 100 group by st2.id) else 0 end
;

-- # 7 - FINISHED
SELECT sub.name FROM university.subject sub 
WHERE
sub.id in  
(
  -- Find subject_id which has this max_number unsatisfactory marks
  SELECT c.subject_id FROM university.schedule c
  JOIN university.student_mark m ON m.schedule_id = c.id
  WHERE m.mark < 4
  GROUP BY c.subject_id
  HAVING count(*) = 
  (
  -- Find max_number unsatisfactory marks
    SELECT count(*) as max_number FROM university.schedule c
    JOIN university.student_mark m ON m.schedule_id = c.id
    WHERE m.mark < 4
    GROUP BY c.subject_id
    ORDER BY max_number DESC
    LIMIT 1
  )
)
;

-- # 8 -- FINISHED
select sub.name from university.subject sub
JOIN university.schedule sch2 ON sch2.subject_id = sub.id
JOIN 
-- FIND max AVG and schedule.id
(select schedule_and_count.id, 
  -- find AVG
  case when exists (select 1 from university.student_mark mm where mm.schedule_id = schedule_and_count.id) then (select SUM(m2.mark) from university.student_mark m2 WHERE m2.schedule_id = schedule_and_count.id GROUP BY m2.schedule_id) / schedule_and_count.count else 0 end as average 
from (
       -- FIND schedule.id and count of students whom should pass this exam
       select sch.id, count(*) from university.schedule sch
         JOIN university.set s ON s.id = sch.set_id
         JOIN university.group g ON g.set_id = s.id
         JOIN university.student st ON st.group_id = g.id
       GROUP BY sch.id
     ) as schedule_and_count
ORDER BY average DESC
LIMIT 1
) as result ON result.id = sch2.id
;


-----------
SELECT st.* from university.student st 
            WHERE
              st.is_get_scholarship = 1
              and 
              9 <= any (
                SELECT m.mark FROM university.student_mark m
                  JOIN university.schedule sch ON sch.id = m.schedule_id
                  JOIN university.set s ON s.id = sch.set_id
                  JOIN university.session ses ON ses.id = sch.session_id and ses.year_of_session = 2017
                  JOIN university.group g ON s.id = g.set_id and g.id = st.group_id                                   
              ); 
              
SELECT m.mark FROM university.student_mark m
                                JOIN university.schedule sch ON sch.id = m.schedule_id and m.student_id=2
                                JOIN university.set s ON s.id = sch.set_id
                                JOIN university.session ses ON ses.id = sch.session_id and ses.year_of_session = 2017
                                JOIN university.group g ON s.id = g.set_id and g.id = 1 