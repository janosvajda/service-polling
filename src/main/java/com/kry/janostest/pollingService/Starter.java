package com.kry.janostest.pollingService;

import io.vertx.core.Vertx;

/**
 * Launcher of ServicePoolingRestVerticle.
 */
public class Starter {
  public static void main(String[] args) {
    Vertx.vertx().deployVerticle(new ServicePollerRestControllerVerticle());
  }
}
