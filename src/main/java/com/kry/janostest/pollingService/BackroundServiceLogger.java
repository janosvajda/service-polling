package com.kry.janostest.pollingService;

import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.file.FileSystem;
import io.vertx.mysqlclient.MySQLPool;
import io.vertx.sqlclient.Tuple;

import java.text.SimpleDateFormat;
import java.util.Date;

public class BackroundServiceLogger {

    public static final String SERVICES_FILE_NAME = "services.txt";

    private FileSystem fileSystem;

    public BackroundServiceLogger(Vertx vertx) {
        fileSystem = vertx.fileSystem();
    }

    public void serviceFileExists(Handler<AsyncResult<Boolean>> resultHandler) {
        fileSystem.exists(SERVICES_FILE_NAME, resultHandler);
    }


    public void createServicesFile(Handler<AsyncResult<Void>> resultHandler) {
        fileSystem.createFile(SERVICES_FILE_NAME, resultHandler);
    }

    public void log(Integer id, String url, String status, MySQLPool client) {
        System.out.println(id.toString() + " " + url + " " + status);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        Date now = new Date();
        String currentDateTime = sdf.format(now);
        System.out.println(currentDateTime);

        client
            .preparedQuery("UPDATE services SET status = ?, modifiedAt=NOW() WHERE id = ?")
            .execute(Tuple.of(status, id), ar -> {
                if (ar.succeeded()) {
                    System.out.println("Log saved");
                } else {
                    System.out.println("Log saving failure: " + ar.cause().getMessage());
                }
            });
    }
}
