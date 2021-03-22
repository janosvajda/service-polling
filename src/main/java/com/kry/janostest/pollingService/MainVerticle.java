package com.kry.janostest.pollingService;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.json.JsonArray;
import io.vertx.core.json.JsonObject;
import io.vertx.ext.web.Router;
import io.vertx.ext.web.RoutingContext;
import io.vertx.ext.web.handler.BodyHandler;
import io.vertx.ext.web.handler.StaticHandler;
import io.vertx.mysqlclient.MySQLConnectOptions;
import io.vertx.mysqlclient.MySQLPool;
import io.vertx.sqlclient.PoolOptions;
import io.vertx.sqlclient.Row;
import io.vertx.sqlclient.RowSet;
import io.vertx.sqlclient.Tuple;

import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Main Verticle class of the polling service test.
 *
 * @author Janos Vajda
 */
public class MainVerticle extends AbstractVerticle {

    public static final String URL_NAME_ID = "id";

    public static final String URL_NAME_KEY = "url";

    public static final String URL_STATUS_KEY = "status";

    private static final int PORT = 8888;

    private static final String URL_REQUEST_KEY = "url";

    private static final Integer MYSQL_PORT = 3306;

    private static final String MYSQL_HOST = "localhost";

    private static final String MYSQL_DATABASE = "service_pooling";

    private static final String MYSQL_USER = "root";

    private static final String MYSQL_PASSWORD = "";

    private MySQLPool client;

    final HashMap<Integer, Values> services = new HashMap<>();

    private MySQLPool getDbClient() {
        MySQLConnectOptions connectOptions = new MySQLConnectOptions()
            .setPort(MYSQL_PORT)
            .setHost(MYSQL_HOST)
            .setDatabase(MYSQL_DATABASE)
            .setUser(MYSQL_USER)
            .setPassword(MYSQL_PASSWORD);

        PoolOptions poolOptions = new PoolOptions()
            .setMaxSize(5);

         return client = MySQLPool.pool(vertx, connectOptions, poolOptions);
    }

    @Override
    public void start(Promise<Void> startPromise) throws Exception {
        Router router = Router.router(vertx);

        //Dynamic routing handler's for back-end.
        router.route().handler(BodyHandler.create());

        //Static content routing handler for React's JS files.
        router.route().handler(StaticHandler.create());

        setRoutes(router);
        vertx
            .createHttpServer()
            .requestHandler(router)
            .listen(PORT, result -> {
                if (result.succeeded()) {
                    System.out.println("Kry, Livi code test service result's starting succeeded.");
                    startPromise.complete();
                } else {
                    System.out.println("Kry, Livi code test service's starting has failed..");
                    startPromise.fail("Failed");
                }
            });
    }

    /**
     * @param router Router
     */
    private void setRoutes(Router router) {
        router.route("/").handler(StaticHandler.create());
        setGetServiceHandler(router);
        setPostServiceHandler(router);
        setPostDeleteServiceHandler(router);
    }

    /**
     * @param router Router
     */
    private void setGetServiceHandler(Router router) {


        router.get("/service").handler(req -> {

            services.clear();
            System.out.println("HashMap Elements: " + services);
            client = this.getDbClient();

            client.getConnection().compose(conn -> {
                System.out.println("Got a connection from the pool");

                // All operations execute on the same connection
                //@todo Pagination must be here.
                return conn
                    .query("SELECT id, url, status FROM services")
                    .execute()
                    .onComplete(ar -> {
                       // conn.close();
                    });
            }).onComplete(ar -> {

                if (ar.succeeded()) {
                    RowSet<Row> rows = ar.result();
                    System.out.println("Count of records in services table: " + rows.size() + " rows ");

                    //Iterate through the dataset
                    for (Row row : rows) {
                        System.out.println("User " + row.getInteger("id") + " " + row.getString("url"));
                        services.put(row.getInteger("id"),
                            new Values(row.getString("url"), row.getInteger("status").toString())
                        );
                    }

                    List<JsonObject> jsonServices = services
                        .entrySet()
                        .stream()
                        .map(service ->
                            new JsonObject()
                                .put(URL_NAME_ID, service.getKey().toString())
                                .put(URL_NAME_KEY, service.getValue().url)
                                .put(URL_STATUS_KEY, service.getValue().status)
                        )
                        .collect(Collectors.toList());
                    req.response()
                        .putHeader("content-type", "application/json")
                        .end(new JsonArray(jsonServices).encode());


                } else {
                    System.out.println("Something went wrong " + ar.cause().getMessage());
                }
            });
        });
    }

    /**
     * @param router Router
     */
    private void setPostServiceHandler(Router router) {
        router.post("/service").handler(req -> {
            System.out.println("setPostServiceHandler ");

            String url = getUrlFromRequestBody(req);
            System.out.println("setPostServiceHandler " + url);

            client = this.getDbClient();

            client
                .preparedQuery("INSERT INTO services (url, status) VALUES (?, ?)")
                .execute(Tuple.of(url, "0"), ar -> {
                    if (ar.succeeded()) {
                        RowSet<Row> rows = ar.result();
                        System.out.println("Saved: " + rows.rowCount());
                        responseRequestWithTextOK(req);
                    } else {
                        System.out.println("Failure: " + ar.cause().getMessage());
                        responseRequestWithTextFailed(req);
                    }
                });

        });
    }

    /**
     * @param router Router
     */
    private void setPostDeleteServiceHandler(Router router) {
        router.delete("/service").handler(req -> {

            String id = getIdFromRequestBody(req);

            System.out.println("DELETE ITEM" + id);
            client = this.getDbClient();

            client
                .preparedQuery("DELETE FROM services WHERE id = ? LIMIT 1")
                .execute(Tuple.of(id), ar -> {
                    if (ar.succeeded()) {
                        RowSet<Row> rows = ar.result();
                        System.out.println("Deleted: " + rows.rowCount());
                        responseRequestWithTextOK(req);
                    } else {
                        System.out.println("Failure: " + ar.cause().getMessage());
                        responseRequestWithTextFailed(req);
                    }
                });

        });
    }

    /**
     * @param request RoutingContext
     * @return
     */
    private String getUrlFromRequestBody(RoutingContext request) {
        JsonObject jsonBody = request.getBodyAsJson();
        return jsonBody.getString(URL_REQUEST_KEY);
    }

    /**
     * @param request RoutingContext
     * @return
     */
    private String getIdFromRequestBody(RoutingContext request) {
        JsonObject jsonBody = request.getBodyAsJson();
        return jsonBody.getString(URL_NAME_ID);
    }

    /**
     * @param request RoutingContext
     */
    private void responseRequestWithTextOK(RoutingContext request) {

        JsonObject json = new JsonObject()
            .put("result", "ok");

        request.response()
            .putHeader("Content-Type", "application/json; charset=UTF8")
            .end(json.encodePrettily());
    }

    /**
     * @param request RoutingContext
     */
    private void responseRequestWithTextFailed(RoutingContext request) {
        JsonObject json = new JsonObject()
            .put("result", "failed");

        request.response()
            .putHeader("Content-Type", "application/json; charset=UTF8")
            .end(json.encodePrettily());
    }
}
