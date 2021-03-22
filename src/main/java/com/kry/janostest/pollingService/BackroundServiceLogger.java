package com.kry.janostest.pollingService;

import io.vertx.mysqlclient.MySQLPool;
import io.vertx.sqlclient.Tuple;

public class BackroundServiceLogger {

    public void log(Integer id, String url, String status, MySQLPool client) {
        System.out.println(id.toString() + " " + url + " " + status);

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
