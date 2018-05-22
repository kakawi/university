delete from university.student_mark;
delete from university.student;
delete from university."group";
delete from university."session";
delete from university.subject;
delete from university.schedule;
delete from university."set";
delete from university.speciality;
delete from university.department;
delete from university.faculty;

INSERT INTO university.faculty( id, name ) VALUES ( 1, 'Энергетический факультет' ); 
INSERT INTO university.faculty( id, name ) VALUES ( 2, 'Гуманитарный факультет' ); 
INSERT INTO university.faculty( id, name ) VALUES ( 3, 'Факультет информационных технологий' ); 

INSERT INTO university."session"( id, name, year_of_session, is_finished ) VALUES ( 1, 'Зимняя', 2017, false ); 
INSERT INTO university."session"( id, name, year_of_session, is_finished ) VALUES ( 2, 'Летняя', 2018, false ); 

INSERT INTO university.subject( id, name ) VALUES ( 1, 'Математика' ); 
INSERT INTO university.subject( id, name ) VALUES ( 2, 'Английский' ); 
INSERT INTO university.subject( id, name ) VALUES ( 3, 'Информатика' ); 
INSERT INTO university.subject( id, name ) VALUES ( 4, 'Черчение' ); 
INSERT INTO university.subject( id, name ) VALUES ( 5, 'Основые электричества' ); 

INSERT INTO university.department( id, name, faculty_id ) VALUES ( 1, 'Электрические системы', 1 ); 
INSERT INTO university.department( id, name, faculty_id ) VALUES ( 2, 'Тепловые электрические станции', 1 ); 
INSERT INTO university.department( id, name, faculty_id ) VALUES ( 3, 'Электроснабжение', 1 ); 
INSERT INTO university.department( id, name, faculty_id ) VALUES ( 4, 'История и туризм', 2 ); 
INSERT INTO university.department( id, name, faculty_id ) VALUES ( 5, 'Технологии и методики преподавания', 2 ); 
INSERT INTO university.department( id, name, faculty_id ) VALUES ( 6, 'Физическая культура и спорт', 2 ); 
INSERT INTO university.department( id, name, faculty_id ) VALUES ( 7, 'Вычислительные системы и сети', 3 ); 
INSERT INTO university.department( id, name, faculty_id ) VALUES ( 8, 'Геодезия и геоинформационные системы', 3 ); 
INSERT INTO university.department( id, name, faculty_id ) VALUES ( 9, 'Технология программирования', 3 ); 

INSERT INTO university.speciality( id, name, department_id ) VALUES ( 1, 'Проектирование и эксплуатация электроэнергетических систем', 1 ); 
INSERT INTO university.speciality( id, name, department_id ) VALUES ( 2, 'Тепловые электрические станции', 2 ); 
INSERT INTO university.speciality( id, name, department_id ) VALUES ( 3, 'Электроснабжение промышленных предприятий', 3 ); 
INSERT INTO university.speciality( id, name, department_id ) VALUES ( 4, 'Отечественная история', 4 ); 
INSERT INTO university.speciality( id, name, department_id ) VALUES ( 5, 'Практическая психология. Иностранный язык', 5 ); 
INSERT INTO university.speciality( id, name, department_id ) VALUES ( 6, 'Физическая культура', 6 ); 
INSERT INTO university.speciality( id, name, department_id ) VALUES ( 7, 'Вычислительные машины, системы и сети', 7 ); 
INSERT INTO university.speciality( id, name, department_id ) VALUES ( 8, 'Геодезия', 8 ); 
INSERT INTO university.speciality( id, name, department_id ) VALUES ( 9, 'Программное обеспечение информационных технологий', 9 ); 

