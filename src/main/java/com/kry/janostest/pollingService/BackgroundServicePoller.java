package com.kry.janostest.pollingService;

import io.vertx.core.Future;
import io.vertx.core.Vertx;
import io.vertx.ext.web.client.WebClient;

import java.util.List;
import java.util.Map;

public class BackgroundServicePoller {

    private final String STATUS_FAIL = "FAIL";
    private final String STATUS_OK = "OK";
    private final int STATUS_CODE_OK = 200;

    public Future<List<String>> pollServices(Map<Integer, Values> services, Vertx vertx, BackroundServiceLogger backroundServiceLogger) {
        services.forEach((id, value) -> {
            WebClient.create(vertx).getAbs(value.url).send(result -> {
                if (result == null || result.result() == null) {
                    backroundServiceLogger.log(id, value.url, STATUS_FAIL);
                    return;
                }

                if (result.result().statusCode() == STATUS_CODE_OK) {
                    backroundServiceLogger.log(id, value.url, STATUS_OK);
                } else {
                    backroundServiceLogger.log(id, value.url, STATUS_FAIL);
                }
            });
        });

        return Future.succeededFuture();
    }

}
