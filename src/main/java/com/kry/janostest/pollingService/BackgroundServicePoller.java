package com.kry.janostest.pollingService;

import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.ext.web.client.WebClient;
import io.vertx.mysqlclient.MySQLPool;

import java.util.List;
import java.util.Map;

public class BackgroundServicePoller {

    private final String SERVICE_STATUS_FAIL = "FAIL";

    private final String SERVICE_STATUS_OK = "OK";

    private final int SERVICE_STATUS_CODE_OK = 200;

    public Future<List<String>> pollServices(Map<Integer, Values> services, Vertx vertx, BackroundServiceLogger backroundServiceLogger, MySQLPool client) {

        services.forEach((id, value) -> {
            WebClient.create(vertx).getAbs(value.url).send(result -> {
                if (result == null || result.result() == null) {
                    backroundServiceLogger.log(id, value.url, SERVICE_STATUS_FAIL, client);
                    return;
                }

                if (result.result().statusCode() == SERVICE_STATUS_CODE_OK) {
                    backroundServiceLogger.log(id, value.url, SERVICE_STATUS_OK, client);
                } else {
                    backroundServiceLogger.log(id, value.url, SERVICE_STATUS_FAIL, client);
                }
            });
        });

        return Future.succeededFuture();
    }

}
