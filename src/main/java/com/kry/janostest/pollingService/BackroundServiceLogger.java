package com.kry.janostest.pollingService;

import java.util.Map;

public class BackroundServiceLogger {


    public void log(Integer id, String url, String status) {
        System.out.println(id.toString() + " " + url + " " + status);
    }

}
