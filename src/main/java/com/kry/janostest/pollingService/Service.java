package com.kry.janostest.pollingService;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * Service repository.
 */
public class Service {

  private static final AtomicInteger COUNTER = new AtomicInteger();

  private final int id;

  private String url;

  private Integer status;

  public Service(String url, Integer status) {
    this.id = COUNTER.getAndIncrement();
    this.url = url;
    this.status = status;
  }

  public Service() {
    this.id = COUNTER.getAndIncrement();
  }

  public int getId() {
    return id;
  }

  public String getUrl() {
    return url;
  }

  public Object setUrl(String url) {
    this.url = url;
    return this;
  }

  public Integer getStatus() {
    return status;
  }

  public Object setStatus(Integer status) {
    this.status = status;
    return this;
  }
}
