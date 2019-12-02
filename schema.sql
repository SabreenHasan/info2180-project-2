

CREATE DATABASE IF NOT EXISTS AppDatabase;
USE AppDatabase;


CREATE TABLE IF NOT EXISTS `Users`
(
  `id` int(5) NOT NULL auto_increment,
  `firstname` char(20) NOT NULL default '',
  `lastname` char(20) NOT NULL default '',
 `password` varchar(100) NOT NULL default '',
  `email` char(25) NOT NULL default '',
  `date_joined` char(20) NOT NULL default '0',
  PRIMARY KEY  (`id`)
)ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;



CREATE TABLE IF NOT EXISTS `Issues` (
  `id` int(5) NOT NULL auto_increment,
  `title` char(35) NOT NULL default '',
  `description` NVARCHAR(4000) NOT NULL default '',
  `type` char(20) NOT NULL default '',
  `priority` char(10) NOT NULL default '',
  `status`char(10) NOT NULL default '',
  `assigned_to` int(5) NOT NULL default 0,
  `created_by` int(5) NOT NULL default 0,
  `created` char(20) NOT NULL default '',
  `updated` char(20) NOT NULL default '',
  PRIMARY KEY  (`id`)
)ENGINE=MyISAM DEFAULT CHARSET=utf8mb4;
/* must hash password*/
INSERT INTO `Users`(email,password) VALUES ('admin@bugme.com','password123');

