package com.kry.janostest.pollingService;

import io.vertx.core.Vertx;
import io.vertx.core.json.JsonArray;
import io.vertx.ext.web.client.WebClient;
import io.vertx.junit5.Timeout;
import io.vertx.junit5.VertxExtension;
import io.vertx.junit5.VertxTestContext;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ExtendWith(VertxExtension.class)
public class TestMainVerticle {

    Vertx vertx = Vertx.vertx();

    @BeforeEach
    void deploy_verticle(Vertx vertx, VertxTestContext testContext) {

        //vertx.deployVerticle(new MainVerticle(), testContext.succeeding(id -> testContext.completeNow()));
        Vertx.vertx().deployVerticle(new ServicePoolingRestVerticle(), testContext.succeeding(id -> testContext.completeNow()));
    }

    @Test
    @DisplayName("Test of /service endpoint on port 8888")
    @Timeout(value = 10, timeUnit = TimeUnit.SECONDS)
    void verticle_deployed(Vertx vertx, VertxTestContext testContext) throws Throwable {
        System.out.println("Test verticle_deployed is starting.");
        WebClient.create(vertx)
            .get(8888, "localhost", "/service")
            .send(response -> testContext.verify(() -> {

                assertEquals(200, response.result().statusCode());
                System.out.println("Test verticle_deployed is running.");

                JsonArray body = response.result().bodyAsJsonArray();
                assertEquals(body.size() > 0, true);
                testContext.completeNow();
            }));
    }


//    @AfterEach
//    public void finish(VertxTestContext testContext) {
//        System.out.println("afterssss");
//        vertx.close(testContext.succeeding(response -> {
//            testContext.completeNow();
//        }));
//    }
}
