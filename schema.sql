/*Create database*/
DROP DATABASE IF EXISTS schema;
CREATE DATABASE schema;
USE schema;

/*Create table named Users*/
DROP TABLE IF EXISTS 'Users';
CREATE TABLE 'Users' (
    'id' int(11) NOT NULL auto_increment,
    'firstname' char(35) NOT NULL default '',
    'lastname' char(35) NOT NULL default '',
    'password' char(60) NOT NULL default '',
    'email' char(100) NOT NULL default '',
    'date_joined' datetime NOT NULL default current_timestamp,
    PRIMARY KEY ('id')
) ENGINE=MyISAM AUTO_INCREMENT=4080 DEFAULT CHARSET=utf8mb4;

/*Populate table*/
LOCK TABLES 'Users' WRITE;
INSERT INTO 'Users' VALUES 
(1,'Sabreen','Hasan','password123','admin@bugme.com','2019-26-11 03:56:11')
;

UNLOCK TABLES; 

/*Create table named Issues*/
DROP TABLE IF EXISTS 'Issues';
CREATE TABLE 'Issues' (
    'id' int(11) NOT NULL auto_increment,
    'title' char(50) NOT NULL default '',
    'description' char(2000) NOT NULL default '',
    'type' enum('Proposal','Task','Bug') NOT NULL default 'Bug',
    'priority' enum('Minor','Major','Critical') NOT NULL default 'Minor',
    'status' enum('Open','Closed','In Progress') NOT NULL default 'Open',
    'assigned_to' smallint(5) NOT NULL default '',
    'created_by' smallint(5) NOT NULL default '',
    'created' datetime NOT NULL default current_timestamp,
    'updated' datetime NOT NULL default current_timestamp ON UPDATE current_timestamp,
    PRIMARY KEY ('id')
) ENGINE=MyISAM AUTO_INCREMENT=250 DEFAULT CHARSET=utf8mb4;

/*Populate table*/
LOCK TABLES 'Issues' WRITE;
INSERT INTO 'Issues' VALUES 
UNLOCK TABLES; 