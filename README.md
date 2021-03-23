## service-polling 

Service polling app.

The source code has two parts: 

1. Front-end (React). It has its own Readme: https://github.com/janosvajda/service-polling/blob/main/src/frontend/services-crud/README.md
1. Back-end (Java, Vert.x, Gradle, MySQL)

## Installation

1. git clone https://github.com/janosvajda/service-polling.git
1. You should create a MySQL/MariaDb database and table. You can find the SQL command in `migration/init.sql`
1. You can change the DB connection details. MySQL port, user, password details are in `ServicePollerRestControllerVerticle.java`
1. Now, you should to the frontend directory `src/services-crud` and run `npm install` and `npm run build` You can read the frontend parts its own Readme in this file: `src/frontend/services-crud/README.md`
1. That's all now you can start `Starter.java` from _IntelliJ_. Right click on Starter.java and Run and open the UI in browser by this URL: http://localhost:8888

Db details in for point 2 (from line 43. in ServicePollerRestControllerVerticle.java):

    private static final Integer MYSQL_PORT = 3306;

    private static final String MYSQL_HOST = "localhost";

    private static final String MYSQL_DATABASE = "service_polling";

    private static final String MYSQL_USER = "root";

    private static final String MYSQL_PASSWORD = "";


Integration test is in ServicePollerRestControllerVerticleTest.java

## What has been implemented

### Summary:

User can add/modify/delete services name + URL
Back-end checks services every 20 seconds and writes/modifies their status in the DB. Their status can be OK, FAIL and QUEUING (this is when the endpoint has not been checked or if it was modified).
UI shows their statuses and allows all CRUD functionality.

### Basic requirements

1. A user needs to be able to add a new service with URL, a name (**Yes**, I created a CRUD functionality.)
1. Added services have to be kept when the server is restarted (**Yes**, all data is saved into MySQL)
1. Present whenever a service was added and when the last change was
   made (**Yes**, DateTime values of created at and modified at are in MySQL table)

### Extra requirements

1. Full create/update/delete functionality for services (**Yes**, CRUD functionally is done)
1. The results from the poller are not automatically shown to the user
   (you have to reload the page to see results) (**Yes**, script reload the page in each 30 second and re-checks services)
1. We want to have informative and nice looking animations on
   add/remove services (**Yes**, there is a basic animation on UI when data has been added/removed)
1. Simultaneous writes sometimes causes strange behaviour (**Not fully**, This was a bigger problem If there would be used a file system but MySQL can handle this. Of course, there can be more layers for this but I did not add any extra load balancer etc.)
1. Protect the poller from misbehaving services (for example answering
   really slowly) (**Yes**, I used for this WebClient and Future + Periodic)
1. URL Validation ("sdgf" is probably not a valid service) (**Yes**, UI shows an error if URL is not valid and back-end also does extra validation as users should not be able to save empty data.)
1. Multi-user support. Users should not see the services added by
   another user (**Nope**, I did not create user and session management.)

### Personal note
This was first Vert.x and React web project in my life as I had never used them before. I really enjoyed working with Vert.x and I was amazed at how effective and quick it is.
