package com.kry.janostest.pollingService;

import io.vertx.core.AsyncResult;
import io.vertx.core.Handler;
import io.vertx.core.Vertx;
import io.vertx.core.buffer.Buffer;
import io.vertx.core.file.AsyncFile;
import io.vertx.core.file.FileSystem;
import io.vertx.core.file.OpenOptions;
import io.vertx.core.json.JsonObject;
import io.vertx.mysqlclient.MySQLPool;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;
import io.vertx.sqlclient.Tuple;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

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
            .preparedQuery("UPDATE services SET status = ? WHERE id = ?")
            .execute(Tuple.of(status, id), ar -> {
                if (ar.succeeded()) {
                    System.out.println("Log saved");
                } else {
                    System.out.println("Log saving failure: " + ar.cause().getMessage()); }
            });


    }

    private void save(JsonObject json) {
        fileSystem.open(SERVICES_FILE_NAME, new OpenOptions().setAppend(true), result -> {
            if (result.succeeded()) {
                AsyncFile file = result.result();
                Buffer buff;
                if (json.isEmpty()) {
                    buff = Buffer.buffer("");
                } else {
                    buff = Buffer.buffer(json.toString() + System.lineSeparator());
                }
                file.write(buff);
                file.close();
            } else {
                System.err.println("Failed to open file");
            }
        });
    }
}
