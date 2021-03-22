CREATE DATABASE `service_polling`;

USE `service_polling`;

CREATE TABLE `services` (
                            `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
                            `title` varchar(255) DEFAULT NULL,
                            `url` varchar(255) DEFAULT NULL,
                            `status` varchar(20) DEFAULT 'QUEUEING',
                            `createdAt` datetime DEFAULT NULL,
                            `modifiedAt` datetime DEFAULT NULL,
                            PRIMARY KEY (`id`),
                            UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8;
