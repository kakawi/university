CREATE SCHEMA university;

CREATE TABLE university.faculty ( 
    id                   bigserial  NOT NULL,
    name                 varchar(255)  NOT NULL,
    CONSTRAINT fakultet_pkey PRIMARY KEY ( id ),
    CONSTRAINT fakultet_name_uindex UNIQUE ( name ) 
 );

CREATE TABLE university."session" ( 
    id                   bigint  NOT NULL,
    name                 varchar(100)  NOT NULL,
    year_of_session      integer  NOT NULL,
    is_finished          bool DEFAULT false NOT NULL,
    CONSTRAINT pk_session_id PRIMARY KEY ( id )
 );

CREATE TABLE university.subject ( 
    id                   bigint  NOT NULL,
    name                 varchar(255)  NOT NULL,
    CONSTRAINT subject_pkey PRIMARY KEY ( id )
 );

CREATE TABLE university.department ( 
    id                   bigserial  NOT NULL,
    name                 varchar(255)  NOT NULL,
    faculty_id           integer  NOT NULL,
    CONSTRAINT kafedra_pkey PRIMARY KEY ( id ),
    CONSTRAINT kafedra_name_uindex UNIQUE ( name ) 
 );

CREATE TABLE university.speciality ( 
    id                   bigserial  NOT NULL,
    name                 varchar(255)  NOT NULL,
    department_id        integer  NOT NULL,
    CONSTRAINT speciality_pkey PRIMARY KEY ( id ),
    CONSTRAINT speciality_name_uindex UNIQUE ( name ) 
 );

CREATE TABLE university."set" ( 
    id                   bigint  NOT NULL,
    speciality_id        bigint  NOT NULL,
    year_of_establishment bigint  NOT NULL,
    CONSTRAINT unq_speciality_year_specialiry_id UNIQUE ( speciality_id, year_of_establishment ) ,
    CONSTRAINT pk_speciality_year_id PRIMARY KEY ( id )
 );

CREATE INDEX idx_speciality_year_year_of_establishment_id ON university."set" ( year_of_establishment );

CREATE TABLE university."group" ( 
    id                   bigserial  NOT NULL,
    group_number         varchar(255)  NOT NULL,
    set_id               bigint  ,
    CONSTRAINT group_pkey PRIMARY KEY ( id )
 );

CREATE INDEX idx_group_set_id ON university."group" ( set_id );

CREATE TABLE university.schedule ( 
    id                   bigint  NOT NULL,
    subject_id           bigint  NOT NULL,
    set_id               bigint  NOT NULL,
    session_id           bigint  NOT NULL,
    CONSTRAINT current_session_pkey1 PRIMARY KEY ( id )
 );

CREATE TABLE university.student ( 
    id                   bigserial  NOT NULL,
    last_name            varchar(255)  NOT NULL,
    first_name           varchar(255)  NOT NULL,
    middle_name          varchar(255)  NOT NULL,
    record_book          varchar(255)  NOT NULL,
    address_of_permanent_residence varchar(255)  NOT NULL,
    address_of_residence varchar(255)  NOT NULL,
    is_get_scholarship   bool DEFAULT false NOT NULL,
    group_id             bigint  NOT NULL,
    premium              integer  ,
    is_local             bool NOT NULL,
    CONSTRAINT student_pkey PRIMARY KEY ( id )
 );

CREATE TABLE university.student_mark ( 
    id                   bigint  NOT NULL,
    student_id           bigint  NOT NULL,
    schedule_id          bigint  NOT NULL,
    mark                 integer  NOT NULL,
    CONSTRAINT pk_student_mark_id PRIMARY KEY ( id ),
    UNIQUE (student_id, schedule_id)
 );

CREATE INDEX idx_student_mark_schedule_id ON university.student_mark ( schedule_id );

ALTER TABLE university.department ADD CONSTRAINT kafedra_fakultet_id_fk FOREIGN KEY ( faculty_id ) REFERENCES university.faculty( id );

ALTER TABLE university."group" ADD CONSTRAINT fk_group_set FOREIGN KEY ( set_id ) REFERENCES university."set"( id );

ALTER TABLE university.schedule ADD CONSTRAINT fk_current_session_subject_session FOREIGN KEY ( session_id ) REFERENCES university."session"( id );

ALTER TABLE university.schedule ADD CONSTRAINT fk_current_session_subject_set FOREIGN KEY ( set_id ) REFERENCES university."set"( id );

ALTER TABLE university.schedule ADD CONSTRAINT current_session_subject_id_fk FOREIGN KEY ( subject_id ) REFERENCES university.subject( id );

ALTER TABLE university."set" ADD CONSTRAINT fk_speciality_year_speciality FOREIGN KEY ( speciality_id ) REFERENCES university.speciality( id );

ALTER TABLE university.speciality ADD CONSTRAINT speciality_kafedra_id_fk FOREIGN KEY ( department_id ) REFERENCES university.department( id );

ALTER TABLE university.student ADD CONSTRAINT student_groups_id_fk FOREIGN KEY ( group_id ) REFERENCES university."group"( id );

ALTER TABLE university.student_mark ADD CONSTRAINT student_mark_student_id_fk FOREIGN KEY ( student_id ) REFERENCES university.student( id );

ALTER TABLE university.student_mark ADD CONSTRAINT student_mark_current_session_id_fk FOREIGN KEY ( schedule_id ) REFERENCES university.schedule( id );

CREATE SEQUENCE university.S_GROUP START 101;
CREATE SEQUENCE university.S_SCHEDULE START 101;
CREATE SEQUENCE university.S_SESSION START 101;
CREATE SEQUENCE university.S_SET START 101;
CREATE SEQUENCE university.S_STUDENT START 101;
CREATE SEQUENCE university.S_STUDENT_MARK START 101;
CREATE SEQUENCE university.S_SUBJECT START 101;