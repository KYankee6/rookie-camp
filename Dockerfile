FROM shclub/jre17-runtime:v1.0.0

ENV SPRING_PROFILES_ACTIVE dev
ENV SERVICE_NAME edu12

ENV JAVA_OPTS="-XX:+UnlockExperimentalVMOptions -XX:+UseCGroupMemoryLimitForHeap -XX:MaxRAMFraction=1 -XshowSettings:vm"
ENV JAVA_OPTS="${JAVA_OPTS} -XX:+UseG1GC -XX:+UnlockDiagnosticVMOptions -XX:+G1SummarizeConcMark -XX:InitiatingHeapOccupancyPercent=35 -XX:G1ConcRefinementThreads=20"

ADD ./target/$SERVICE_NAME-*.jar /$SERVICE_NAME.jar

ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar  ./$SERVICE_NAME.jar "]

