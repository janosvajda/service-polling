package com.kry.janostest.pollingService;

import io.vertx.core.AbstractVerticle;
import io.vertx.core.Promise;
import io.vertx.core.Vertx;
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
 * ServicePoolingRestVerticle class of the polling service test.
 *
 * @author Janos Vajda
 **/
public class ServicePollerRestControllerVerticle extends AbstractVerticle {

    public static final String URL_NAME_ID = "id";

    public static final String URL_NAME_TITLE = "title";

    public static final String URL_NAME_KEY = "url";

    public static final String URL_STATUS_KEY = "status";

    //@todo All DB connection data should come from a config. This is not secure because these data never should be pushed to Git or any other version controlling system.
    private static final int PORT = 8888;

    private static final String URL_REQUEST_KEY = "url";

    private static final Integer MYSQL_PORT = 3306;

    private static final String MYSQL_HOST = "localhost"; //@todo This should come from a secret local config.

    private static final String MYSQL_DATABASE = "service_pooling"; //@todo This should come from a secret local config.

    private static final String MYSQL_USER = "root"; //@todo This should come from a secret local config.

    private static final String MYSQL_PASSWORD = ""; //@todo This should come from a secret local config.

    private static final int MILLISECONDS = 1000;

    private static final int BACKGROUND_CHECKING_INTERVAL_SEC = 20; //20 seconds @todo This should be configurable

    private BackgroundServicePoller backgroundPoller = new BackgroundServicePoller();

    private BackroundServiceLogger backroundServiceLogger = new BackroundServiceLogger();

    private MySQLPool client;

    final HashMap<Integer, ValuesOfServiceMap> services = new HashMap<>();

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

        //It is starting the checking of services.
        vertx.setPeriodic(MILLISECONDS * BACKGROUND_CHECKING_INTERVAL_SEC, periodicId ->
            backgroundPoller.pollServices(services, vertx, backroundServiceLogger, getDbClient()));

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
        setPutServiceHandler(router);
        setPostDeleteServiceHandler(router);
    }

    /**
     * @param router Router
     */
    private void setGetServiceHandler(Router router) {
        router.get("/service").handler(req -> {
            services.clear();
            System.out.println("HashMap Elements: " + services);
            this.getDbClient().getConnection().compose(conn -> conn
                .query("SELECT id, url, status, title FROM services") //@todo Pagination (LIMIT) must be here.
                .execute()
                .onComplete(ar -> {
                    System.out.println("List data");
                    if (ar.succeeded()) {
                        RowSet<Row> rows = ar.result();
                        System.out.println("Count of records in services table: " + rows.size() + " rows ");

                        for (Row row : rows) {
                            System.out.println("User " + row.getInteger("id") + " " + row.getString("url"));
                            services.put(row.getInteger("id"),
                                new ValuesOfServiceMap(row.getString("url"), row.getString("status"), row.getString("title"))
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
                                    .put(URL_NAME_TITLE, service.getValue().title)
                            )
                            .collect(Collectors.toList());
                        req.response()
                            .putHeader("content-type", "application/json")
                            .end(new JsonArray(jsonServices).encode());
                    } else {
                        System.out.println("Something went wrong " + ar.cause().getMessage());
                    }
                }));
        });
    }

    /**
     * POST method - create new record.
     * @param router Router
     */
    private void setPostServiceHandler(Router router) {
        router.post("/service").handler(req -> {
            System.out.println("setPostServiceHandler ");

            String url = getUrlFromRequestBody(req);
            String title = getTitleFromRequestBody(req);
            System.out.println("setPostServiceHandler " + url);

            if (!validateRequest(req, "0", url, title)) {
                return;
            }

            this.getDbClient()
                .preparedQuery("INSERT INTO services (url, title, createdAt) VALUES (?, ?, NOW())")
                .execute(Tuple.of(url, title), ar -> {
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
     * PUT method - modify record.
     * @param router Router
     */
    private void setPutServiceHandler(Router router) {
        router.put("/service").handler(req -> {
            System.out.println("setPutServiceHandler ");

            String url = getUrlFromRequestBody(req);
            String title = getTitleFromRequestBody(req);
            String id = getIdFromRequestBody(req);
            System.out.println("setPutServiceHandler " + url);
            System.out.println("setPutServiceHandler " + id);

            if (!validateRequest(req, id, url, title)) {
                return;
            }

            this.getDbClient()
                .preparedQuery("UPDATE services SET url=?, title=?, modifiedAt=NOW(), status='QUEUEING' WHERE id=?")
                .execute(Tuple.of(url, title, id), ar -> {
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
     * DELETE method - delete record.
     * @param router Router
     */
    private void setPostDeleteServiceHandler(Router router) {
        router.delete("/service").handler(req -> {
            String id = getIdFromRequestBody(req);
            System.out.println("DELETE ITEM" + id);

            if (id.isEmpty()) {
                responseRequestWithCustomMessageFailed(req, "ID is required");
                return;
            }

            this.getDbClient()
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
     * @return
     */
    private String getTitleFromRequestBody(RoutingContext request) {
        JsonObject jsonBody = request.getBodyAsJson();
        return jsonBody.getString(URL_NAME_TITLE);
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

    /**
     * @param request RoutingContext
     */
    private void responseRequestWithCustomMessageFailed(RoutingContext request, String errorMessage) {
        JsonObject json = new JsonObject()
            .put("result", errorMessage);

        request.response()
            .putHeader("Content-Type", "application/json; charset=UTF8")
            .end(json.encodePrettily());
    }

    /**
     * @param request
     * @param id
     * @param url
     * @param title
     * @return
     */
    private Boolean validateRequest(RoutingContext request, String id, String url, String title) {

        if (id.isEmpty()) {
            responseRequestWithCustomMessageFailed(request, "ID is required.");
            return false;
        }

        if (url.isEmpty()) {
            responseRequestWithCustomMessageFailed(request, "URL is required.");
            return false;
        }

        if (title.isEmpty()) {
            responseRequestWithCustomMessageFailed(request, "Title is required.");
            return false;
        }

        return true;
    }
}
