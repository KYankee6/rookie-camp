#FROM shclub/build-tool:v1.0.0 as MAVEN_BUILD
FROM  maven:3.8.4-openjdk-17 AS MAVEN_BUILD

RUN mkdir -p build
WORKDIR /build

COPY pom.xml ./
COPY src ./src

COPY . ./
RUN mvn package

ARG port
EXPOSE ${port}

FROM eclipse-temurin:17.0.2_8-jre-alpine
COPY --from=MAVEN_BUILD  /build/target/*.war app.jar


ENV TZ Asia/Seoul
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ENV SPRING_PROFILES_ACTIVE dev

ENV JAVA_OPTS="-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -XX:MaxRAMFraction=1 -XshowSettings:vm"
ENV JAVA_OPTS="${JAVA_OPTS} -XX:+UseG1GC -XX:+UnlockDiagnosticVMOptions -XX:+G1SummarizeConcMark -XX:InitiatingHeapOccupancyPercent=35 -XX:G1ConcRefinementThreads=20"

#ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar  app.jar "]

ENTRYPOINT ["sh", "-c", "java -jar  app.jar "]

# ENTRYPOINT ["java", "-jar","app.war"]
