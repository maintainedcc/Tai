FROM denoland/deno:alpine-1.18.2

EXPOSE 9000
EXPOSE 9001
EXPOSE 9002

WORKDIR /app

USER deno

COPY . .
RUN deno cache deps.ts
RUN deno cache main.ts

CMD ["run", "--allow-net", "--allow-read", "--allow-env", "main.ts"]