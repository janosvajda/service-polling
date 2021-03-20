import com.github.jengelman.gradle.plugins.shadow.tasks.ShadowJar
import org.gradle.api.tasks.testing.logging.TestLogEvent.*

plugins {
  java
  application
  id("com.github.johnrengelman.shadow") version "6.1.0"
}

group = "com.kry.janos.test"
version = "1.0.0-SNAPSHOT"

repositories {
  mavenCentral()
}

val vertxVersion = "4.0.3"
val junitJupiterVersion = "5.7.0"

val mainVerticleName = "com.kry.janostest.pollingService.MainVerticle"
val launcherClassName = "io.vertx.core.Launcher"

val watchForChange = "src/**/*"
val doOnChange = "${projectDir}/gradlew classes"

application {
  mainClassName = launcherClassName
}

dependencies {
  implementation(platform("io.vertx:vertx-stack-depchain:$vertxVersion"))
  implementation("io.vertx:vertx-web-client")
  implementation("io.vertx:vertx-web")
  implementation("io.vertx:vertx-web-templ-jade")
  implementation("io.vertx:vertx-mysql-client")
  implementation("io.vertx:vertx-web-sstore-cookie")
  implementation("io.vertx:vertx-json-schema")
  implementation ("io.netty:netty-handler:4.1.27.Final")

  //testImplementation("io.vertx:vertx-unit")
  //testImplementation("junit:junit:4.13.1")
  testImplementation("io.vertx:vertx-junit5:$vertxVersion")
  testImplementation("org.junit.jupiter:junit-jupiter-engine:$junitJupiterVersion")
//  testImplementation("org.junit.jupiter:junit-jupiter-api:$junitJupiterVersion")
//  testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:$junitJupiterVersion")
//  testImplementation("org.assertj:assertj-core:3.10.0")

}


java {
  sourceCompatibility = JavaVersion.VERSION_11
  targetCompatibility = JavaVersion.VERSION_11
}

tasks.withType<ShadowJar> {
  archiveClassifier.set("fat")
  manifest {
    attributes(mapOf("Main-Verticle" to mainVerticleName))
  }
  mergeServiceFiles()
}

tasks.withType<Test> {
  useJUnitPlatform()
  testLogging {
    events = setOf(PASSED, SKIPPED, FAILED)
  }
}

tasks.withType<JavaExec> {
  args = listOf("run", mainVerticleName, "--redeploy=$watchForChange", "--launcher-class=$launcherClassName", "--on-redeploy=$doOnChange")
}

//tasks.test {
//  useJUnitPlatform()
//}

//tasks.withType<Test> {
//  useJUnitPlatform()
//}