INSERT INTO university."set"( speciality_id, year_of_establishment, id ) VALUES ( 1, 2017, 1 ); 
INSERT INTO university."set"( speciality_id, year_of_establishment, id ) VALUES ( 2, 2017, 2 ); 
INSERT INTO university."set"( speciality_id, year_of_establishment, id ) VALUES ( 3, 2017, 3 ); 
INSERT INTO university."set"( speciality_id, year_of_establishment, id ) VALUES ( 4, 2017, 4 ); 
INSERT INTO university."set"( speciality_id, year_of_establishment, id ) VALUES ( 5, 2017, 5 ); 
INSERT INTO university."set"( speciality_id, year_of_establishment, id ) VALUES ( 6, 2017, 6 ); 
INSERT INTO university."set"( speciality_id, year_of_establishment, id ) VALUES ( 7, 2017, 7 ); 
INSERT INTO university."set"( speciality_id, year_of_establishment, id ) VALUES ( 8, 2017, 8 ); 
INSERT INTO university."set"( speciality_id, year_of_establishment, id ) VALUES ( 9, 2017, 9 ); 
INSERT INTO university."set"( speciality_id, year_of_establishment, id ) VALUES ( 1, 2016, 10 ); 
INSERT INTO university."set"( speciality_id, year_of_establishment, id ) VALUES ( 1, 2015, 11 ); 

INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 1, '1_1_1-1', 1 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 2, '1_1_1-2', 1 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 3, '1_2_1-1', 2 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 4, '1_2_1-2', 2 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 5, '1_3_1-1', 3 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 6, '1_3_1-2', 3 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 7, '2_1_1-1', 4 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 8, '2_1_1-2', 4 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 9, '2_2_1-1', 5 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 10, '2_2_1-2', 5 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 11, '2_3_1-1', 6 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 12, '2_3_1-2', 6 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 13, '3_1_1-1', 7 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 14, '3_1_1-2', 7 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 15, '3_2_1-1', 8 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 16, '3_2_1-2', 8 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 17, '3_3_1-1', 9 ); 
INSERT INTO university."group"( id, group_number, set_id ) VALUES ( 18, '3_3_1-2', 9 );

INSERT INTO university.schedule( id, subject_id, set_id, session_id ) VALUES ( 1, 1, 1, 1 ); 
INSERT INTO university.schedule( id, subject_id, set_id, session_id ) VALUES ( 2, 2, 1, 1 ); 
INSERT INTO university.schedule( id, subject_id, set_id, session_id ) VALUES ( 3, 3, 1, 1 ); 
INSERT INTO university.schedule( id, subject_id, set_id, session_id ) VALUES ( 4, 1, 2, 1 ); 
INSERT INTO university.schedule( id, subject_id, set_id, session_id ) VALUES ( 5, 2, 2, 1 ); 
INSERT INTO university.schedule( id, subject_id, set_id, session_id ) VALUES ( 6, 3, 2, 1 ); 

INSERT INTO university.student( id, last_name, first_name, middle_name, record_book, address_of_permanent_residence, address_of_residence, is_get_scholarship, group_id, premium, is_local ) VALUES ( 3, 'Иванов', 'Сергей', 'Петрович', 'wersf', 'sdf', 'xcv', false, 1, 0, false ); 
INSERT INTO university.student( id, last_name, first_name, middle_name, record_book, address_of_permanent_residence, address_of_residence, is_get_scholarship, group_id, premium, is_local ) VALUES ( 1, 'Bandarenka', 'Hleb', 'S', 'xxxx', 'address permanent', 'anotehr address', true, 1, 50, false ); 
INSERT INTO university.student( id, last_name, first_name, middle_name, record_book, address_of_permanent_residence, address_of_residence, is_get_scholarship, group_id, premium, is_local ) VALUES ( 2, 'Petrov', 'Alex', 'S', 'xxxx', 'address permanent', 'anotehr address', true, 1, 100, false ); 

INSERT INTO university.student_mark( student_id, schedule_id, mark, id ) VALUES ( 2, 1, 9, 1 ); 
INSERT INTO university.student_mark( student_id, schedule_id, mark, id ) VALUES ( 2, 2, 9, 3 ); 
INSERT INTO university.student_mark( student_id, schedule_id, mark, id ) VALUES ( 1, 1, 6, 5 ); 
INSERT INTO university.student_mark( student_id, schedule_id, mark, id ) VALUES ( 1, 2, 7, 6 ); 
INSERT INTO university.student_mark( student_id, schedule_id, mark, id ) VALUES ( 1, 3, 10, 8 );

