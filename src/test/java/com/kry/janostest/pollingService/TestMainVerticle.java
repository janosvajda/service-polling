package com.kry.janostest.pollingService;

import com.kry.janostest.pollingService.MainVerticle;
import io.vertx.core.Vertx;
import io.vertx.core.json.JsonObject;
import io.vertx.junit5.VertxExtension;
import io.vertx.junit5.VertxTestContext;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

@ExtendWith(VertxExtension.class)
public class TestMainVerticle {

    Vertx vertx = Vertx.vertx();

    @BeforeEach
  void deploy_verticle(Vertx vertx, VertxTestContext testContext) {

    vertx.deployVerticle(new MainVerticle(), testContext.succeeding(id -> testContext.completeNow()));
    //Vertx.vertx().deployVerticle(new MainVerticle(), testContext.succeeding(id -> testContext.completeNow()));
  }

  @Test
  void verticle_deployed(Vertx vertx, VertxTestContext testContext) throws Throwable {
      System.out.println("testsss");
      testContext.completeNow();
  }

    @AfterEach
    public void finish(VertxTestContext testContext) {
        System.out.println("afterssss");
        vertx.close(testContext.succeeding(response -> {
            testContext.completeNow();
        }));
    }
}
