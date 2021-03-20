package com.kry.janostest.pollingService;

import io.vertx.core.Vertx;

/**
 * Launcher of MainVerticle.
 *
 * @author Janos Vajda
 */
public class Starter {
  public static void main(String[] args) {
    Vertx.vertx().deployVerticle(new MainVerticle());
  }
}
